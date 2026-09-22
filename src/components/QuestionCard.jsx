import './QuestionCard.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Render enunciado: split Arabic (1. 2. 3.) or Roman (I. II. III.) lists onto separate lines.
function EnunciadoText({ text }) {
  // Arabic items — require at least 3 parts (intro + 2 items)
  const arabicSplit = text.split(/\s+(?=\d+\.\s)/);
  if (arabicSplit.length >= 3) {
    return (
      <div className="enunciado">
        {arabicSplit.map((part, i) => (
          <p key={i} className={i > 0 ? 'enunciado-item' : ''}>{part}</p>
        ))}
      </div>
    );
  }
  // Roman numeral items — require at least 3 parts
  const romanSplit = text.split(/\s+(?=(?:I{1,3}|IV|VI{0,3}|IX|X{1,3})\.\s)/);
  if (romanSplit.length >= 3) {
    return (
      <div className="enunciado">
        {romanSplit.map((part, i) => (
          <p key={i} className={i > 0 ? 'enunciado-item' : ''}>{part}</p>
        ))}
      </div>
    );
  }
  return <p className="enunciado">{text}</p>;
}

export default function QuestionCard({ question, selected, answered, onAnswer }) {
  const getOptionClass = (letter) => {
    if (!answered) return 'option';
    if (letter === question.gabarito) return 'option correct';
    if (letter === selected && letter !== question.gabarito) return 'option wrong';
    return 'option';
  };

  const sourceLabel = question.source === 'prova' ? '📝 Prova' : '📖 Módulo';
  const sourceClass = question.source === 'prova' ? 'source-badge prova' : 'source-badge modulo';

  return (
    <div className="question-card">
      <span className={sourceClass}>{sourceLabel}</span>
      <EnunciadoText text={question.enunciado} />
      <ul className="options">
        {LETTERS.filter((l) => question.alternativas[l] !== undefined).map((letter) => (
          <li key={letter}>
            <button
              className={getOptionClass(letter)}
              onClick={() => onAnswer(letter)}
              disabled={answered}
            >
              <span className="letter">{letter}</span>
              <span className="text">{question.alternativas[letter]}</span>
            </button>
          </li>
        ))}
      </ul>
      {answered && (
        <div className="explicacao">
          <strong>Explicação:</strong>
          <p>{question.explicacao}</p>
        </div>
      )}
    </div>
  );
}
