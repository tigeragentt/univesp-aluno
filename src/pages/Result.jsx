import './Result.css';

export default function Result({ score, total, onRetry }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const colorClass = pct >= 70 ? 'result-green' : pct >= 50 ? 'result-yellow' : 'result-red';
  const label = pct >= 70 ? 'Parabéns!' : pct >= 50 ? 'Quase lá!' : 'Continue praticando!';

  return (
    <div className="result-container">
      <div className="result-card">
        <div className={`result-circle ${colorClass}`}>
          <span className="result-pct">{pct}%</span>
          <span className="result-fraction">{score}/{total}</span>
        </div>
        <h2 className="result-label">{label}</h2>
        <p className="result-sub">
          Você acertou <strong>{score}</strong> de <strong>{total}</strong> questões.
        </p>
        <button className="btn-retry" onClick={onRetry}>
          Refazer
        </button>
      </div>
    </div>
  );
}
