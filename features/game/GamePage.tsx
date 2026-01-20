"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/features/game/context/GameContext";
import WelcomeScreen from "@/features/game/components/WelcomeScreen";
import GameHeader from "@/features/game/components/GameHeader";
import Stage1MultipleChoice from "@/features/game/components/Stage1MultipleChoice";
import Stage2FillInBlank from "@/features/game/components/Stage2FillInBlank";
import Stage3PuzzleGame from "@/features/game/components/Stage3PuzzleGame";
import VictoryScreen from "@/features/game/components/VictoryScreen";
import InstructionsModal from "@/features/game/components/InstructionsModal";
import LeaderboardModal from "@/features/game/components/LeaderboardModal";
import PlayerNameModal from "@/features/game/components/PlayerNameModal";
import { getInstructionsSeen } from "@/features/game/lib/storage";
import { getCurrentPlayer } from "@/lib/idb/playerIdb";

export default function GamePage() {
  const {
    state,
    startGame,
    answerQuestion,
    nextQuestion,
    nextStage,
    resetGame,
    completeGame,
    pauseTimer,
    resumeTimer,
  } = useGame();
  const [showInstructions, setShowInstructions] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showPlayerNameModal, setShowPlayerNameModal] = useState(false);
  const [isRevealingImage, setIsRevealingImage] = useState(false);

  useEffect(() => {
    const seen = getInstructionsSeen();
    if (!seen && state.stage === "welcome") {
      // Use queueMicrotask to avoid setState in effect warning
      queueMicrotask(() => {
        setShowInstructions(true);
      });
    }
  }, [state.stage]);

  useEffect(() => {
    if (state.stage === 1 || state.stage === 2) {
      const stageOffset = state.stage === 1 ? 0 : 9;
      const piecesInCurrentStage = state.collectedPieces.filter(
        (p) => p >= stageOffset && p < stageOffset + 9
      ).length;

      // Stage 1: need 14 pieces total, Stage 2: need 18 pieces total
      const requiredPieces = state.stage === 1 ? 14 : 18;

      if (state.collectedPieces.length >= requiredPieces) {
        setTimeout(() => {
          nextStage();
        }, 1500);
      }
    }
  }, [state.collectedPieces, state.stage, nextStage]);

  const handlePlayerNameConfirm = () => {
    setShowPlayerNameModal(false);
    // Auto start game after setting name
    setTimeout(() => {
      startGame();
    }, 300);
  };

  const handleStart = async () => {
    // Check if player has name
    const player = await getCurrentPlayer();
    if (!player || !player.name) {
      // Show modal to input name
      setShowPlayerNameModal(true);
      return;
    }
    // Player already has name, start game directly
    startGame();
  };

  const handleAnswer = (answer: string) => answerQuestion(answer);
  const handleNextQuestion = () => nextQuestion();
  const handlePause = () => setShowInstructions(true);
  const handlePlayAgain = () => resetGame();
  const handleShowLeaderboard = () => setShowLeaderboard(true);
  const handleCloseLeaderboard = () => setShowLeaderboard(false);

  const handleCloseInstructions = () => {
    setShowInstructions(false);
    if (state.stage !== "welcome" && state.stage !== "victory") {
      resumeTimer();
    }
  };

  const renderStage = () => {
    switch (state.stage) {
      case "welcome":
        return (
          <WelcomeScreen
            onStart={handleStart}
            onShowInstructions={() => setShowInstructions(true)}
            onShowLeaderboard={handleShowLeaderboard}
          />
        );

      case 1:
      case 2: {
        // Check if already have enough pieces for this stage
        const requiredPieces = state.stage === 1 ? 14 : 18;
        if (state.collectedPieces.length >= requiredPieces) {
          // Show transitioning message
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-amber-300 mb-4">
                  Đang chuyển màn...
                </h2>
                <p className="text-white">Bạn đã thu thập đủ {requiredPieces} mảnh ghép!</p>
              </div>
            </div>
          );
        }

        const offset = state.stage === 1 ? 0 : 60;
        const actualIndex = offset + state.currentQuestionIndex;
        const currentQuestion = state.selectedQuestions[actualIndex];

        if (!currentQuestion) {
          console.error('No question found!', {
            stage: state.stage,
            currentQuestionIndex: state.currentQuestionIndex,
            offset,
            actualIndex,
            totalQuestions: state.selectedQuestions.length
          });
          return null;
        }

        const StageComponent =
          state.stage === 1 ? Stage1MultipleChoice : Stage2FillInBlank;

        return (
          <>
            <GameHeader
              stage={state.stage}
              collectedPieces={state.collectedPieces.length}
              totalPieces={18}
              correctAnswers={state.correctAnswers}
              wrongAnswers={state.wrongAnswers}
              onPause={handlePause}
              onShowInstructions={() => setShowInstructions(true)}
            />
            <StageComponent
              question={currentQuestion}
              onAnswer={handleAnswer}
              onNext={handleNextQuestion}
              attempts={state.attempts}
            />
          </>
        );
      }

      case 3:
        return (
          <>
            {!isRevealingImage && (
              <GameHeader
                stage={3}
                collectedPieces={state.collectedPieces.length}
                totalPieces={18}
                correctAnswers={state.correctAnswers}
                wrongAnswers={state.wrongAnswers}
                onPause={handlePause}
                onShowInstructions={() => setShowInstructions(true)}
              />
            )}
            <Stage3PuzzleGame
              collectedPieces={state.collectedPieces}
              imageId={state.selectedImageId}
              onComplete={completeGame}
              onRevealStateChange={setIsRevealingImage}
              onPauseTimer={pauseTimer}
              onResumeTimer={resumeTimer}
            />
          </>
        );

      case "victory":
        return (
          <VictoryScreen
            correctAnswers={state.correctAnswers}
            wrongAnswers={state.wrongAnswers}
            totalQuestions={18}
            onPlayAgain={handlePlayAgain}
            onShowLeaderboard={handleShowLeaderboard}
          />
        );

      default:
        return null;
    }
  };

  return (
    <>
      {renderStage()}
      <PlayerNameModal
        isOpen={showPlayerNameModal}
        onConfirm={handlePlayerNameConfirm}
        onClose={() => setShowPlayerNameModal(false)}
      />
      <InstructionsModal
        isOpen={showInstructions}
        onClose={handleCloseInstructions}
      />
      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={handleCloseLeaderboard}
      />
    </>
  );
}
