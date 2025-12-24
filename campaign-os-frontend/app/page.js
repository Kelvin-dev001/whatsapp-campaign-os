'use client';
import { useEffect, useMemo, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_BASE;

export default function Page() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${API}/reports`, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setReports(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setErr('Failed to load reports');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const wardCounts = useMemo(() => {
    return reports.reduce((acc, r) => {
      const ward = (r.ward || 'UNKNOWN').toUpperCase();
      acc[ward] = (acc[ward] || 0) + 1;
      return acc;
    }, {});
  }, [reports]);

  const topIssues = useMemo(() => {
    const issues = reports.filter(r => r.type === 'issue');
    const freq = issues.reduce((acc, r) => {
      const key = (r.category || 'uncategorized').toLowerCase();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 3);
  }, [reports]);

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <header>
        <h1 style={{ marginBottom: 4 }}>Campaign Dashboard</h1>
        <p style={{ color: '#9fb3c8' }}>WhatsApp-based field intelligence</p>
      </header>

      {loading && <p>Loading…</p>}
      {err && <p style={{ color: '#ff8383' }}>{err}</p>}

      {!loading && !err && (
        <>
          <section style={cardStyle}>
            <h3 style={sectionTitle}>Ward Activity</h3>
            <div style={pillRow}>
              {Object.entries(wardCounts).map(([ward, count]) => (
                <span key={ward} style={pill}>{ward}: {count}</span>
              ))}
              {!Object.keys(wardCounts).length && <p>No data yet.</p>}
            </div>
          </section>

          <section style={cardStyle}>
            <h3 style={sectionTitle}>Top Issues</h3>
            {topIssues.length ? (
              <ol style={{ paddingLeft: 18, margin: 0 }}>
                {topIssues.map(([cat, count]) => (
                  <li key={cat}>{cat} — {count}</li>
                ))}
              </ol>
            ) : <p>No issues yet.</p>}
          </section>

          <section style={cardStyle}>
            <h3 style={sectionTitle}>Recent Reports</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
              {reports.slice(0, 30).map(r => (
                <li key={r.id} style={itemRow}>
                  <span style={badge}>{r.type}</span>
                  <div style={{ flex: 1 }}>
                    <div><strong>{r.category}</strong> — {r.description}</div>
                    <div style={{ color: '#9fb3c8', fontSize: 12 }}>{(r.ward || 'UNKNOWN').toUpperCase()}</div>
                  </div>
                  <div style={{ color: '#9fb3c8', fontSize: 12 }}>
                    {new Date(r.created_at).toLocaleString('en-KE', { hour12: false })}
                  </div>
                </li>
              ))}
              {!reports.length && <p>No reports yet.</p>}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

const cardStyle = {
  background: '#111830',
  border: '1px solid #1f2a44',
  borderRadius: 12,
  padding: 16,
  boxShadow: '0 10px 30px rgba(0,0,0,0.25)'
};

const sectionTitle = { marginTop: 0, marginBottom: 12 };

const pillRow = { display: 'flex', gap: 8, flexWrap: 'wrap' };

const pill = {
  padding: '6px 10px',
  borderRadius: 999,
  background: '#1f2a44',
  color: '#e7ecf3',
  fontSize: 12,
  border: '1px solid #2c3b5d'
};

const itemRow = {
  display: 'flex',
  gap: 10,
  alignItems: 'flex-start',
  padding: 10,
  borderRadius: 10,
  background: '#0d142a',
  border: '1px solid '#1c2744'
};

const badge = {
  background: '#2b7cff',
  color: 'white',
  borderRadius: 8,
  padding: '2px 8px',
  fontSize: 12,
  textTransform: 'uppercase'
};