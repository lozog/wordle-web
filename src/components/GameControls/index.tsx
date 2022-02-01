import React from "react";
import { GameState } from "services/wordle";
import * as S from "./styles";

interface Props {
  gameState: GameState;
  word: string;
  resetGame: () => void;
}

export function GameControls({ gameState, word, resetGame }: Props) {
  return (
    <S.Container>
      {gameState === GameState.LOSS && (
        <S.Word>{word}</S.Word>
      )}
      {gameState !== GameState.IN_PROGRESS && (
        <S.ReplayButton onClick={resetGame}>Play Again?</S.ReplayButton>
      )}
    </S.Container>
  );
}
