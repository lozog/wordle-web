import React, { useCallback, useEffect, useState } from "react";
import { Keyboard } from "components/Keyboard";
import { Guess } from "components/Guess";
import { ALPHABET, LetterResult, MAX_GUESS_COUNT, WORD_LENGTH } from "services/wordle";
import * as S from "./styles";

const analyzeGuess = (guess: string, word: string) => {
  const guessResult = guess.split("").map(_ => LetterResult.INCORRECT);
  const remainingGuess = guess.split("");
  const unguessedLetters = word.split("");

  // 1. find all letters in correct position
  guess.split("").forEach((letter, i) => {
    if (letter === word.split("")[i]) {
      guessResult[i] = LetterResult.CORRECT_POSITION;
      remainingGuess[i] = null;
      unguessedLetters[i] = null;
    }
  })

  // 2. find any remaining letters that are in incorrect positions
  remainingGuess.forEach((letter, i) => {
    if (letter !== null && unguessedLetters.includes(letter)) {
      guessResult[i] = LetterResult.INCORRECT_POSITION;
      unguessedLetters.splice(unguessedLetters.indexOf(letter), 1);
    }
  })

  // TODO: keep track of guessed letters

  console.log(guessResult);
  return guessResult;
}

export function App() {
  const word = "crimp";
  const [currentGuess, setCurrentGuess] = useState("");
  const [prevGuesses, setPrevGuesses] = useState([]);

  const handleLetterPress = (letter: string) => {
    setCurrentGuess(prevGuess => {
      if (prevGuess.length < WORD_LENGTH) {
        return `${prevGuess}${letter}`;
      }
      return prevGuess;
    });
  }

  const handleUserKeyPress = useCallback(event => {
    const { key, keyCode } = event;
    if (keyCode >= 65 && keyCode <= 90) {
      handleLetterPress(key);
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
          const guessResult = analyzeGuess(prevGuess, word);
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
      <Keyboard letterResults={letterResults} handleLetterPress={handleLetterPress} />
    </S.Container>
  );
}
