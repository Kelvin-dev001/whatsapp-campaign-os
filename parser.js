const WARDS = ['nyali', 'kisauni', 'likoni'];

export function parseMessage(text, senderPhone, volunteerWard) {
  if (!text) return { valid: false, error: 'Empty message' };

  const parts = text.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase();
  const allowed = ['report', 'issue', 'incident', 'rumor'];

  if (!allowed.includes(command)) {
    return { valid: false, error: 'Please start with REPORT, ISSUE, INCIDENT, or RUMOR' };
  }

  const body = text.slice(command.length).trim();
  const wardMatch = WARDS.find(w => body.toLowerCase().includes(w));
  const ward = wardMatch || volunteerWard || 'UNKNOWN';

  const bodyParts = body.split(/\s+/);
  const category = bodyParts[0] || 'uncategorized';
  const description = body.trim();

  return {
    valid: true,
    type: command === 'report' ? 'report'
         : command === 'issue' ? 'issue'
         : command === 'incident' ? 'incident'
         : 'rumor',
    category,
    ward,
    description
  };
}
