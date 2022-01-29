import React, { useCallback, useEffect, useState } from "react";
import { Keyboard } from "components/Keyboard";
import { Guess } from "components/Guess";
import { ALPHABET, LetterResult, MAX_GUESS_COUNT, WORD_LENGTH } from "services/wordle";
import * as S from "./styles";

export function App() {
  const word = "crimp";
  const [currentGuess, setCurrentGuess] = useState("");
  const [prevGuesses, setPrevGuesses] = useState([]);

  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode } = event;
    if (keyCode >= 65 && keyCode <= 90) {
      setCurrentGuess(prevGuess => {
        if (prevGuess.length < WORD_LENGTH) {
          return `${prevGuess}${key}`;
        }
        return prevGuess;
      });
    }

    if (key === "Backspace") {
      setCurrentGuess(prevGuess => {
        if (prevGuess.length > 0) {
          return prevGuess.slice(0, -1);
        }
        return "";
      });
    }

    if (key === "Enter") {
      setCurrentGuess(prevGuess => {
        if (prevGuess.length === WORD_LENGTH) {
          // TODO: sometimes this gets called twice when enter is pressed
          setPrevGuesses([...prevGuesses, prevGuess]); // TODO: useCallback
          return "";
        }
        return prevGuess;
      });
    }
  }, [prevGuesses]);

  useEffect(() => {
    document.addEventListener('keydown', handleUserKeyPress);
    return () => {
      document.removeEventListener('keydown', handleUserKeyPress);
    }
  }, [handleUserKeyPress])

  const getWordToRender = (i: number) => {
    let wordToRender = prevGuesses[i];

    if (wordToRender) {
      return wordToRender;
    }

    if (i === prevGuesses.length) {
      return currentGuess;
    } else {
      return "";
    }
  }

  let letterResults: {
    [x: string]: LetterResult;
  } = ALPHABET.reduce((a, letter) => ({ ...a, [letter]: LetterResult.UNUSED }), {});

  for (let guessCount = 0; guessCount < MAX_GUESS_COUNT; guessCount++) {
    // TODO: get_input
    // TODO: analyze_guess
    // TODO: check if they've won
  }

  const renderGuesses = () => {
    return [...Array(MAX_GUESS_COUNT).keys()].map((guessIndex, i) => (
      <Guess
        key={i}
        wordToRender={getWordToRender(i)}
        word={word}
        isLockedIn={guessIndex < prevGuesses.length - 1}
      />
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
