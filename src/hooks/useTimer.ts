/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';

export const useTimer = (initialSeconds: number) => {
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [state, setState] = useState<'start' | 'stop'>('stop')

  const times = useMemo(() => {
    const now = Date.now();
    const diff = new Date(now + timeLeft * 1000).getTime() - now;
    const date = new Date(diff);

    return {
      seconds: date.getSeconds(),
      minutes: date.getMinutes(),
    };
  }, [timeLeft]);

  const updateTime = () => {
    setTimeLeft((time) => time - 0.05);
  };

  const start = () => setState('start');
  const stop = () => setState('stop');

  const restart = () => {
    stop()
    setTimeLeft(initialSeconds);
    start()
  };

  const checkTimeIsOut = () => {
    timeLeft <= 0 && stop()
  };

  useEffect(() => {
    checkTimeIsOut();
  }, [timeLeft]);

  useEffect(() => {
    if (state === 'stop' && timer) {
      clearInterval(timer)
      setTimer(null)
    }

    if (state === 'start' && !timer) {
      setTimer(setInterval(updateTime, 50));
    }
  }, [state])

  return {
    timeLeft,
    minutes: times.minutes,
    seconds: times.seconds,
    start,
    stop,
    restart,
  };
};
