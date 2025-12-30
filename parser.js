import { getOrgConfig } from './config/orgConfig.js';

function normalizeType(token, orgConfig) {
  if (!token) return null;
  const lower = token.toLowerCase();
  for (const [normalized, synonyms] of Object.entries(orgConfig.allowedTypes)) {
    if (normalized === lower) return normalized;
    if (synonyms.some((s) => s.toLowerCase() === lower)) return normalized;
  }
  return null;
}

/**
 * Parse a freeform WhatsApp message into structured fields.
 * Expected shape: TYPE CATEGORY [LOCATION] DESCRIPTION
 */
export function parseMessage(text, from, volunteerWard, orgId = 'default') {
  const orgConfig = getOrgConfig(orgId);
  const parts = (text || '').trim().split(/\s+/);
  if (parts.length < 2) {
    return { valid: false, error: 'Please start with TYPE CATEGORY ... e.g., ISSUE water shortage Likoni' };
  }

  const rawType = parts[0];
  const normalizedType = normalizeType(rawType, orgConfig);
  if (!normalizedType) {
    const allowedList = Object.keys(orgConfig.allowedTypes).join(', ');
    return { valid: false, error: `Unknown type "${rawType}". Use one of: ${allowedList}` };
  }

  const category = parts[1] || '';
  const location = parts.length > 2 ? parts[2] : (volunteerWard || 'UNKNOWN');
  const descParts = parts.slice(3);
  const description = descParts.join(' ').trim() || '(no details)';

  if (orgConfig.requireLocation && !location) {
    const label = orgConfig.labels?.location || 'Location';
    return { valid: false, error: `${label} is required. Add it after the category.` };
  }

  return {
    valid: true,
    type: normalizedType,
    category,
    ward: location || volunteerWard || 'UNKNOWN',
    description,
    raw_message: text
  };
}