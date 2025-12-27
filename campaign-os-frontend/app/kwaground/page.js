'use client';
import { useState, useMemo } from 'react';

const palette = {
  bg: '#f7f9f7',
  card: '#ffffff',
  text: '#0c1a12',
  sub: '#2f4638',
  accent: '#457a55',
  accentDark: '#2f5d3f',
  border: '#dfe6e1',
  soft: '#eef2ee'
};

const faqItems = [
  {
    q: 'Why not just use WhatsApp groups?',
    a: 'WhatsApp is great for chatting, not reporting. KwaGround adds structure and summaries — without changing WhatsApp.'
  },
  {
    q: 'Why not Google Forms?',
    a: 'Forms interrupt work. WhatsApp is already where the work happens.'
  },
  {
    q: 'Isn’t this too simple?',
    a: 'Simple is the point. Adoption beats complexity every time.'
  },
  {
    q: 'What about data security?',
    a: 'We don’t read private chats. Only structured reports sent to the KwaGround number are processed.'
  },
  {
    q: 'Can this scale?',
    a: 'Yes. One manager or 1,000 field officers — same workflow.'
  },
  {
    q: 'Is this only for politics?',
    a: 'No. Any organization with people on the ground: NGOs, construction, security, research, logistics.'
  },
  {
    q: 'Do managers need a new app?',
    a: 'No. Managers get summaries and can query via WhatsApp. Optional web dashboard for oversight.'
  },
  {
    q: 'How fast to roll out?',
    a: 'Under an hour for a pilot. Your team already knows WhatsApp.'
  }
];

const plans = [
  {
    name: 'Pilot',
    price: '$0',
    note: '7-day guided pilot',
    features: [
      'Up to 50 field reports/day',
      '1 manager number',
      'Daily summaries',
      'Basic support'
    ],
    cta: 'Start Pilot'
  },
  {
    name: 'Teams',
    price: '$249/mo',
    note: 'Most popular',
    features: [
      'Up to 5,000 reports/mo',
      'Up to 10 managers',
      'Daily & weekly summaries',
      'Ward/region filters',
      'Priority support'
    ],
    cta: 'Talk to Sales'
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
    cta: 'Book a Call'
  }
];

const reviews = [
  {
    name: 'Operations Lead, Security Firm',
    quote: 'We cut through the noise. Nightly rollups mean fewer calls and faster shifts.'
  },
  {
    name: 'Program Manager, NGO',
    quote: 'Volunteers already lived in WhatsApp. KwaGround gave us structure without friction.'
  },
  {
    name: 'Field Director, Campaign',
    quote: 'We finally see where issues spike. Ward-level summaries changed our mornings.'
  }
];

export default function KwaGroundLanding() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const navItems = useMemo(
    () => [
      { label: 'Overview', id: 'hero' },
      { label: 'How it works', id: 'demo' },
      { label: 'Who it’s for', id: 'who' },
      { label: 'Pricing', id: 'pricing' },
      { label: 'FAQ', id: 'faq' },
      { label: 'Contact', id: 'contact' }
    ],
    []
  );

  return (
    <main style={styles.page}>
      <GradientBg />
      <header style={styles.header}>
        <div style={styles.brand} onClick={() => scrollTo('hero')}>
          <div style={styles.logoDot} />
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
          <button
            style={styles.burger}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
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
          <h1 style={styles.h1}>Know what’s happening on the ground — instantly.</h1>
          <p style={styles.lead}>
            KwaGround turns WhatsApp updates from the field into clear, structured daily reports.
          </p>
          <div style={styles.ctaRow}>
            <a href="#demo" style={{ ...styles.cta, ...styles.ctaPrimary }}>Try Live WhatsApp Demo</a>
            <a href="#contact" style={{ ...styles.cta, ...styles.ctaGhost }}>Request a Private Demo</a>
          </div>
          <p style={styles.trust}>No new apps. No training. Just WhatsApp.</p>
        </div>
        <div style={styles.heroCard}>
          <h3 style={styles.cardTitle}>Sample inbound</h3>
          <div style={styles.codeBox}>
            <code>ISSUE water shortage Likoni</code>
            <code>REPORT site visit 12 Nyali</code>
            <code>INCIDENT police harassment market</code>
          </div>
          <h3 style={{ ...styles.cardTitle, marginTop: 16 }}>Sample summary</h3>
          <p style={styles.summaryText}>
            • 12 reports today<br />
            • Top issue: water shortage<br />
            • Most active ward: Nyali
          </p>
        </div>
      </Section>

      <Section id="what" title="What is KwaGround?">
        <p style={styles.body}>
          KwaGround is a reporting tool built on WhatsApp. Field teams send simple updates; KwaGround
          organizes them and sends managers clear daily summaries. No scrolling. No guessing.
        </p>
        <div style={styles.chips}>
          <span style={styles.chip}>ISSUE water shortage Likoni</span>
          <span style={styles.chip}>REPORT site visit 12 Nyali</span>
        </div>
      </Section>

      <Section id="demo" title="Try it in 60 seconds.">
        <ol style={styles.list}>
          <li>Open WhatsApp</li>
          <li>Send a report to our demo number</li>
          <li>See how updates are organized and summarized</li>
        </ol>
        <div style={styles.ctaRow}>
          <a href="#demo-start" style={{ ...styles.cta, ...styles.ctaPrimary }}>Open WhatsApp Demo</a>
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
                <h3 style={{ margin: 0 }}>{p.name}</h3>
                <p style={{ ...styles.body, margin: '4px 0' }}>{p.note}</p>
              </div>
              <div style={styles.priceTag}>{p.price}</div>
              <ul style={styles.priceList}>
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
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
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer'
  },
  logoDot: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: palette.accent
  },
  brandText: { fontWeight: 700, fontSize: '1.1rem' },
  nav: { position: 'relative', display: 'flex', alignItems: 'center', gap: 12 },
  navLink: {
    border: 'none',
    background: 'transparent',
    color: palette.sub,
    fontWeight: 600,
    cursor: 'pointer'
  },
  burger: {
    width: 40,
    height: 36,
    borderRadius: 10,
    border: `1px solid ${palette.border}`,
    background: palette.card,
    display: 'grid',
    placeItems: 'center',
    padding: 0
  },
  burgerLine: {
    width: 18,
    height: 2,
    background: palette.text,
    display: 'block',
    transition: '0.2s ease'
  },
  burgerLineOpenTop: { transform: 'translateY(4px) rotate(45deg)' },
  burgerLineOpenMid: { opacity: 0 },
  burgerLineOpenBot: { transform: 'translateY(-4px) rotate(-45deg)' },
  mobileMenu: {
    position: 'absolute',
    top: 48,
    right: 0,
    background: palette.card,
    border: `1px solid ${palette.border}`,
    borderRadius: 12,
    padding: 10,
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
    display: 'grid',
    gap: 6,
    minWidth: 180
  },
  mobileLink: {
    textAlign: 'left',
    background: 'transparent',
    border: 'none',
    padding: '8px 6px',
    color: palette.text,
    fontWeight: 600,
    cursor: 'pointer'
  },
  gradientWrap: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    zIndex: 0,
    pointerEvents: 'none'
  },
  gradient1: {
    position: 'absolute',
    width: 320,
    height: 320,
    top: -80,
    right: -120,
    background: 'radial-gradient(circle at 30% 30%, rgba(69,122,85,0.25), transparent 55%)',
    filter: 'blur(60px)',
    animation: 'float1 12s ease-in-out infinite'
  },
  gradient2: {
    position: 'absolute',
    width: 280,
    height: 280,
    top: 180,
    left: -80,
    background: 'radial-gradient(circle at 70% 70%, rgba(47,93,63,0.2), transparent 60%)',
    filter: 'blur(60px)',
    animation: 'float2 14s ease-in-out infinite'
  },
  hero: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gap: 18,
    alignItems: 'center',
    paddingTop: 12
  },
  heroText: { display: 'grid', gap: 10, maxWidth: 720 },
  kicker: { letterSpacing: '0.04em', textTransform: 'uppercase', color: palette.sub, fontWeight: 700, fontSize: 12 },
  h1: { fontSize: '2.3rem', lineHeight: 1.2, margin: 0 },
  lead: { fontSize: '1.05rem', color: palette.sub, margin: 0 },
  ctaRow: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 },
  cta: {
    padding: '12px 16px',
    borderRadius: 12,
    fontWeight: 700,
    textDecoration: 'none',
    border: `1px solid ${palette.accentDark}`,
    transition: 'transform 0.1s ease, box-shadow 0.2s ease'
  },
  ctaPrimary: {
    background: palette.accent,
    color: '#fff',
    boxShadow: '0 12px 30px rgba(69,122,85,0.25)'
  },
  ctaGhost: {
    background: 'transparent',
    color: palette.accentDark
  },
  trust: { color: palette.sub, marginTop: 4 },
  heroCard: {
    maxWidth: 360,
    background: palette.card,
    borderRadius: 16,
    padding: 16,
    border: `1px solid ${palette.border}`,
    boxShadow: '0 12px 28px rgba(0,0,0,0.06)'
  },
  cardTitle: { margin: '0 0 8px', fontSize: '1rem' },
  codeBox: {
    background: palette.soft,
    borderRadius: 12,
    padding: 12,
    display: 'grid',
    gap: 6,
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    fontSize: 14
  },
  summaryText: { margin: 0, color: palette.sub },
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
  chips: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 },
  chip: {
    background: palette.soft,
    color: palette.text,
    borderRadius: 999,
    padding: '8px 12px',
    border: `1px solid ${palette.border}`,
    fontFamily: 'ui-monospace, monospace',
    fontSize: 13
  },
  list: { margin: '6px 0', paddingLeft: 18, color: palette.sub, lineHeight: 1.5 },
  pricingGrid: {
    display: 'grid',
    gap: 12,
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))'
  },
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
  faqItem: {
    border: `1px solid ${palette.border}`,
    borderRadius: 12,
    padding: '10px 12px',
    background: palette.card
  },
  faqQ: { cursor: 'pointer', fontWeight: 700 },
  faqA: { margin: '6px 0 0', color: palette.sub, lineHeight: 1.5 },
  contactBox: {
    display: 'grid',
    gap: 10,
    gridTemplateColumns: '1fr',
    alignItems: 'center'
  },
  footer: {
    position: 'relative',
    zIndex: 1,
    marginTop: 18,
    padding: '14px 0',
    color: palette.sub,
    fontSize: 14,
    textAlign: 'center'
  }
};