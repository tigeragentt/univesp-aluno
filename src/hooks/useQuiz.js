import { useState, useCallback } from 'react';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useQuiz(questions) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [shuffled] = useState(() => shuffle(questions));

  const question = shuffled[current];
  const total = shuffled.length;

  const answer = useCallback(
    (letter) => {
      if (answered) return;
      setSelected(letter);
      setAnswered(true);
      if (letter === question.gabarito) {
        setScore((s) => s + 1);
      }
    },
    [answered, question]
  );

  const next = useCallback(() => {
    if (current + 1 >= total) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  }, [current, total]);

  return {
    question,
    current,
    total,
    selected,
    answered,
    score,
    finished,
    answer,
    next,
  };
}
