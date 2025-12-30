import { supabase } from './supabase.js';

export async function generateDailySummary(campaignId, orgId = 'default') {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('reports')
    .select('type, ward, category')
    .eq('campaign_id', campaignId)
    .eq('organization_id', orgId)
    .gte('created_at', since);

  if (error) {
    console.error('Summary error', error);
    return 'No data available (error).';
  }

  const total = data.length;
  if (!total) return 'DAILY GROUND REPORT\nNo reports in the last 24h.';

  const byType = data.reduce((acc, r) => {
    acc[r.type] = (acc[r.type] || 0) + 1;
    return acc;
  }, {});
  const byWard = data.reduce((acc, r) => {
    const w = r.ward || 'UNKNOWN';
    acc[w] = (acc[w] || 0) + 1;
    return acc;
  }, {});

  const topType = Object.entries(byType).sort((a, b) => b[1] - a[1])[0];
  const topWard = Object.entries(byWard).sort((a, b) => b[1] - a[1])[0];

  const topLines = Object.entries(byType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([t, c]) => `- ${t}: ${c}`);

  return [
    `DAILY GROUND REPORT (${total} reports)`,
    topType ? `• Top type: ${topType[0]} (${topType[1]})` : '• Top type: n/a',
    topWard ? `• Top ward: ${topWard[0]} (${topWard[1]})` : '• Top ward: n/a',
    'By type:',
    ...(topLines.length ? topLines : ['- none'])
  ].join('\n');
}