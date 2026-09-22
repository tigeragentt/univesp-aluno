import './QuestionCard.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];
const TO_ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

// Return true if any alternativa text contains Roman numeral references (I, II, III…)
function alternativasUseRoman(alternativas) {
  const allText = Object.values(alternativas).join(' ');
  return /\b(I{1,3}|IV|VI{0,3}|IX)\b/.test(allText);
}

// If the enunciado has Arabic-numbered items AND the alternativas reference Roman
// numerals, convert the markers: 1. → I., 2. → II., etc.
function normalizeEnunciado(text, alternativas) {
  const hasArabic = /\s\d+\.\s/.test(text);
  if (hasArabic && alternativasUseRoman(alternativas)) {
    return text.replace(/(\s)(\d+)(\.\s)/g, (_, space, num, dot) => {
      const n = parseInt(num, 10);
      return space + (TO_ROMAN[n] || num) + dot;
    });
  }
  return text;
}

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
  const enunciado = normalizeEnunciado(question.enunciado, question.alternativas);

  return (
    <div className="question-card">
      <span className={sourceClass}>{sourceLabel}</span>
      <EnunciadoText text={enunciado} />
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
