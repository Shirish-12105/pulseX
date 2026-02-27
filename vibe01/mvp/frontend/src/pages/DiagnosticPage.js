import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const codingQuestions = [
  {
    question: "What does 'typeof null' return in JavaScript?",
    options: ["null", "undefined", "object", "boolean"],
    answer: 2
  },
  {
    question: "Which data structure uses LIFO (Last In First Out)?",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    answer: 1
  },
  {
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: 2
  },
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: 2
  },
  {
    question: "What does API stand for?",
    options: ["Application Programming Interface", "Applied Program Integration", "Automated Process Interface", "App Protocol Index"],
    answer: 0
  }
];

const aptitudeQuestions = [
  {
    question: "If a train travels 60 km in 45 minutes, what is its speed in km/h?",
    options: ["70", "80", "90", "75"],
    answer: 1
  },
  {
    question: "What comes next in the series: 2, 6, 12, 20, 30, ?",
    options: ["40", "42", "44", "36"],
    answer: 1
  },
  {
    question: "A is 30% more than B. B is what percent less than A?",
    options: ["23.07%", "30%", "15%", "20%"],
    answer: 0
  },
  {
    question: "If 5 workers complete a job in 8 days, how many days will 4 workers take?",
    options: ["9", "10", "12", "11"],
    answer: 1
  },
  {
    question: "Find the odd one out: 3, 5, 7, 9, 11",
    options: ["3", "9", "11", "5"],
    answer: 1
  }
];

const styles = {
  page: { minHeight: '100vh', background: '#f0f4ff', padding: '32px 16px', fontFamily: 'sans-serif' },
  card: { maxWidth: 680, margin: '0 auto', background: '#fff', borderRadius: 12, padding: 32, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' },
  title: { fontSize: 26, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 },
  subtitle: { color: '#666', marginBottom: 28, fontSize: 14 },
  sectionTitle: { fontSize: 17, fontWeight: 600, color: '#3b4cca', margin: '24px 0 12px', borderBottom: '2px solid #e8ecff', paddingBottom: 6 },
  questionBlock: { marginBottom: 20 },
  questionText: { fontWeight: 500, marginBottom: 10, color: '#222' },
  optionLabel: { display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, cursor: 'pointer', marginBottom: 6, border: '1.5px solid #e0e0e0', transition: 'all 0.15s' },
  optionLabelSelected: { border: '1.5px solid #3b4cca', background: '#f0f2ff', fontWeight: 500 },
  radio: { accentColor: '#3b4cca' },
  submitBtn: { marginTop: 28, width: '100%', padding: '14px 0', background: '#3b4cca', color: '#fff', border: 'none', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
  submitBtnDisabled: { background: '#aab', cursor: 'not-allowed' },
  error: { marginTop: 12, color: 'red', textAlign: 'center', fontSize: 14 },
  loading: { textAlign: 'center', color: '#3b4cca', marginTop: 16 }
};

export default function DiagnosticPage() {
  const navigate = useNavigate();
  const [codingAnswers, setCodingAnswers] = useState({});
  const [aptitudeAnswers, setAptitudeAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const allAnswered =
    Object.keys(codingAnswers).length === codingQuestions.length &&
    Object.keys(aptitudeAnswers).length === aptitudeQuestions.length;

  const handleSubmit = async () => {
    if (!allAnswered) return;
    setLoading(true);
    setError('');

    const codingScore = codingQuestions.reduce((acc, q, i) =>
      acc + (codingAnswers[i] === q.answer ? 2 : 0), 0);
    const aptitudeScore = aptitudeQuestions.reduce((acc, q, i) =>
      acc + (aptitudeAnswers[i] === q.answer ? 2 : 0), 0);
    const communicationScore = 8;

    try {
      const res = await fetch('/api/submit-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codingScore, aptitudeScore, communicationScore })
      });
      if (!res.ok) throw new Error('Server error: ' + res.status);
      await res.json();
      navigate('/dashboard');
    } catch (err) {
      setError('Submission failed: ' + err.message + '. Is the backend running on port 5000?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.title}>🎯 Career Readiness Diagnostic</div>
        <div style={styles.subtitle}>Answer all 10 questions to see your readiness score.</div>

        <div style={styles.sectionTitle}>💻 Coding Questions (5)</div>
        {codingQuestions.map((q, qi) => (
          <div key={qi} style={styles.questionBlock}>
            <div style={styles.questionText}>{qi + 1}. {q.question}</div>
            {q.options.map((opt, oi) => (
              <label
                key={oi}
                style={codingAnswers[qi] === oi
                  ? { ...styles.optionLabel, ...styles.optionLabelSelected }
                  : styles.optionLabel}
              >
                <input
                  type="radio"
                  name={`coding-${qi}`}
                  style={styles.radio}
                  checked={codingAnswers[qi] === oi}
                  onChange={() => setCodingAnswers(prev => ({ ...prev, [qi]: oi }))}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}

        <div style={styles.sectionTitle}>🧠 Aptitude Questions (5)</div>
        {aptitudeQuestions.map((q, qi) => (
          <div key={qi} style={styles.questionBlock}>
            <div style={styles.questionText}>{qi + 1}. {q.question}</div>
            {q.options.map((opt, oi) => (
              <label
                key={oi}
                style={aptitudeAnswers[qi] === oi
                  ? { ...styles.optionLabel, ...styles.optionLabelSelected }
                  : styles.optionLabel}
              >
                <input
                  type="radio"
                  name={`aptitude-${qi}`}
                  style={styles.radio}
                  checked={aptitudeAnswers[qi] === oi}
                  onChange={() => setAptitudeAnswers(prev => ({ ...prev, [qi]: oi }))}
                />
                {opt}
              </label>
            ))}
          </div>
        ))}

        <div style={{ marginTop: 16, padding: '10px 14px', background: '#f0f4ff', borderRadius: 8, fontSize: 13, color: '#555' }}>
          📢 <strong>Communication score</strong> is set to <strong>8/10</strong> (mocked for demo)
        </div>

        <button
          style={allAnswered ? styles.submitBtn : { ...styles.submitBtn, ...styles.submitBtnDisabled }}
          onClick={handleSubmit}
          disabled={!allAnswered || loading}
        >
          {loading ? 'Submitting...' : allAnswered ? 'Submit & See Results →' : `Answer all questions to submit (${Object.keys(codingAnswers).length + Object.keys(aptitudeAnswers).length}/10)`}
        </button>

        {error && <div style={styles.error}>{error}</div>}
        {loading && <div style={styles.loading}>Saving to database...</div>}
      </div>
    </div>
  );
}
