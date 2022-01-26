import React from "react";

import { Keyboard } from "components/Keyboard";
import { ALPHABET, LetterResult, MAX_GUESS_COUNT } from "services/wordle";

import * as S from "./styles";

export function App() {
  const word = "crimp";
  let letter_results: {
    [x: string]: LetterResult;
  } = ALPHABET.reduce((a, letter) => ({ ...a, [letter]: LetterResult.UNUSED }), {})
  console.log(letter_results)

  for (let guess_count = 0; guess_count < MAX_GUESS_COUNT; guess_count++) {
    // TODO: get_input
    // TODO: analyze_guess
    // TODO: check if they've won
  }

  return (
    <S.Wrapper>
      <div>Game Area</div>
      <Keyboard letter_results={letter_results} />
    </S.Wrapper>
  );
}
