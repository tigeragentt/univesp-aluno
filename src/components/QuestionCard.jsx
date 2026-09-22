import './QuestionCard.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

export default function QuestionCard({ question, selected, answered, onAnswer }) {
  const getOptionClass = (letter) => {
    if (!answered) return 'option';
    if (letter === question.gabarito) return 'option correct';
    if (letter === selected && letter !== question.gabarito) return 'option wrong';
    return 'option';
  };

  return (
    <div className="question-card">
      <p className="enunciado">{question.enunciado}</p>
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
