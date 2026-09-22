import { useState, useCallback, useMemo } from 'react';

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
  // answers: { [index]: letter }
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [shuffled] = useState(() => shuffle(questions));

  const total = shuffled.length;
  const question = shuffled[current];
  const selected = answers[current] ?? null;
  const answered = selected !== null;

  const score = useMemo(
    () =>
      Object.entries(answers).filter(
        ([i, letter]) => shuffled[Number(i)].gabarito === letter
      ).length,
    [answers, shuffled]
  );

  const answer = useCallback(
    (letter) => {
      if (answers[current] !== undefined) return;
      setAnswers((prev) => ({ ...prev, [current]: letter }));
    },
    [answers, current]
  );

  const next = useCallback(() => {
    if (current + 1 < total) setCurrent((c) => c + 1);
  }, [current, total]);

  const prev = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1);
  }, [current]);

  const finish = useCallback(() => setFinished(true), []);

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
    prev,
    finish,
  };
}
