import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  page: { minHeight: '100vh', background: '#f0f4ff', padding: '32px 16px', fontFamily: 'sans-serif' },
  card: { maxWidth: 580, margin: '0 auto', background: '#fff', borderRadius: 12, padding: 36, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
  title: { fontSize: 26, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 },
  subtitle: { color: '#888', fontSize: 13, marginBottom: 32 },
  scoreRow: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderRadius: 10, marginBottom: 12, background: '#f7f8ff', border: '1.5px solid #e8ecff' },
  scoreLabel: { fontWeight: 500, color: '#333', fontSize: 15 },
  scoreValue: { fontWeight: 700, fontSize: 22, color: '#3b4cca' },
  readinessBox: { marginTop: 24, padding: '22px 18px', borderRadius: 12, background: 'linear-gradient(135deg, #3b4cca, #6c63ff)', color: '#fff', textAlign: 'center' },
  readinessLabel: { fontSize: 14, opacity: 0.85, marginBottom: 6 },
  readinessValue: { fontSize: 48, fontWeight: 800 },
  readinessMax: { fontSize: 16, opacity: 0.7 },
  badge: { display: 'inline-block', marginTop: 10, padding: '4px 14px', borderRadius: 20, background: 'rgba(255,255,255,0.25)', fontSize: 13 },
  retakeBtn: { marginTop: 28, width: '100%', padding: '13px 0', background: '#fff', color: '#3b4cca', border: '2px solid #3b4cca', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
  error: { color: 'red', textAlign: 'center', marginTop: 20 },
  loading: { textAlign: 'center', color: '#3b4cca', marginTop: 40, fontSize: 16 },
  timestamp: { textAlign: 'center', color: '#aaa', fontSize: 12, marginTop: 16 }
};

function getLabel(score, max) {
  const pct = (score / max) * 100;
  if (pct >= 80) return '🌟 Excellent';
  if (pct >= 60) return '✅ Good';
  if (pct >= 40) return '🔄 Developing';
  return '📚 Needs Work';
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/latest-result')
      .then(res => {
        if (!res.ok) throw new Error('No result found. Please take the test first.');
        return res.json();
      })
      .then(data => { setResult(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  if (loading) return <div style={styles.page}><div style={styles.loading}>⏳ Loading your results...</div></div>;
  if (error) return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.error}>{error}</div>
        <button style={{ ...styles.retakeBtn, marginTop: 20 }} onClick={() => navigate('/diagnostic')}>
          ← Take the Test
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.title}>📊 Your Results</div>
        <div style={styles.subtitle}>Latest test result from database</div>

        <div style={styles.scoreRow}>
          <span style={styles.scoreLabel}>💻 Coding Score</span>
          <span style={styles.scoreValue}>{result.codingScore}<span style={{ fontSize: 13, color: '#999', fontWeight: 400 }}>/10</span></span>
        </div>
        <div style={styles.scoreRow}>
          <span style={styles.scoreLabel}>🧠 Aptitude Score</span>
          <span style={styles.scoreValue}>{result.aptitudeScore}<span style={{ fontSize: 13, color: '#999', fontWeight: 400 }}>/10</span></span>
        </div>
        <div style={styles.scoreRow}>
          <span style={styles.scoreLabel}>📢 Communication Score</span>
          <span style={styles.scoreValue}>{result.communicationScore}<span style={{ fontSize: 13, color: '#999', fontWeight: 400 }}>/10</span></span>
        </div>

        <div style={styles.readinessBox}>
          <div style={styles.readinessLabel}>READINESS INDEX (40% coding + 30% aptitude + 30% communication)</div>
          <div style={styles.readinessValue}>{result.readinessIndex}</div>
          <div style={styles.readinessMax}>/10</div>
          <div style={styles.badge}>{getLabel(result.readinessIndex, 10)}</div>
        </div>

        <div style={styles.timestamp}>
          Submitted: {new Date(result.createdAt).toLocaleString()}
        </div>

        <button style={styles.retakeBtn} onClick={() => navigate('/diagnostic')}>
          ← Retake Test
        </button>
      </div>
    </div>
  );
}
