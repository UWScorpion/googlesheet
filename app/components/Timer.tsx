import React, { useState, useEffect } from 'react';

interface TimerProps {
  rowNumber: number;
}

const Timer = ({ rowNumber }: TimerProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval || 0);
    }

    return () => clearInterval(interval || 0);
  }, [isActive, seconds]);

  useEffect(() => {
    setSeconds(0);
  }, [rowNumber]);


  const reset = () => {
    setSeconds(0);
    setIsActive(false);
  };

  return (
    <div className="timer ml-16 text-l">
      <div className="time">
        {seconds} seconds
      </div>
      <div className="row invisible">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={() => setIsActive(!isActive)}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;