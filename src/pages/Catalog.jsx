import disciplines from '../disciplines';
import './Catalog.css';

export default function Catalog({ onSelect }) {
  return (
    <div className="catalog-page">
      <header className="catalog-nav">
        <span className="catalog-brand">UNIVESP Estudos</span>
        <nav className="catalog-tabs">
          {disciplines.map((d) => {
            const total = d.data.questoes.length;
            const disabled = total === 0;
            return (
              <button
                key={d.code}
                className={`catalog-tab${disabled ? ' tab-disabled' : ''}`}
                style={{ '--accent': d.color }}
                onClick={() => !disabled && onSelect(d)}
                disabled={disabled}
                title={disabled ? 'Em breve' : d.data.nome}
              >
                {d.code}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="catalog-body">
        <p className="catalog-hint">Selecione uma disciplina para começar</p>
        <div className="catalog-cards">
          {disciplines.map((d) => {
            const total = d.data.questoes.length;
            const disabled = total === 0;
            return (
              <button
                key={d.code}
                className={`disc-item${disabled ? ' disc-disabled' : ''}`}
                style={{ '--accent': d.color }}
                onClick={() => !disabled && onSelect(d)}
                disabled={disabled}
              >
                <span className="disc-item-code">{d.code}</span>
                <span className="disc-item-name">{d.data.nome}</span>
                <span className="disc-item-count">
                  {disabled ? 'Em breve' : `${total} ${total === 1 ? 'questão' : 'questões'}`}
                </span>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
