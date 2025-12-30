// Per-organization message settings (extend as needed)
const ORG_CONFIG = {
    default: {
      // Core types and synonyms mapped to normalized types
      allowedTypes: {
        report: ['report'],
        issue: ['issue'],
        incident: ['incident'],
        task: ['task', 'todo'],
        lead: ['lead'],
        alert: ['alert', 'alarm'],
        note: ['note', 'log'],
        // Security
        patrol: ['patrol'],
        // Construction / real estate
        snag: ['snag'],
        site: ['site'],
        delivery: ['delivery', 'del'],
        inspection: ['inspection', 'inspect'],
        // Retail / ops
        store: ['store'],
        pos: ['pos'],
        stock: ['stock'],
        customer: ['customer', 'cust'],
        // Campaign demo
        rumor: ['rumor', 'rumour']
      },
      requireLocation: false,
      labels: { location: 'Location' } // can be "Ward", "Site", "Store", etc.
    },
  
    // Example: political/campaign preset
    campaign: {
      allowedTypes: {
        report: ['report'],
        issue: ['issue'],
        incident: ['incident'],
        rumor: ['rumor', 'rumour']
      },
      requireLocation: false,
      labels: { location: 'Ward' }
    }
  };
  
  // Helper to fetch config by org_id (fallback to default)
  function getOrgConfig(orgId = 'default') {
    return ORG_CONFIG[orgId] || ORG_CONFIG.default;
  }
  
  export { ORG_CONFIG, getOrgConfig };