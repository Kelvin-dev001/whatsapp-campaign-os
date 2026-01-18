'use client';
import { useState, useMemo, useCallback, useEffect } from 'react';

const palette = {
  bg: '#f7f9f7',
  card: '#ffffff',
  text: '#0c1a12',
  sub: '#2f4638',
  accent: '#457a55',
  accentDark: '#2f5d3f',
  border: '#dfe6e1',
  soft: '#eef2ee',
  warn: '#c0392b'
};

// Hero rotating phrases for a light typewriter/rotate effect
const rotatingPhrases = ['teams on the ground', 'field teams', 'operations teams'];

const categories = [
  {
    id: 'campaign',
    name: 'Political Campaign',
    summary: 'Ward-level issues, incidents, rumors, and daily rollups.',
    sample: 'INCIDENT blackout Ward5 main transformer'
  },
  {
    id: 'security',
    name: 'Security',
    summary: 'Alerts, SOS, patrol logs, incidents by site.',
    sample: 'ALERT gate breach SiteB urgent'
  },
  {
    id: 'construction',
    name: 'Construction',
    summary: 'Snags, deliveries, inspections by site.',
    sample: 'DELIVERY cement SiteA truck arrived'
  },
  {
    id: 'ngo_research',
    name: 'NGO',
    summary: 'Surveys, reports, incidents by area.',
    sample: 'SURVEY malaria nets Area3 25 HH covered'
  },
  {
    id: 'field_sales',
    name: 'Field Sales',
    summary: 'Leads, stock, deliveries, POS by store.',
    sample: 'STOCK milk shortage Store7'
  }
];

const faqItems = [
  { q: 'Why not just use WhatsApp groups?', a: 'WhatsApp is great for chatting, not reporting. KwaGround adds structure and summaries — without changing WhatsApp.' },
  { q: 'Why not Google Forms?', a: 'Forms interrupt work. WhatsApp is already where the work happens.' },
  { q: 'Isn’t this too simple?', a: 'Simple is the point. Adoption beats complexity every time.' },
  { q: 'What about data security?', a: 'We don’t read private chats. Only structured reports sent to the KwaGround number are processed.' },
  { q: 'Can this scale?', a: 'Yes. One manager or 1,000 field officers — same workflow.' },
  { q: 'Is this only for politics?', a: 'No. Any organization with people on the ground: NGOs, construction, security, research, logistics.' },
  { q: 'Do managers need a new app?', a: 'No. Managers get summaries and can query via WhatsApp. Optional web dashboard for oversight.' },
  { q: 'How fast to roll out?', a: 'Under an hour for a pilot. Your team already knows WhatsApp.' }
];

// Updated Kenya-market pricing (with Most Popular badge)
const plans = [
  {
    name: '7-Day Guided Pilot',
    price: 'KES 2,000',
    note: 'Guided pilot',
    features: [
      'Up to 10 field reports/day',
      '1 manager number',
      'System customization per org workflow',
      'Daily summaries',
      'Dashboard exports (CSV / PDF)',
      'Basic support'
    ],
    cta: 'Start Pilot',
    badge: 'Starter'
  },
  {
    name: 'Teams',
    price: 'KES 10,000 /mo',
    note: 'Most Popular',
    features: [
      'Up to 5,000 reports/month',
      'Up to 5 manager numbers',
      'Daily & weekly summaries',
      'Media uploads (images, PDFs, videos)',
      'System customization per org',
      'Dashboard exports (CSV / PDF)',
      'Priority support'
    ],
    cta: 'Talk to Sales',
    badge: 'Most Popular'
  },
  {
    name: 'Scale',
    price: 'Custom',
    note: 'For large orgs',
    features: [
      'Unlimited reports',
      'Role-based access',
      'Custom workflows',
      'SLA & training',
      'Dedicated CSM'
    ],
    cta: 'Book a Call',
    badge: null
  }
];

const reviews = [
  { name: 'Operations Lead, Security Firm', quote: 'We cut through the noise. Nightly rollups mean fewer calls and faster shifts.' },
  { name: 'Program Manager, NGO', quote: 'Volunteers already lived in WhatsApp. KwaGround gave us structure without friction.' },
  { name: 'Field Director, Campaign', quote: 'We finally see where issues spike. Ward-level summaries changed our mornings.' }
];

export default function KwaGroundLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [phone, setPhone] = useState('');
  const [intentStatus, setIntentStatus] = useState({ state: 'idle', message: '' });
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Rotate hero phrase (lightweight, no heavy animation libs)
  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const navItems = useMemo(
    () => [
      { label: 'Overview', id: 'hero' },
      { label: 'Demo', id: 'demo' },
      { label: 'Who it’s for', id: 'who' },
      { label: 'Pricing', id: 'pricing' },
      { label: 'FAQ', id: 'faq' },
      { label: 'Contact', id: 'contact' }
    ],
    []
  );

  const currentCategory = useMemo(
    () => categories.find((c) => c.id === selectedCategory) || categories[0],
    [selectedCategory]
  );

  const whatsappLink = useMemo(() => {
    const text = encodeURIComponent(`DEMO ${currentCategory.name}`);
    return `https://wa.me/254733447049?text=${text}`;
  }, [currentCategory]);

  const saveIntent = useCallback(async () => {
    if (!phone.trim()) {
      setIntentStatus({ state: 'error', message: 'Enter your phone number (e.g., +2547xxxxxxx).' });
      return;
    }
    const normalized = phone.trim();
    const valid = /^\+[1-9]\d{6,14}$/.test(normalized);
    if (!valid) {
      setIntentStatus({ state: 'error', message: 'Phone must be E.164 (e.g., +254712345678).' });
      return;
    }
    try {
      setIntentStatus({ state: 'saving', message: 'Saving your demo intent…' });
      await fetch('/api/demo-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: normalized, organization_id: selectedCategory })
      });
      setIntentStatus({ state: 'ok', message: 'Saved. Tap “Open WhatsApp Demo” to start.' });
    } catch (e) {
      setIntentStatus({ state: 'error', message: 'Could not save. You can still tap WhatsApp to proceed.' });
    }
  }, [phone, selectedCategory]);

  // Close mobile menu on resize
  useEffect(() => {
    const handler = () => setMenuOpen(false);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <main style={styles.page}>
      <GradientBg />
      <header style={styles.header}>
        <div style={styles.brand} onClick={() => scrollTo('hero')}>
          {/* WhatsApp icon for instant recognition */}
          <svg
            aria-hidden
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.logoSvg}
          >
            <path
              fill="#25D366"
              d="M16 3C9.372 3 4 8.198 4 14.6c0 2.444.814 4.705 2.188 6.55L4 29l7.18-1.884C12.89 28 14.41 28.2 16 28.2c6.628 0 12-5.198 12-11.6C28 8.198 22.628 3 16 3Z"
            />
            <path
              fill="#fff"
              d="M12.7 9.8c-.26-.58-.54-.6-.79-.61-.2-.01-.43-.01-.66-.01-.23 0-.6.09-.92.43-.31.34-1.2 1.17-1.2 2.85 0 1.68 1.23 3.3 1.4 3.52.17.22 2.36 3.69 5.82 5.02 2.88 1.12 3.46.9 4.09.85.63-.05 2.02-.82 2.31-1.61.29-.79.29-1.47.2-1.61-.09-.14-.32-.23-.66-.41-.34-.18-2.02-1-2.34-1.12-.32-.12-.55-.18-.79.18-.24.36-.91 1.12-1.12 1.36-.2.24-.41.27-.75.09-.34-.18-1.44-.52-2.74-1.66-1.01-.9-1.69-2.01-1.89-2.37-.2-.36-.02-.55.15-.73.16-.16.36-.41.54-.61.18-.2.24-.36.36-.6.12-.24.06-.46-.03-.64-.09-.18-.79-1.93-1.11-2.64Z"
            />
          </svg>
          <span style={styles.brandText}>KwaGround</span>
        </div>
        <nav style={styles.nav}>
          <div style={{ display: 'none', gap: 16 }}>
            {navItems.map((item) => (
              <button key={item.id} style={styles.navLink} onClick={() => scrollTo(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
          <button style={styles.burger} aria-label="Toggle menu" onClick={() => setMenuOpen((o) => !o)}>
            <span style={{ ...styles.burgerLine, ...(menuOpen ? styles.burgerLineOpenTop : {}) }} />
            <span style={{ ...styles.burgerLine, ...(menuOpen ? styles.burgerLineOpenMid : {}) }} />
            <span style={{ ...styles.burgerLine, ...(menuOpen ? styles.burgerLineOpenBot : {}) }} />
          </button>
          {menuOpen && (
            <div style={styles.mobileMenu}>
              {navItems.map((item) => (
                <button key={item.id} style={styles.mobileLink} onClick={() => scrollTo(item.id)}>
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      <Section id="hero" style={styles.hero}>
        <div style={styles.heroText}>
          <p style={styles.kicker}>WhatsApp-native field reporting</p>
          <h1 style={styles.h1}>
            Know what’s happening with{' '}
            <span style={styles.rotateWrap}>
              {rotatingPhrases[phraseIndex]}
              <span style={styles.cursor}>|</span>
            </span>
          </h1>
          <p style={styles.lead}>
            KwaGround turns WhatsApp updates from the field into clear, structured daily reports.
          </p>
          <div style={styles.ctaRow}>
            <a href="#demo" style={{ ...styles.cta, ...styles.ctaPrimary }}>Choose a Demo</a>
            <a href="#contact" style={{ ...styles.cta, ...styles.ctaGhost }}>Request a Private Demo</a>
          </div>
          <p style={styles.trust}>No new apps. No training. Just WhatsApp.</p>
        </div>

        {/* BEFORE vs AFTER section replacing sample inbound/summary */}
        <div style={styles.beforeAfterWrap}>
          <div style={styles.beforeCard}>
            <div style={styles.badgeSoft}>BEFORE KWA GROUND — WhatsApp Chaos</div>
            <div style={styles.chatBubble}>Good morning</div>
            <div style={styles.chatBubble}>We are at the site</div>
            <div style={styles.chatBubble}>Kuna shida hapa 🤦🏽‍♂️</div>
            <div style={styles.chatBubble}>Water imepasuka</div>
            <div style={styles.chatBubble}>Likoni side</div>
            <div style={styles.caption}>Important updates get buried in group chats.</div>
          </div>
          <div style={styles.afterCard}>
            <div style={styles.badgePrimary}>AFTER KWA GROUND — Clear Structured Report</div>
            <div style={styles.reportRow}>📍 Location: <strong>Likoni</strong></div>
            <div style={styles.reportRow}>🚨 Issue: <strong>Water shortage (pipe burst)</strong></div>
            <div style={styles.reportRow}>📅 Date: <strong>Today</strong></div>
            <div style={styles.reportRow}>👥 Status: <strong>Reported from the field</strong></div>
            <div style={styles.caption}>KwaGround turns messages into clarity.</div>
          </div>
        </div>
      </Section>

      <Section id="demo" title="Pick a demo and send your first WhatsApp message.">
        <div style={styles.cardGrid}>
          {categories.map((cat) => {
            const active = cat.id === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{ ...styles.catCard, ...(active ? styles.catCardActive : {}) }}
              >
                <div style={styles.catHeader}>
                  <span style={styles.catName}>{cat.name}</span>
                  {active && <span style={styles.badge}>Selected</span>}
                </div>
                <p style={styles.catSummary}>{cat.summary}</p>
                <p style={styles.catSample}><strong>Example:</strong> {cat.sample}</p>
              </button>
            );
          })}
        </div>

        <div style={styles.demoBox}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={styles.label}>Your phone (E.164, e.g., +254712345678)</label>
            <input
              style={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+2547xxxxxxxx"
            />
            <div style={styles.ctaRow}>
              <button style={{ ...styles.cta, ...styles.ctaGhost }} onClick={saveIntent}>
                Save my choice
              </button>
              <a href={whatsappLink} target="_blank" rel="noreferrer" style={{ ...styles.cta, ...styles.ctaPrimary }}>
                Open WhatsApp Demo
              </a>
            </div>
            {intentStatus.state !== 'idle' && (
              <p
                style={{
                  ...styles.statusText,
                  color: intentStatus.state === 'error' ? palette.warn : palette.sub
                }}
              >
                {intentStatus.message}
              </p>
            )}
            <p style={styles.body}>
              We’ll remember your choice for this phone for a short time. You can switch any time by selecting another card and sending a new DEMO message.
            </p>
          </div>
        </div>
      </Section>

      <Section id="who" title="Built for teams that work on the ground.">
        <ul style={styles.list}>
          <li>NGOs & community programs</li>
          <li>Field operations teams</li>
          <li>Security companies</li>
          <li>Real estate & construction</li>
          <li>Campaigns & civic organizations</li>
        </ul>
        <p style={styles.body}>If your work happens outside the office, KwaGround fits.</p>
      </Section>

      <Section id="why" title="Why teams use KwaGround">
        <ul style={styles.list}>
          <li>Organize WhatsApp updates</li>
          <li>Get daily & weekly summaries</li>
          <li>Reduce confusion</li>
          <li>Improve accountability</li>
          <li>Make faster decisions</li>
        </ul>
      </Section>

      <Section id="trust" title="Built with trust in mind.">
        <ul style={styles.list}>
          <li>No voter data collection</li>
          <li>No unsolicited messaging</li>
          <li>Secure, organization-based data</li>
          <li>WhatsApp-compliant workflows</li>
        </ul>
      </Section>

      <Section id="pricing" title="Pricing">
        <div style={styles.pricingGrid}>
          {plans.map((p) => (
            <div key={p.name} style={styles.priceCard}>
              <div style={styles.priceHeader}>
                <div style={styles.priceHeaderRow}>
                  <h3 style={{ margin: 0 }}>{p.name}</h3>
                  {p.badge && (
                    <span style={p.badge === 'Most Popular' ? styles.popularBadge : styles.softBadge}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <p style={{ ...styles.body, margin: '4px 0' }}>{p.note}</p>
              </div>
              <div style={styles.priceTag}>{p.price}</div>
              <ul style={styles.priceList}>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
              <a href="#contact" style={{ ...styles.cta, ...styles.ctaPrimary, width: '100%', textAlign: 'center' }}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </Section>

      <Section id="reviews" title="What teams say">
        <div style={styles.reviews}>
          {reviews.map((r) => (
            <div key={r.name} style={styles.reviewCard}>
              <p style={styles.quote}>“{r.quote}”</p>
              <p style={styles.reviewName}>{r.name}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="faq" title="FAQ">
        <div style={styles.faqGrid}>
          {faqItems.map((item) => (
            <details key={item.q} style={styles.faqItem}>
              <summary style={styles.faqQ}>{item.q}</summary>
              <p style={styles.faqA}>{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Contact & Next Steps">
        <div style={styles.contactBox}>
          <div>
            <p style={styles.body}>Ready to pilot? We can set you up in under an hour.</p>
            <p style={styles.body}>Email: hello@kwaground.com</p>
            <p style={styles.body}>WhatsApp: +254 759 293 030</p>
          </div>
          <div style={styles.ctaRow}>
            <a href="mailto:hello@kwaground.com" style={{ ...styles.cta, ...styles.ctaPrimary }}>Request a 7-Day Pilot</a>
            <a href="#demo" style={{ ...styles.cta, ...styles.ctaGhost }}>Try Live Demo</a>
          </div>
        </div>
      </Section>

      <footer style={styles.footer}>
        <span>KwaGround — clarity from the ground up.</span>
      </footer>

      <style jsx global>{`
        @media (min-width: 820px) {
          nav > div:first-of-type { display: flex !important; }
          .hide-desktop { display: none !important; }
        }
        @media (max-width: 819px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </main>
  );
}

function Section({ id, title, children, style }) {
  return (
    <section id={id} style={{ ...styles.section, ...style }}>
      {title && <h2 style={styles.h2}>{title}</h2>}
      {children}
    </section>
  );
}

function GradientBg() {
  return (
    <div style={styles.gradientWrap} aria-hidden>
      <div style={styles.gradient1} />
      <div style={styles.gradient2} />
    </div>
  );
}

const styles = {
  page: {
    position: 'relative',
    background: palette.bg,
    minHeight: '100vh',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    color: palette.text,
    padding: '16px clamp(16px, 3vw, 28px)',
    overflowX: 'hidden'
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    background: 'transparent',
    backdropFilter: 'blur(8px)'
  },
  brand: { display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' },
  brandText: { fontWeight: 700, fontSize: '1.1rem' },
  logoSvg: { width: 32, height: 32 },
  nav: { position: 'relative', display: 'flex', alignItems: 'center', gap: 12 },
  navLink: { border: 'none', background: 'transparent', color: palette.sub, fontWeight: 600, cursor: 'pointer' },
  burger: {
    width: 40, height: 36, borderRadius: 10, border: `1px solid ${palette.border}`,
    background: palette.card, display: 'grid', placeItems: 'center', padding: 0
  },
  burgerLine: { width: 18, height: 2, background: palette.text, display: 'block', transition: '0.2s ease' },
  burgerLineOpenTop: { transform: 'translateY(4px) rotate(45deg)' },
  burgerLineOpenMid: { opacity: 0 },
  burgerLineOpenBot: { transform: 'translateY(-4px) rotate(-45deg)' },
  mobileMenu: {
    position: 'absolute', top: 48, right: 0, background: palette.card,
    border: `1px solid ${palette.border}`, borderRadius: 12, padding: 10,
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)', display: 'grid', gap: 6, minWidth: 180
  },
  mobileLink: {
    textAlign: 'left', background: 'transparent', border: 'none',
    padding: '8px 6px', color: palette.text, fontWeight: 600, cursor: 'pointer'
  },
  gradientWrap: { position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' },
  // Slightly animated gradients (subtle, low-motion)
  gradient1: {
    position: 'absolute', width: 320, height: 320, top: -80, right: -120,
    background: 'radial-gradient(circle at 30% 30%, rgba(69,122,85,0.25), transparent 55%)',
    filter: 'blur(60px)', animation: 'float1 16s ease-in-out infinite alternate'
  },
  gradient2: {
    position: 'absolute', width: 280, height: 280, top: 180, left: -80,
    background: 'radial-gradient(circle at 70% 70%, rgba(47,93,63,0.2), transparent 60%)',
    filter: 'blur(60px)', animation: 'float2 18s ease-in-out infinite alternate'
  },
  hero: { position: 'relative', zIndex: 1, display: 'grid', gap: 18, alignItems: 'center', paddingTop: 12 },
  heroText: { display: 'grid', gap: 10, maxWidth: 720 },
  kicker: { letterSpacing: '0.04em', textTransform: 'uppercase', color: palette.sub, fontWeight: 700, fontSize: 12 },
  h1: { fontSize: '2.3rem', lineHeight: 1.2, margin: 0 },
  rotateWrap: { fontWeight: 800, color: palette.accentDark, whiteSpace: 'nowrap' },
  cursor: { color: palette.accentDark, marginLeft: 2, animation: 'blink 1.4s steps(2, start) infinite' },
  lead: { fontSize: '1.05rem', color: palette.sub, margin: 0 },
  ctaRow: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 },
  cta: {
    padding: '12px 16px', borderRadius: 12, fontWeight: 700, textDecoration: 'none',
    border: `1px solid ${palette.accentDark}`, transition: 'transform 0.1s ease, box-shadow 0.2s ease'
  },
  ctaPrimary: { background: palette.accent, color: '#fff', boxShadow: '0 12px 30px rgba(69,122,85,0.25)' },
  ctaGhost: { background: 'transparent', color: palette.accentDark },
  trust: { color: palette.sub, marginTop: 4 },

  // BEFORE/AFTER cards
  beforeAfterWrap: {
    display: 'grid',
    gap: 12,
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    width: '100%'
  },
  beforeCard: {
    background: palette.card,
    border: `1px solid ${palette.border}`,
    borderRadius: 14,
    padding: 14,
    boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
    display: 'grid',
    gap: 8
  },
  afterCard: {
    background: palette.soft,
    border: `1px solid ${palette.border}`,
    borderRadius: 14,
    padding: 14,
    boxShadow: '0 10px 26px rgba(0,0,0,0.06)',
    display: 'grid',
    gap: 8
  },
  chatBubble: {
    background: '#e6f4ea',
    borderRadius: 12,
    padding: '10px 12px',
    border: `1px solid ${palette.border}`,
    color: palette.text,
    fontSize: 14,
    lineHeight: 1.4
  },
  caption: { color: palette.sub, fontSize: 13 },
  reportRow: { fontSize: 15, color: palette.text },
  badgeSoft: {
    display: 'inline-block',
    background: '#eef6f0',
    color: palette.accentDark,
    padding: '6px 10px',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 12,
    border: `1px solid ${palette.border}`
  },
  badgePrimary: {
    display: 'inline-block',
    background: palette.accent,
    color: '#fff',
    padding: '6px 10px',
    borderRadius: 999,
    fontWeight: 700,
    fontSize: 12,
    border: `1px solid ${palette.accentDark}`
  },

  section: {
    position: 'relative',
    zIndex: 1,
    background: palette.card,
    borderRadius: 16,
    padding: '18px 16px',
    border: `1px solid ${palette.border}`,
    boxShadow: '0 10px 26px rgba(0,0,0,0.04)',
    marginTop: 14
  },
  h2: { margin: '0 0 10px', fontSize: '1.3rem' },
  body: { margin: '6px 0', color: palette.sub, lineHeight: 1.6 },
  list: { margin: '6px 0', paddingLeft: 18, color: palette.sub, lineHeight: 1.5 },
  pricingGrid: { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' },
  priceCard: {
    background: palette.card,
    border: `1px solid ${palette.border}`,
    borderRadius: 14,
    padding: 14,
    display: 'grid',
    gap: 10,
    boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
  },
  priceHeader: { borderBottom: `1px solid ${palette.border}`, paddingBottom: 6 },
  priceHeaderRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  priceTag: { fontSize: '1.8rem', fontWeight: 800 },
  priceList: { paddingLeft: 18, margin: 0, color: palette.sub, lineHeight: 1.5 },
  reviews: { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' },
  reviewCard: {
    background: palette.soft,
    borderRadius: 12,
    padding: 14,
    border: `1px solid ${palette.border}`
  },
  quote: { margin: '0 0 8px', color: palette.text, lineHeight: 1.5 },
  reviewName: { margin: 0, color: palette.sub, fontWeight: 700 },
  faqGrid: { display: 'grid', gap: 10 },
  faqItem: { border: `1px solid ${palette.border}`, borderRadius: 12, padding: '10px 12px', background: palette.card },
  faqQ: { cursor: 'pointer', fontWeight: 700 },
  faqA: { margin: '6px 0 0', color: palette.sub, lineHeight: 1.5 },
  contactBox: { display: 'grid', gap: 10, gridTemplateColumns: '1fr', alignItems: 'center' },
  footer: { position: 'relative', zIndex: 1, marginTop: 18, padding: '14px 0', color: palette.sub, fontSize: 14, textAlign: 'center' },
  cardGrid: { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 12 },
  catCard: {
    textAlign: 'left', padding: 14, borderRadius: 14, border: `1px solid ${palette.border}`,
    background: palette.soft, cursor: 'pointer', display: 'grid', gap: 8
  },
  catCardActive: { borderColor: palette.accent, boxShadow: '0 10px 26px rgba(69,122,85,0.12)', background: '#f3f8f4' },
  catHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  catName: { fontWeight: 800 },
  catSummary: { margin: 0, color: palette.sub, lineHeight: 1.5 },
  catSample: { margin: 0, color: palette.sub, fontFamily: 'ui-monospace, monospace', fontSize: 13 },
  badge: {
    background: palette.accent, color: '#fff', borderRadius: 999, padding: '4px 10px',
    fontSize: 12, fontWeight: 700
  },
  demoBox: {
    border: `1px solid ${palette.border}`, borderRadius: 14, padding: 14,
    background: palette.card, boxShadow: '0 10px 24px rgba(0,0,0,0.04)', marginTop: 6
  },
  label: { fontWeight: 700, color: palette.sub },
  input: {
    borderRadius: 10, border: `1px solid ${palette.border}`, padding: '12px 10px',
    fontSize: 15, background: '#fff'
  },
  statusText: { margin: '4px 0 0', fontSize: 14 },
  popularBadge: {
    background: '#2f5d3f',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800
  },
  softBadge: {
    background: '#eef6f0',
    color: palette.accentDark,
    padding: '4px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    border: `1px solid ${palette.border}`
  }
};

/* Minimal keyframes for subtle effects */
const styleSheet = typeof document !== 'undefined' ? document.styleSheets[0] : null;
if (styleSheet && styleSheet.insertRule) {
  styleSheet.insertRule('@keyframes blink { 0%, 50% { opacity: 1; } 50.01%, 100% { opacity: 0; } }', styleSheet.cssRules.length);
  styleSheet.insertRule('@keyframes float1 { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(10px, -6px, 0); } }', styleSheet.cssRules.length);
  styleSheet.insertRule('@keyframes float2 { 0% { transform: translate3d(0,0,0); } 100% { transform: translate3d(-12px, 8px, 0); } }', styleSheet.cssRules.length);
}