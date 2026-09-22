import { useState } from 'react';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

export default function App() {
  const [screen, setScreen] = useState('catalog'); // 'catalog' | 'home' | 'quiz' | 'result'
  const [discipline, setDiscipline] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });

  const handleSelectDiscipline = (d) => {
    setDiscipline(d);
    setScreen('home');
  };

  const handleStart = (pool) => {
    setQuestions(pool);
    setScreen('quiz');
  };

  const handleFinish = (score, total) => {
    setFinalScore({ score, total });
    setScreen('result');
  };

  const handleRetry = () => {
    setScreen('home');
    setQuestions([]);
    setFinalScore({ score: 0, total: 0 });
  };

  const handleBackToCatalog = () => {
    setScreen('catalog');
    setDiscipline(null);
    setQuestions([]);
  };

  if (screen === 'quiz') {
    return <Quiz questions={questions} onFinish={handleFinish} />;
  }

  if (screen === 'result') {
    return (
      <Result
        score={finalScore.score}
        total={finalScore.total}
        onRetry={handleRetry}
      />
    );
  }

  if (screen === 'home') {
    return (
      <Home
        discipline={discipline}
        onStart={handleStart}
        onBack={handleBackToCatalog}
      />
    );
  }

  return <Catalog onSelect={handleSelectDiscipline} />;
}
