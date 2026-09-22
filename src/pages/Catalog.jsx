import disciplines from '../disciplines';
import './Catalog.css';

export default function Catalog({ onSelect }) {
  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <span className="catalog-badge">UNIVESP</span>
        <h1 className="catalog-title">Estudos</h1>
        <p className="catalog-subtitle">Escolha uma disciplina para praticar</p>
      </div>

      <div className="catalog-grid">
        {disciplines.map((d) => {
          const total = d.data.questoes.length;
          const disabled = total === 0;
          return (
            <button
              key={d.code}
              className={`discipline-card${disabled ? ' disabled' : ''}`}
              style={{ '--accent': d.color }}
              onClick={() => !disabled && onSelect(d)}
              disabled={disabled}
            >
              <span className="disc-code">{d.code}</span>
              <span className="disc-name">{d.data.nome}</span>
              <span className="disc-count">
                {disabled ? 'Em breve' : `${total} questão${total !== 1 ? 'ões' : ''}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
