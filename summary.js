import { supabase } from './supabase.js';

export async function generateDailySummary(campaignId) {
  const { data: rows, error } = await supabase
    .from('reports')
    .select('type, category, ward, description, created_at')
    .eq('campaign_id', campaignId)
    .gte('created_at', new Date(new Date().setHours(0,0,0,0)).toISOString());

  if (error) throw error;
  if (!rows.length) return '?? DAILY GROUND REPORT\nNo reports today.';

  const counts = rows.reduce((acc, r) => {
    acc.total = (acc.total || 0) + 1;
    acc.type = acc.type || {};
    acc.type[r.type] = (acc.type[r.type] || 0) + 1;
    acc.ward = acc.ward || {};
    acc.ward[r.ward] = (acc.ward[r.ward] || 0) + 1;
    return acc;
  }, {});

  const topWard = Object.entries(counts.ward).sort((a,b)=>b[1]-a[1])[0];
  const topType = Object.entries(counts.type).sort((a,b)=>b[1]-a[1])[0];

  const lines = [];
  lines.push('?? DAILY GROUND REPORT');
  lines.push(`• ${counts.total} reports received`);
  if (topType) lines.push(`• Top type: ${topType[0]} (${topType[1]})`);
  if (topWard) lines.push(`• Most active ward: ${topWard[0]} (${topWard[1]})`);
  return lines.join('\n');
}
