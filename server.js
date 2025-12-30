import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { supabase } from './supabase.js';
import { parseMessage } from './parser.js';
import { sendWhatsAppMessage } from './whatsapp.js';
import cron from 'node-cron';
import { generateDailySummary } from './summary.js';
import { handleManagerQuery } from './manager.js';
import { getOrgConfig } from './config/orgConfig.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const CAMPAIGN_ID = Number(process.env.CAMPAIGN_ID || 1);
const ORG_ID = process.env.ORG_ID || 'default';
const ORG_CONFIG = getOrgConfig(ORG_ID);

// Webhook verification (GET)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

// Webhook receiver (POST) with manager routing and org-aware parsing
app.post('/webhook', async (req, res) => {
  try {
    const entry = req.body?.entry?.[0];
    const change = entry?.changes?.[0];
    const message = change?.value?.messages?.[0];
    if (!message || message.type !== 'text') {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = message.text.body;

    // Manager check
    const { data: mgr, error: mgrError } = await supabase
      .from('users')
      .select('role')
      .eq('phone', from)
      .eq('campaign_id', CAMPAIGN_ID)
      .maybeSingle();
    if (mgrError) console.error(mgrError);

    if (mgr?.role === 'manager') {
      await handleManagerQuery(from, text, CAMPAIGN_ID);
      return res.sendStatus(200);
    }

    // Volunteer flow
    const { data: volunteerRow } = await supabase
      .from('volunteers')
      .select('ward')
      .eq('phone', from)
      .maybeSingle();

    const volunteerWard = volunteerRow?.ward;
    const parsed = parseMessage(text, from, volunteerWard, ORG_ID);

    if (!parsed.valid) {
      await sendWhatsAppMessage(from, parsed.error);
      return res.sendStatus(200);
    }

    const { error } = await supabase.from('reports').insert({
      campaign_id: CAMPAIGN_ID,
      organization_id: ORG_ID, // ensure this column exists
      sender_phone: from,
      type: parsed.type,
      category: parsed.category,
      ward: parsed.ward,
      description: parsed.description,
      raw_message: text
    });

    if (error) {
      console.error('Insert error', error);
      await sendWhatsAppMessage(from, 'Error logging your report. Please try again.');
    } else {
      const locLabel = ORG_CONFIG.labels?.location || 'Location';
      await sendWhatsAppMessage(from, `✓ Received. ${locLabel}: ${parsed.ward} | ${parsed.type} logged`);
    }

    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// Manager query endpoint (updated to support all types and org scoping)
app.post('/manager-query', async (req, res) => {
  const { phone, query } = req.body;
  const q = (query || '').trim().toLowerCase();
  const allowedTypes = new Set(Object.keys(ORG_CONFIG.allowedTypes));

  // TODAY summary
  if (q === 'today') {
    const msg = await generateDailySummary(CAMPAIGN_ID, ORG_ID);
    await sendWhatsAppMessage(phone, msg);
    return res.json({ ok: true });
  }

  // Shortcuts for issues/incidents
  if (q === 'issues' || q === 'incidents') {
    const type = q === 'issues' ? 'issue' : 'incident';
    const { data, error } = await supabase
      .from('reports')
      .select('category, ward, description, created_at')
      .eq('campaign_id', CAMPAIGN_ID)
      .eq('organization_id', ORG_ID)
      .eq('type', type)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) return res.status(500).json({ error });
    const lines = data.map((r, i) => `${i + 1}. ${r.category} - ${r.description} (${r.ward})`);
    const msg = `${type.toUpperCase()} (${data.length}):\n` + (lines.join('\n') || 'None');
    await sendWhatsAppMessage(phone, msg);
    return res.json({ ok: true });
  }

  // Dynamic type query: e.g., snag, delivery, alert, etc.
  if (allowedTypes.has(q)) {
    const { data, error } = await supabase
      .from('reports')
      .select('category, ward, description, created_at')
      .eq('campaign_id', CAMPAIGN_ID)
      .eq('organization_id', ORG_ID)
      .eq('type', q)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) return res.status(500).json({ error });
    const lines = data.map((r, i) => `${i + 1}. ${r.category} - ${r.description} (${r.ward})`);
    const msg = `${q.toUpperCase()} (${data.length}):\n` + (lines.join('\n') || 'None');
    await sendWhatsAppMessage(phone, msg);
    return res.json({ ok: true });
  }

  // Ward filter
  if (q.startsWith('ward ')) {
    const ward = q.replace('ward ', '').trim();
    const { data, error } = await supabase
      .from('reports')
      .select('type, category, description, created_at')
      .eq('campaign_id', CAMPAIGN_ID)
      .eq('organization_id', ORG_ID)
      .ilike('ward', ward)
      .order('created_at', { ascending: false })
      .limit(15);

    if (error) return res.status(500).json({ error });
    const lines = data.map((r, i) => `${i + 1}. [${r.type}] ${r.category} - ${r.description}`);
    const msg = `${ward} Reports (${data.length}):\n` + (lines.join('\n') || 'None');
    await sendWhatsAppMessage(phone, msg);
    return res.json({ ok: true });
  }

  // Search
  if (q.startsWith('search ')) {
    const term = q.replace('search ', '').trim();
    const { data, error } = await supabase
      .from('reports')
      .select('type, ward, description')
      .eq('campaign_id', CAMPAIGN_ID)
      .eq('organization_id', ORG_ID)
      .ilike('description', `%${term}%`)
      .order('created_at', { ascending: false })
      .limit(15);

    if (error) return res.status(500).json({ error });
    const lines = data.map((r, i) => `${i + 1}. [${r.ward}] ${r.type} - ${r.description}`);
    const msg = `Search "${term}" (${data.length}):\n` + (lines.join('\n') || 'None');
    await sendWhatsAppMessage(phone, msg);
    return res.json({ ok: true });
  }

  await sendWhatsAppMessage(
    phone,
    `Commands: TODAY, WARD <name>, SEARCH <term>, ISSUES, INCIDENTS, or any type: ${[...allowedTypes].join(', ')}`
  );
  res.json({ ok: true });
});

// Simple public reports feed for dashboard
app.get('/reports', async (req, res) => {
  const { data, error } = await supabase
    .from('reports')
    .select('id, type, category, ward, description, created_at')
    .eq('campaign_id', CAMPAIGN_ID)
    .eq('organization_id', ORG_ID)
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Cron job: 7PM Africa/Nairobi daily (org-aware summary)
cron.schedule('0 19 * * *', async () => {
  try {
    const summary = await generateDailySummary(CAMPAIGN_ID, ORG_ID);
    const { data: managers } = await supabase
      .from('users')
      .select('phone')
      .eq('role', 'manager')
      .eq('campaign_id', CAMPAIGN_ID);

    for (const m of managers || []) {
      await sendWhatsAppMessage(m.phone, summary);
    }
  } catch (e) {
    console.error('Cron error', e);
  }
}, { timezone: process.env.TIMEZONE || 'Africa/Nairobi' });

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on ${port}`));