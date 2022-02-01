import React from "react";
import { readStats } from "services/local-storage";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const Modal = ({ isOpen, closeModal }: Props) => {
  const {
    gamesPlayed,
    gamesWon,
    currentStreak,
    maxStreak,
    guesses
  } = readStats();

  const winPercentage = (gamesWon / gamesPlayed) * 100;

  return (
    <S.Overlay isOpen={isOpen}>
      <S.Container>
        <S.TopBar>
          <S.CloseButton onClick={closeModal}>X</S.CloseButton>
        </S.TopBar>
        <S.Statistics>
          <S.Stat>
            <S.StatValue>{gamesPlayed}</S.StatValue>
            <S.StatLabel>Played</S.StatLabel>
          </S.Stat>
          <S.Stat>
            <S.StatValue>{winPercentage}</S.StatValue>
            <S.StatLabel>Win %</S.StatLabel>
          </S.Stat>
          <S.Stat>
            <S.StatValue>{currentStreak}</S.StatValue>
            <S.StatLabel>Current Streak</S.StatLabel>
          </S.Stat>
          <S.Stat>
            <S.StatValue>{maxStreak}</S.StatValue>
            <S.StatLabel>Max Streak</S.StatLabel>
          </S.Stat>
        </S.Statistics>
        <S.GuessDistribution></S.GuessDistribution>
      </S.Container>
    </S.Overlay>
  );
};
