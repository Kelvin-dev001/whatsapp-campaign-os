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

// Extract location using simple keyword cues (at/in/ward/site/store/area/location).
// Returns { location, remainingTokens }.
function extractLocation(tokens, orgConfig) {
  const locationKeywords = ['at', 'in', 'ward', 'site', 'store', 'area', 'loc', 'location'];
  const lowerTokens = tokens.map((t) => t.toLowerCase());

  for (let i = 0; i < lowerTokens.length; i++) {
    if (locationKeywords.includes(lowerTokens[i]) && tokens[i + 1]) {
      const loc = tokens[i + 1];
      const remaining = tokens.filter((_, idx) => idx !== i && idx !== i + 1);
      return { location: loc, remainingTokens: remaining };
    }
  }
  return { location: null, remainingTokens: tokens };
}

/**
 * Improved parse: flexible location, clearer prompts.
 * Expected shape (flexible): TYPE CATEGORY ... [at/in/ward/site/store/area <LOCATION>] ... DESCRIPTION
 */
export function parseMessage(text, from, volunteerWard, orgId = 'default') {
  const orgConfig = getOrgConfig(orgId);
  const parts = (text || '').trim().split(/\s+/);
  if (parts.length < 2) {
    return {
      valid: false,
      error: `Please start with TYPE and brief details. Example: ISSUE water shortage ${orgConfig.labels?.location || 'Location'}`
    };
  }

  const rawType = parts[0];
  const normalizedType = normalizeType(rawType, orgConfig);
  if (!normalizedType) {
    const allowedList = Object.keys(orgConfig.allowedTypes).join(', ');
    return { valid: false, error: `Unknown type "${rawType}". Use one of: ${allowedList}` };
  }

  // Category is the next token
  const category = parts[1] || '';

  // Remaining tokens (after type & category) for location/description
  const remaining = parts.slice(2);
  const { location: extractedLoc, remainingTokens } = extractLocation(remaining, orgConfig);

  // If no explicit location, try volunteer ward
  const location = extractedLoc || volunteerWard || '';

  if (orgConfig.requireLocation && !location) {
    const label = orgConfig.labels?.location || 'Location';
    return {
      valid: false,
      error: `${label} is required. Please include it. Example: ${normalizedType.toUpperCase()} ${category} ${label}Name details`
    };
  }

  const description = remainingTokens.join(' ').trim() || '(no details)';

  return {
    valid: true,
    type: normalizedType,
    category,
    ward: location || 'UNKNOWN',
    description,
    raw_message: text
  };
}