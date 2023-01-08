import { useEffect, useRef, useState } from "react";

export const useCountdown = (deadline: number) => {
  const remaining = useRef(0);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef(0);
  const [countdown, setCountdown] = useState('00:00:00');
  
  const showTime = time => {
    const deltaTime = time - previousTimeRef.current;
    if(remaining.current === 0) {
      remaining.current = deadline;
    }

    if(deltaTime >= 1000) {
      previousTimeRef.current = time;
      let minute = 60;
      let hour = 60 * 60;
      let day = 60 * 60 * 24;
      let days = Math.floor(remaining.current / day);
      let hours = Math.floor((remaining.current - days * day) / hour);
      let minutes = Math.floor((remaining.current - days * day - hours * hour) / minute);
      let seconds = Math.floor((remaining.current - days * day - hours * hour - minutes * minute));
      remaining.current = remaining.current - 1;
      setCountdown(() => `${days}:${hours}:${minutes}:${seconds}`);
    }
    requestRef.current = requestAnimationFrame(showTime);
  }

  useEffect(() => {
    if(deadline <= 0) return;
    requestRef.current = requestAnimationFrame(showTime);
    return () => {
      cancelAnimationFrame(requestRef.current);
      remaining.current = 0;
    };
  }, [deadline]);

  return [countdown, remaining]

}