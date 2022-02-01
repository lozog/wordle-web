import React from "react";
import { GameState, isGameInProgress } from "services/wordle";
import * as S from "./styles";

interface Props {
  gameState: GameState;
  resetGame: () => void;
}

export function GameControls({ gameState, resetGame }: Props) {
  return (
    <S.Container>
      {!isGameInProgress(gameState) && (
        <S.ReplayButton onClick={resetGame}>Play Again?</S.ReplayButton>
      )}
    </S.Container>
  );
}
