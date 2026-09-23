import { useState } from 'react';
import './Home.css';

function getPool(questoes, secao, source) {
  return questoes.filter((q) => {
    const matchSecao = secao === 'all' || q.secao === secao;
    const matchSource = source === 'all' || q.source === source;
    return matchSecao && matchSource;
  });
}

export default function Home({ discipline, onStart, onBack }) {
  const { data } = discipline;
  const [secao, setSecao] = useState('all');
  const [source, setSource] = useState('all');
  const [numQ, setNumQ] = useState(() => data.questoes.length);

  const sources = [...new Set(data.questoes.map((q) => q.source))].sort();
  const filtered = getPool(data.questoes, secao, source);
  const maxQ = filtered.length;

  const handleSecaoChange = (e) => {
    const val = e.target.value;
    setSecao(val);
    setNumQ(getPool(data.questoes, val, source).length);
  };

  const handleSourceChange = (e) => {
    const val = e.target.value;
    setSource(val);
    setNumQ(getPool(data.questoes, secao, val).length);
  };

  const handleNumChange = (e) => {
    const v = Math.max(1, Math.min(maxQ, Number(e.target.value)));
    setNumQ(v);
  };

  const handleStart = () => {
    onStart(filtered.slice(0, numQ));
  };

  return (
    <div className="home-container">
      <div className="home-card">
        <button className="btn-back" onClick={onBack}>← Disciplinas</button>

        <div className="home-header">
          <span className="home-badge">UNIVESP</span>
          <h1 className="home-title">{data.materia} – {data.nome}</h1>
          <p className="home-subtitle">Pratique com questões de múltipla escolha e veja explicações detalhadas.</p>
        </div>

        <div className="home-controls">
          <div className="form-group">
            <label htmlFor="secao">Módulo</label>
            <select id="secao" value={secao} onChange={handleSecaoChange}>
              <option value="all">Todos</option>
              {data.secoes.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} – {s.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="source">Fonte</label>
            <select id="source" value={source} onChange={handleSourceChange}>
              <option value="all">Todas</option>
              {sources.map((s) => (
                <option key={s} value={s}>
                  {s === 'modulo' ? '📖 Módulo' : `📝 ${s}`}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numq">
              Número de questões{' '}
              <span className="label-hint">(máx. {maxQ})</span>
            </label>
            <input
              id="numq"
              type="number"
              min={1}
              max={maxQ}
              value={numQ}
              onChange={handleNumChange}
            />
          </div>
        </div>

        <button className="btn-start" onClick={handleStart}>
          Iniciar Teste
        </button>
      </div>
    </div>
  );
}
