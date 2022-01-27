import React from "react";
import { LetterResult, WORD_LENGTH } from "services/wordle";
import * as S from "./styles";

interface Props {
  guess: string;
  word: string;
}

export function Guess({ guess, word }: Props) {
  const renderTiles = () => {
    return [...Array(WORD_LENGTH).keys()].map(i => (
      <S.Letter letterResult={LetterResult.UNUSED}>{i}</S.Letter>
    ))
  }
  return (
    <S.Container wordLength={WORD_LENGTH}>{renderTiles()}</S.Container>
  );
}
