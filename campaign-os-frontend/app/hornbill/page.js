'use client';
import Link from 'next/link';

const palette = {
  bg: '#f7f9fb',
  card: '#ffffff',
  text: '#0f1720',
  sub: '#334155',
  accent: '#1b6bff',
  accentSoft: '#e7efff',
  border: '#e2e8f0',
  success: '#16a34a'
};

const services = [
  {
    title: 'Custom Software & Integrations',
    desc: 'APIs, data pipelines, and platform integrations that connect your tools and automate your workflows.'
  },
  {
    title: 'Cloud & DevOps',
    desc: 'Reliable infra on AWS/Azure/GCP with CI/CD, observability, backups, and cost controls by default.'
  },
  {
    title: 'Data & AI',
    desc: 'Dashboards, reporting, and practical AI/LLM use-cases tailored to your operational data.'
  },
  {
    title: 'Product Delivery',
    desc: 'From discovery to launch. Lean, iterative shipping with measurable outcomes.'
  }
];

const steps = [
  { title: 'Listen', desc: 'We map your goals, constraints, and existing stack.' },
  { title: 'Design', desc: 'We propose a lean plan, architecture, and milestones.' },
  { title: 'Build', desc: 'We ship in weekly increments with tight feedback loops.' },
  { title: 'Support', desc: 'We run, monitor, and improve your systems long-term.' }
];

const faqs = [
  {
    q: 'What makes Hornbill different?',
    a: 'Pragmatic builds, senior engineers only, outcome-first delivery, and clear communication.'
  },
  {
    q: 'Do you work with existing systems?',
    a: 'Yes. We integrate, extend, and modernize without forcing rewrites unless necessary.'
  },
  {
    q: 'Can you start small?',
    a: 'Absolutely. Begin with a scoped engagement, then expand once value is proven.'
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes. We provide SLAs, monitoring, and iterative improvements after launch.'
  }
];

export default function HornbillPage() {
  return (
    <main style={styles.page}>
      <GradientBg />
      <header style={styles.header}>
        <Link href="/" style={styles.brand}>
          <div style={styles.logoDot} />
          <span style={styles.brandText}>Hornbill</span>
        </Link>
        <div style={styles.navCtas}>
          <a href="mailto:hello@hornbill.africa" style={styles.navLink}>Email</a>
          <a href="https://wa.me/254700000000" style={{ ...styles.cta, ...styles.ctaGhost }}>WhatsApp</a>
          <a href="#contact" style={{ ...styles.cta, ...styles.ctaPrimary }}>Talk to us</a>
        </div>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroText}>
          <p style={styles.kicker}>Hornbill Technology Solutions Limited</p>
          <h1 style={styles.h1}>We build reliable software, integrations, and cloud infrastructure.</h1>
          <p style={styles.lead}>
            Senior engineers focused on outcomes: shipping fast, integrating cleanly, and keeping systems observable,
            secure, and affordable.
          </p>
          <div style={styles.ctaRow}>
            <a href="#contact" style={{ ...styles.cta, ...styles.ctaPrimary }}>Book a call</a>
            <a href="https://wa.me/254700000000" style={{ ...styles.cta, ...styles.ctaGhost }}>Chat on WhatsApp</a>
          </div>
          <p style={styles.trust}>Trusted for delivery, clarity, and long-term support.</p>
        </div>
        <div style={styles.heroCard}>
          <h3 style={styles.cardTitle}>Typical wins</h3>
          <ul style={styles.winList}>
            <li>✓ Launch new products faster with lean architecture.</li>
            <li>✓ Reduce ops toil via API-led automations.</li>
            <li>✓ Gain visibility with logging, metrics, and alerting.</li>
            <li>✓ Lower cloud costs with right-sized infra.</li>
          </ul>
        </div>
      </section>

      <Section title="What we do">
        <div style={styles.grid}>
          {services.map((s) => (
            <div key={s.title} style={styles.card}>
              <h3 style={styles.cardTitle}>{s.title}</h3>
              <p style={styles.body}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="How we work">
        <div style={styles.stepGrid}>
          {steps.map((s, i) => (
            <div key={s.title} style={styles.stepCard}>
              <div style={styles.stepNumber}>{i + 1}</div>
              <div>
                <h4 style={styles.stepTitle}>{s.title}</h4>
                <p style={styles.body}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Recent outcomes">
        <div style={styles.outcomes}>
          <Outcome
            title="API & data integration"
            desc="Unified multiple vendor APIs into a single schema; cut manual ops time by 60% and improved data accuracy."
          />
          <Outcome
            title="Cloud cost & reliability"
            desc="Right-sized services, added autoscaling and observability; reduced spend ~25% and improved uptime."
          />
          <Outcome
            title="Product delivery"
            desc="Shipped a pilot in 4 weeks with weekly increments; validated market fit before scaling."
          />
        </div>
      </Section>

      <Section title="FAQ">
        <div style={styles.faqGrid}>
          {faqs.map((f) => (
            <details key={f.q} style={styles.faqItem}>
              <summary style={styles.faqQ}>{f.q}</summary>
              <p style={styles.faqA}>{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Let’s talk">
        <div style={styles.contactCard}>
          <div>
            <p style={styles.body}>Tell us your goals, constraints, and timelines. We’ll propose a lean, high-impact plan.</p>
            <p style={styles.body}>Email: <a href="mailto:hello@hornbill.africa" style={styles.link}>hello@hornbill.africa</a></p>
            <p style={styles.body}>WhatsApp: <a href="https://wa.me/254700000000" style={styles.link}>+254 700 000 000</a></p>
          </div>
          <div style={styles.ctaRow}>
            <a href="mailto:hello@hornbill.africa" style={{ ...styles.cta, ...styles.ctaPrimary }}>Book a call</a>
            <a href="https://wa.me/254700000000" style={{ ...styles.cta, ...styles.ctaGhost }}>Chat now</a>
          </div>
        </div>
      </Section>

      <footer style={styles.footer}>
        <span>Hornbill Technology Solutions Limited — pragmatic engineering, clear outcomes.</span>
      </footer>
    </main>
  );
}

function Section({ title, children, id }) {
  return (
    <section id={id} style={styles.section}>
      <h2 style={styles.h2}>{title}</h2>
      {children}
    </section>
  );
}

function Outcome({ title, desc }) {
  return (
    <div style={styles.outcomeCard}>
      <div style={styles.outcomeBadge}>Result</div>
      <h4 style={styles.outcomeTitle}>{title}</h4>
      <p style={styles.body}>{desc}</p>
    </div>
  );
}

function GradientBg() {
  return (
    <div style={styles.gradientWrap} aria-hidden>
      <div style={styles.gradientOne} />
      <div style={styles.gradientTwo} />
    </div>
  );
}

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    background: palette.bg,
    color: palette.text,
    padding: '16px clamp(16px, 3vw, 28px)',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    overflowX: 'hidden'
  },
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 0',
    backdropFilter: 'blur(10px)'
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: palette.text },
  logoDot: { width: 32, height: 32, borderRadius: '50%', background: palette.accent },
  brandText: { fontWeight: 800, fontSize: '1.05rem' },
  navCtas: { display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  navLink: { color: palette.sub, textDecoration: 'none', fontWeight: 600 },
  burger: { display: 'none' },
  hero: {
    position: 'relative',
    zIndex: 1,
    display: 'grid',
    gap: 18,
    gridTemplateColumns: '1.1fr 0.9fr',
    alignItems: 'stretch',
    marginTop: 12
  },
  heroText: { display: 'grid', gap: 12 },
  kicker: { textTransform: 'uppercase', letterSpacing: '0.08em', color: palette.sub, fontWeight: 700, fontSize: 12 },
  h1: { margin: 0, fontSize: '2.35rem', lineHeight: 1.15 },
  lead: { margin: 0, fontSize: '1.05rem', color: palette.sub },
  ctaRow: { display: 'flex', gap: 10, flexWrap: 'wrap' },
  cta: {
    padding: '12px 16px',
    borderRadius: 12,
    fontWeight: 700,
    textDecoration: 'none',
    border: `1px solid ${palette.accent}`,
    transition: 'transform 0.1s ease, box-shadow 0.2s ease'
  },
  ctaPrimary: {
    background: palette.accent,
    color: '#fff',
    boxShadow: '0 10px 28px rgba(27,107,255,0.22)'
  },
  ctaGhost: { background: '#fff', color: palette.accent, borderColor: palette.border },
  trust: { color: palette.sub, margin: 0 },
  heroCard: {
    background: palette.card,
    borderRadius: 16,
    padding: 16,
    border: `1px solid ${palette.border}`,
    boxShadow: '0 12px 32px rgba(0,0,0,0.06)'
  },
  cardTitle: { margin: '0 0 8px', fontSize: '1.05rem' },
  winList: { margin: 0, paddingLeft: 18, color: palette.sub, lineHeight: 1.5 },
  section: {
    position: 'relative',
    zIndex: 1,
    background: palette.card,
    borderRadius: 16,
    padding: '18px 16px',
    border: `1px solid ${palette.border}`,
    boxShadow: '0 10px 26px rgba(0,0,0,0.04)',
    marginTop: 16
  },
  h2: { margin: '0 0 12px', fontSize: '1.3rem' },
  body: { margin: '6px 0', color: palette.sub, lineHeight: 1.6 },
  grid: { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' },
  card: {
    background: palette.card,
    borderRadius: 12,
    padding: 14,
    border: `1px solid ${palette.border}`,
    boxShadow: '0 6px 18px rgba(0,0,0,0.03)'
  },
  stepGrid: { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' },
  stepCard: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: 12,
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
    border: `1px solid ${palette.border}`,
    background: palette.accentSoft
  },
  stepNumber: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: palette.accent,
    color: '#fff',
    display: 'grid',
    placeItems: 'center',
    fontWeight: 800
  },
  stepTitle: { margin: '0 0 4px' },
  outcomes: { display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' },
  outcomeCard: {
    background: palette.card,
    borderRadius: 12,
    padding: 14,
    border: `1px solid ${palette.border}`,
    boxShadow: '0 8px 22px rgba(0,0,0,0.04)'
  },
  outcomeBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: 999,
    background: palette.accentSoft,
    color: palette.accent,
    fontWeight: 700,
    fontSize: 12
  },
  outcomeTitle: { margin: '8px 0 6px' },
  faqGrid: { display: 'grid', gap: 10 },
  faqItem: {
    border: `1px solid ${palette.border}`,
    borderRadius: 12,
    padding: '10px 12px',
    background: palette.card
  },
  faqQ: { cursor: 'pointer', fontWeight: 700 },
  faqA: { margin: '6px 0 0', color: palette.sub, lineHeight: 1.5 },
  contactCard: {
    display: 'grid',
    gap: 12,
    alignItems: 'center'
  },
  link: { color: palette.accent, textDecoration: 'none', fontWeight: 700 },
  footer: {
    marginTop: 18,
    padding: '14px 0',
    color: palette.sub,
    fontSize: 14,
    textAlign: 'center'
  },
  gradientWrap: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    zIndex: 0,
    pointerEvents: 'none'
  },
  gradientOne: {
    position: 'absolute',
    width: 320,
    height: 320,
    top: -120,
    right: -120,
    background: 'radial-gradient(circle at 30% 30%, rgba(27,107,255,0.18), transparent 60%)',
    filter: 'blur(60px)',
    animation: 'float1 12s ease-in-out infinite'
  },
  gradientTwo: {
    position: 'absolute',
    width: 280,
    height: 280,
    top: 200,
    left: -100,
    background: 'radial-gradient(circle at 70% 70%, rgba(22,163,74,0.16), transparent 60%)',
    filter: 'blur(60px)',
    animation: 'float2 14s ease-in-out infinite'
  },
  navLinkMobile: { display: 'none' }
};

// Minimal keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes float1 { 0%{transform:translateY(0)} 50%{transform:translateY(12px)} 100%{transform:translateY(0)} }
    @keyframes float2 { 0%{transform:translateY(0)} 50%{transform:translateY(-10px)} 100%{transform:translateY(0)} }
    @media (max-width: 960px) {
      section { padding: 16px 14px !important; }
      h1 { font-size: 1.9rem !important; }
      .hero { grid-template-columns: 1fr !important; }
    }
  `;
  document.head.appendChild(style);
}