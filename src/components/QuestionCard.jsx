import './QuestionCard.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

// Render enunciado: if it contains a numbered/roman list (1. 2. 3. or I. II. III.),
// put each item on its own line.
function EnunciadoText({ text }) {
  // Detect Arabic items (1., 2., 3. ...) — require at least 2
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
  // Detect Roman numeral items (I., II., III., IV., V.) — require at least 2
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
