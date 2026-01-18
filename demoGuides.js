// Maps demo keywords to guided responses for field demos and manager demos.
// Keep copy production-ready and non-technical.

const fieldDemoGuides = [
  {
    keywords: ['security demo', 'demo security', 'security'],
    response:
      'Welcome to KwaGround (Security demo).\n' +
      'Send alerts/incidents with site and brief.\n' +
      'Format: TYPE details SITE\n' +
      'Example: ALERT gate breach Site12 urgent\n' +
      'You can also send: INCIDENT trespass Site7.'
  },
  {
    keywords: ['campaign demo', 'politics demo', 'campaign'],
    response:
      'Welcome to KwaGround (Campaign demo).\n' +
      'Share issues/incidents/rumors with ward and details.\n' +
      'Format: TYPE details WARD\n' +
      'Example: ISSUE water shortage Ward5 market blocked.\n' +
      'You can also send: RUMOR vote-buying Ward3.'
  },
  {
    keywords: ['construction demo', 'construction'],
    response:
      'Welcome to KwaGround (Construction demo).\n' +
      'Log snags, deliveries, inspections with site.\n' +
      'Format: TYPE details SITE\n' +
      'Example: DELIVERY cement SiteA truck arrived.\n' +
      'You can also send: SNAG crack wall SiteB east wing.'
  },
  {
    keywords: ['ngo demo', 'ngo', 'research demo', 'field demo'],
    response:
      'Welcome to KwaGround (NGO/Research demo).\n' +
      'Send surveys/reports/incidents with area.\n' +
      'Format: TYPE details AREA\n' +
      'Example: SURVEY malaria nets Area3 25 HH covered.\n' +
      'You can also send: INCIDENT flood Area2 displaced families.'
  },
  {
    keywords: ['sales demo', 'field sales demo', 'sales', 'retail demo'],
    response:
      'Welcome to KwaGround (Field Sales demo).\n' +
      'Share leads/stock/deliveries with store.\n' +
      'Format: TYPE details STORE\n' +
      'Example: STOCK milk shortage Store7.\n' +
      'You can also send: LEAD supermarket Westlands needs POS.'
  }
];

const managerDemoGuides = [
  {
    keywords: ['manager demo', 'view reports', 'today summary demo', 'manager'],
    response:
      'Manager view (demo):\n' +
      'DAILY GROUND REPORT (sample)\n' +
      '• Top type: incident (4)\n' +
      '• Top ward/site: Site12 (3)\n' +
      'By type:\n' +
      '- incident: 4\n' +
      '- alert: 3\n' +
      '- delivery: 2\n' +
      'Try commands (demo): TODAY, ALERT, INCIDENT, WARD Site12, SEARCH flood.'
  }
];

function matchGuide(list, text) {
  const t = (text || '').trim().toLowerCase();
  return list.find(({ keywords }) => keywords.some((k) => t === k || t.startsWith(k)));
}

export function getFieldDemoResponse(text) {
  const hit = matchGuide(fieldDemoGuides, text);
  return hit?.response || null;
}

export function getManagerDemoResponse(text) {
  const hit = matchGuide(managerDemoGuides, text);
  return hit?.response || null;
}