import React from "react";
import { WORD_LENGTH } from "services/constants";
import { GuessResult } from "services/wordle";
import * as S from "./styles";

interface Props {
  wordToRender: GuessResult | string; // TODO: this is kinda janky
  word: string;
  isLockedIn: boolean;
}

export function Guess({ wordToRender, word, isLockedIn }: Props) {
  const renderTiles = () => {
    const guess = typeof wordToRender === "string" ? wordToRender.split("") : wordToRender.guess.split("");

    return [...Array(WORD_LENGTH).keys()].map(i => (
      <S.Letter
        key={i}
        letterToRender={guess[i] ?? ""}
        letterResult={typeof wordToRender !== "string" ? wordToRender.result[i] : null}
        isLockedIn={isLockedIn}
      >
        {guess[i]}
      </S.Letter>
    ))
  }
  return (
    <S.Container wordLength={WORD_LENGTH}>{renderTiles()}</S.Container>
  );
}
