import { useQuiz } from '../hooks/useQuiz';
import QuestionCard from '../components/QuestionCard';
import './Quiz.css';

export default function Quiz({ questions, onFinish }) {
  const { question, current, total, selected, answered, score, finished, answer, next, prev, finish } =
    useQuiz(questions);

  if (finished) {
    onFinish(score, total);
    return null;
  }

  const progress = ((current + (answered ? 1 : 0)) / total) * 100;
  const isLast = current + 1 >= total;

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

      <div className="quiz-footer">
        <button
          className="btn-nav btn-prev"
          onClick={prev}
          disabled={current === 0}
        >
          ← Anterior
        </button>

        {isLast ? (
          <button
            className="btn-nav btn-next"
            onClick={finish}
            disabled={!answered}
          >
            Ver Resultado
          </button>
        ) : (
          <button
            className="btn-nav btn-next"
            onClick={next}
            disabled={!answered}
          >
            Próxima →
          </button>
        )}
      </div>
    </div>
  );
}
