import { useState } from 'react';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

export default function App() {
  const [screen, setScreen] = useState('home'); // 'home' | 'quiz' | 'result'
  const [questions, setQuestions] = useState([]);
  const [finalScore, setFinalScore] = useState({ score: 0, total: 0 });

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

  return <Home onStart={handleStart} />;
}
