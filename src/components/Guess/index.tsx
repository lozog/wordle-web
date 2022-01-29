import React from "react";
import { LetterResult, WORD_LENGTH } from "services/wordle";
import * as S from "./styles";

interface Props {
  wordToRender: string;
  word: string;
}

export function Guess({ wordToRender, word }: Props) {
  const renderTiles = () => {
    return [...Array(WORD_LENGTH).keys()].map(i => (
      <S.Letter key={i} letterResult={LetterResult.UNUSED}>
        {wordToRender.split("")[i]}
      </S.Letter>
    ))
  }
  return (
    <S.Container wordLength={WORD_LENGTH}>{renderTiles()}</S.Container>
  );
}
