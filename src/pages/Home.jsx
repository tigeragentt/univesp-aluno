import { useState } from 'react';
import './Home.css';

export default function Home({ discipline, onStart, onBack }) {
  const { data } = discipline;
  const [secao, setSecao] = useState('all');
  const [numQ, setNumQ] = useState(() => data.questoes.length);

  const filtered = secao === 'all'
    ? data.questoes
    : data.questoes.filter((q) => q.secao === secao);

  const maxQ = filtered.length;

  const handleSecaoChange = (e) => {
    const val = e.target.value;
    setSecao(val);
    const newFiltered = val === 'all' ? data.questoes : data.questoes.filter((q) => q.secao === val);
    setNumQ(newFiltered.length);
  };

  const handleNumChange = (e) => {
    const v = Math.max(1, Math.min(maxQ, Number(e.target.value)));
    setNumQ(v);
  };

  const handleStart = () => {
    const pool = secao === 'all'
      ? data.questoes
      : data.questoes.filter((q) => q.secao === secao);
    onStart(pool.slice(0, numQ));
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
