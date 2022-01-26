import React from "react";
import * as S from "./styles";


enum LetterResult {
  INCORRECT,
  INCORRECT_POSITION,
  CORRECT_POSITION,
  UNUSED,
}

enum GameResult {
  LOSS,
  WIN
}

const WORD_LENGTH = 5;
const MAX_GUESS_COUNT = 6;
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
const HARD_MODE = false;

function App() {
  const word = "crimp";
  const letter_results = ALPHABET.map((letter: string) => ({ [letter]: LetterResult.UNUSED }))

  for (let guess_count = 0; guess_count < MAX_GUESS_COUNT; guess_count++) {
    // TODO: get_input
    // TODO: analyze_guess
    // TODO: check if they've won
  }

  return (
    <S.Wrapper>
      <div>Game Area</div>
      <div>Keyboard Area</div>
    </S.Wrapper>
  );
}

export default App;
