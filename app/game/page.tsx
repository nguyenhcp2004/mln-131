import { GameProvider } from "@/features/game/context/GameContext";
import GamePage from "@/features/game/GamePage";

export default function Page() {
  return (
    <GameProvider>
      <GamePage />
    </GameProvider>
  );
}
