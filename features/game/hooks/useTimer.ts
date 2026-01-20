import { useGame } from '../context/GameContext';

export function useTimer() {
  const { state, pauseTimer, resumeTimer } = useGame();
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    time: state.timer,
    formattedTime: formatTime(state.timer),
    isPaused: state.isPaused,
    pause: pauseTimer,
    resume: resumeTimer,
  };
}
