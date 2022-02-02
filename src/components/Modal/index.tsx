import React, { useEffect, useState } from "react";
import { readStats, resetStats } from "services/local-storage";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const Modal = ({ isOpen, closeModal }: Props) => {
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [guesses, setGuesses] = useState([]);

  const readStatsFromStorage = () => {
    const {
      gamesPlayed,
      gamesWon,
      currentStreak,
      maxStreak,
      guesses
    } = readStats();

    setGamesPlayed(gamesPlayed);
    setGamesWon(gamesWon);
    setCurrentStreak(currentStreak);
    setMaxStreak(maxStreak);
    setGuesses(guesses);
  }

  useEffect(() => {
    readStatsFromStorage();
  }, [isOpen])

  const winPercentage = Math.round((gamesWon / gamesPlayed) * 100) || 0;

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
        <S.Button onClick={() => { resetStats(); readStatsFromStorage(); }}>reset</S.Button>
      </S.Container>
    </S.Overlay>
  );
};
