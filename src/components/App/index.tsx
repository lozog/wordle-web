import React, { useState } from "react";
import { Keyboard } from "components/Keyboard";
import { Guess } from "components/Guess";
import { ALPHABET, LetterResult, MAX_GUESS_COUNT } from "services/wordle";
import * as S from "./styles";

export function App() {
  const word = "crimp";
  const [guesses, setGuesses] = useState(["", "", "", "", "", ""])

  let letterResults: {
    [x: string]: LetterResult;
  } = ALPHABET.reduce((a, letter) => ({ ...a, [letter]: LetterResult.UNUSED }), {})

  for (let guessCount = 0; guessCount < MAX_GUESS_COUNT; guessCount++) {
    // TODO: get_input
    // TODO: analyze_guess
    // TODO: check if they've won
  }

  const renderGuesses = () => {
    return guesses.map((guess, i) => (
      <Guess key={i} guess={guess} word={word} />
    ));
  }

  return (
    <S.Container>
      <S.Guesses>
        {renderGuesses()}
      </S.Guesses>
      <Keyboard letterResults={letterResults} />
    </S.Container>
  );
}
