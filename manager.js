import { supabase } from './supabase.js';
import { sendWhatsAppMessage } from './whatsapp.js';
import { generateDailySummary } from './summary.js';

export async function handleManagerQuery(phone, q, campaignId) {
  const query = (q || '').trim().toLowerCase();

  if (query === 'today') {
    const msg = await generateDailySummary(campaignId);
    await sendWhatsAppMessage(phone, msg);
    return;
  }

  if (query === 'issues' || query === 'incidents') {
    const type = query === 'issues' ? 'issue' : 'incident';
    const { data, error } = await supabase
      .from('reports')
      .select('category, ward, description, created_at')
      .eq('campaign_id', campaignId)
      .eq('type', type)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error(error);
      await sendWhatsAppMessage(phone, 'Error fetching data.');
      return;
    }
    const lines = (data || []).map((r, i) => `${i + 1}. ${r.category} - ${r.description} (${r.ward})`);
    const msg = `${type.toUpperCase()} (${data?.length || 0}):\n` + (lines.join('\n') || 'None');
    await sendWhatsAppMessage(phone, msg);
    return;
  }

  if (query.startsWith('ward ')) {
    const ward = query.replace('ward ', '').trim();
    const { data, error } = await supabase
      .from('reports')
      .select('type, category, description, created_at')
      .eq('campaign_id', campaignId)
      .ilike('ward', ward)
      .order('created_at', { ascending: false })
      .limit(15);

    if (error) {
      console.error(error);
      await sendWhatsAppMessage(phone, 'Error fetching ward data.');
      return;
    }
    const lines = (data || []).map((r, i) => `${i + 1}. [${r.type}] ${r.category} - ${r.description}`);
    const msg = `${ward} Reports (${data?.length || 0}):\n` + (lines.join('\n') || 'None');
    await sendWhatsAppMessage(phone, msg);
    return;
  }

  if (query.startsWith('search ')) {
    const term = query.replace('search ', '').trim();
    const { data, error } = await supabase
      .from('reports')
      .select('type, ward, description')
      .ilike('description', `%${term}%`)
      .order('created_at', { ascending: false })
      .limit(15);

    if (error) {
      console.error(error);
      await sendWhatsAppMessage(phone, 'Error searching.');
      return;
    }
    const lines = (data || []).map((r, i) => `${i + 1}. [${r.ward}] ${r.type} - ${r.description}`);
    const msg = `Search "${term}" (${data?.length || 0}):\n` + (lines.join('\n') || 'None');
    await sendWhatsAppMessage(phone, msg);
    return;
  }

  await sendWhatsAppMessage(phone, 'Commands: ISSUES, INCIDENTS, WARD <name>, TODAY, SEARCH <term>');
}