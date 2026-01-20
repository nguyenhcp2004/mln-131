import { useGame } from '../context/GameContext';

export function useGameState() {
  const { state } = useGame();
  return state;
}
