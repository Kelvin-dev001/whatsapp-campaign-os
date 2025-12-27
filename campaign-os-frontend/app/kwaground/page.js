'use client';

const colors = {
  bg: '#f7f9f7',
  card: '#ffffff',
  text: '#0f1b14',
  subtext: '#304236',
  primary: '#457a55', // from logo green
  primaryDark: '#2d5a3c',
  border: '#dfe6e1'
};

const sections = [
  {
    id: 'hero',
    title: 'Cut the noise and know what’s happening on the ground.',
    body: 'KwaGround turns WhatsApp updates from the field into clear, structured daily reports.',
    ctas: [
      { label: 'Try Live WhatsApp Demo', href: '#demo' },
      { label: 'Request a Private Demo', href: '#contact' }
    ],
    trust: 'No new apps. No training. Just WhatsApp.'
  },
  {
    id: 'what',
    title: 'What is KwaGround?',
    body: [
      'KwaGround is a reporting tool built on WhatsApp.',
      'Field teams send simple updates like:',
      'ISSUE water shortage Likoni',
      'REPORT site visit 12 Nyali',
      'KwaGround organizes these updates and sends managers clear daily summaries.',
      'No scrolling. No guessing.'
    ]
  },
  {
    id: 'demo',
    title: 'Try it in 60 seconds.',
    steps: [
      'Open WhatsApp',
      'Send a report to our demo number',
      'See how updates are organized and summarized'
    ],
    cta: { label: 'Open WhatsApp Demo', href: '#demo-start' }
  },
  {
    id: 'who',
    title: 'Built for teams that work on the ground.',
    bullets: [
      'NGOs & community programs',
      'Field operations teams',
      'Security companies',
      'Real estate & construction',
      'Campaigns & civic organizations'
    ],
    support: 'If your work happens outside the office, KwaGround fits.'
  },
  {
    id: 'why',
    title: 'Why teams use KwaGround',
    bullets: [
      'Organize WhatsApp updates',
      'Get daily & weekly summaries',
      'Reduce confusion',
      'Improve accountability',
      'Make faster decisions'
    ]
  },
  {
    id: 'trust',
    title: 'Built with trust in mind.',
    bullets: [
      'No voter data collection',
      'No unsolicited messaging',
      'Secure, organization-based data',
      'WhatsApp-compliant workflows'
    ]
  },
  {
    id: 'final',
    title: 'Stop guessing. Start seeing.',
    ctas: [
      { label: 'Try Live Demo', href: '#demo' },
      { label: 'Request a 7-Day Pilot', href: '#contact' }
    ],
    footer: 'KwaGround — clarity from the ground up.'
  }
];

export default function KwaGroundPage() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <img
            src="/kwaground-logo.png"
            alt="KwaGround logo"
            style={styles.logo}
          />
          <h1 style={styles.h1}>{sections[0].title}</h1>
          <p style={styles.lead}>{sections[0].body}</p>
          <div style={styles.ctaRow}>
            {sections[0].ctas.map((cta) => (
              <a key={cta.label} href={cta.href} style={{ ...styles.cta, ...styles.ctaPrimary }}>
                {cta.label}
              </a>
            ))}
          </div>
          <p style={styles.trust}>{sections[0].trust}</p>
        </div>
      </section>

      <div style={styles.content}>
        <Card id={sections[1].id} title={sections[1].title}>
          {sections[1].body.map((line, i) => (
            <p key={i} style={i >= 2 ? styles.codeLine : styles.body}>{line}</p>
          ))}
        </Card>

        <Card id={sections[2].id} title={sections[2].title}>
          <ol style={styles.list}>
            {sections[2].steps.map((s) => (
              <li key={s} style={styles.listItem}>{s}</li>
            ))}
          </ol>
          <div style={styles.ctaRow}>
            <a href={sections[2].cta.href} style={{ ...styles.cta, ...styles.ctaPrimary }}>
              {sections[2].cta.label}
            </a>
          </div>
        </Card>

        <Card id={sections[3].id} title={sections[3].title}>
          <ul style={styles.list}>
            {sections[3].bullets.map((b) => (
              <li key={b} style={styles.listItem}>{b}</li>
            ))}
          </ul>
          <p style={styles.body}>{sections[3].support}</p>
        </Card>

        <Card id={sections[4].id} title={sections[4].title}>
          <ul style={styles.list}>
            {sections[4].bullets.map((b) => (
              <li key={b} style={styles.listItem}>{b}</li>
            ))}
          </ul>
        </Card>

        <Card id={sections[5].id} title={sections[5].title}>
          <ul style={styles.list}>
            {sections[5].bullets.map((b) => (
              <li key={b} style={styles.listItem}>{b}</li>
            ))}
          </ul>
        </Card>

        <Card id={sections[6].id} title={sections[6].title} align="center">
          <div style={styles.ctaRowCenter}>
            {sections[6].ctas.map((cta) => (
              <a key={cta.label} href={cta.href} style={{ ...styles.cta, ...styles.ctaPrimary }}>
                {cta.label}
              </a>
            ))}
          </div>
          <p style={{ ...styles.body, marginTop: 12 }}>{sections[6].footer}</p>
        </Card>
      </div>
    </main>
  );
}

function Card({ id, title, children, align }) {
  return (
    <section id={id} style={{ ...styles.card, ...(align === 'center' ? { textAlign: 'center' } : {}) }}>
      <h2 style={styles.h2}>{title}</h2>
      {children}
    </section>
  );
}

const styles = {
  page: {
    background: colors.bg,
    color: colors.text,
    minHeight: '100vh',
    padding: '32px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
  },
  hero: {
    background: colors.card,
    borderRadius: 16,
    padding: '28px 24px',
    border: `1px solid ${colors.border}`,
    boxShadow: '0 12px 40px rgba(0,0,0,0.06)'
  },
  heroContent: { display: 'flex', flexDirection: 'column', gap: 12 },
  logo: { width: 140, height: 'auto' },
  h1: { fontSize: '2rem', lineHeight: 1.2, margin: 0 },
  lead: { fontSize: '1.05rem', color: colors.subtext, margin: '4px 0 8px' },
  ctaRow: { display: 'flex', gap: 12, flexWrap: 'wrap' },
  ctaRowCenter: { display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' },
  cta: {
    display: 'inline-block',
    padding: '12px 16px',
    borderRadius: 10,
    textDecoration: 'none',
    fontWeight: 600,
    border: `1px solid ${colors.primaryDark}`,
    color: '#ffffff',
    background: colors.primary
  },
  ctaPrimary: {
    boxShadow: '0 8px 24px rgba(69,122,85,0.25)'
  },
  trust: { fontSize: '0.95rem', color: colors.subtext },
  content: { display: 'grid', gap: 16 },
  card: {
    background: colors.card,
    borderRadius: 14,
    padding: '20px 18px',
    border: `1px solid ${colors.border}`,
    boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
  },
  h2: { fontSize: '1.3rem', margin: '0 0 10px' },
  body: { margin: '6px 0', color: colors.subtext, lineHeight: 1.5 },
  codeLine: {
    margin: '4px 0',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    background: '#f0f3f0',
    padding: '6px 8px',
    borderRadius: 8,
    display: 'inline-block'
  },
  list: { margin: '6px 0', paddingLeft: 18, color: colors.subtext },
  listItem: { marginBottom: 6 }
};