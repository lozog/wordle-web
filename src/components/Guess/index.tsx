import React from "react";
import { LetterResult, WORD_LENGTH } from "services/wordle";
import * as S from "./styles";

interface Props {
  guess: string;
  word: string;
  currentGuessCount: number;
  guessIndex: number;
}

export function Guess({ guess, word, currentGuessCount, guessIndex }: Props) {
  const renderTiles = () => {
    return [...Array(WORD_LENGTH).keys()].map(i => (
      <S.Letter key={i} letterResult={LetterResult.UNUSED}>
        {currentGuessCount === guessIndex && guess.split("")[i]}
      </S.Letter>
    ))
  }
  return (
    <S.Container wordLength={WORD_LENGTH}>{renderTiles()}</S.Container>
  );
}
