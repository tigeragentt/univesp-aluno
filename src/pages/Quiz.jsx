import { useQuiz } from '../hooks/useQuiz';
import QuestionCard from '../components/QuestionCard';
import './Quiz.css';

export default function Quiz({ questions, onFinish }) {
  const { question, current, total, selected, answered, score, finished, answer, next } = useQuiz(questions);

  if (finished) {
    onFinish(score, total);
    return null;
  }

  const progress = ((current) / total) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-meta">
          <span className="quiz-counter">Questão {current + 1} de {total}</span>
          <span className="quiz-score">Acertos: {score}</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <QuestionCard
        question={question}
        selected={selected}
        answered={answered}
        onAnswer={answer}
      />

      {answered && (
        <div className="quiz-footer">
          <button className="btn-next" onClick={next}>
            {current + 1 < total ? 'Próxima Questão' : 'Ver Resultado'}
          </button>
        </div>
      )}
    </div>
  );
}
