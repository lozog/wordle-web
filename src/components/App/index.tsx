import React, { useCallback, useEffect, useState } from "react";
import { Keyboard } from "components/Keyboard";
import { Guess } from "components/Guess";
import { ALPHABET, LetterResult, MAX_GUESS_COUNT, WORD_LENGTH, GuessResult, LetterResults } from "services/wordle";
import * as S from "./styles";

const analyzeGuess = (guess: string, word: string, letterResults: LetterResults) => {
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

  // 3. keep track of guessed letters
  const fullGuessResults = guess.split("").map((letter, i) => ([letter, guessResult[i]]));
  let updatedLetterResults = letterResults;
  fullGuessResults.forEach((guessResult, i) => {
    if (
      guessResult[1] === LetterResult.CORRECT_POSITION
      || updatedLetterResults[guessResult[0]] === LetterResult.UNUSED
    ) {
      updatedLetterResults = { ...updatedLetterResults, ...{ [guessResult[0]]: guessResult[1] as LetterResult } }
    }
  })

  return {
    result: guessResult, updatedLetterResults
  };
}

export function App() {
  const word = "crimp";
  const [currentGuess, setCurrentGuess] = useState("");
  const [prevGuesses, setPrevGuesses] = useState<GuessResult[]>([]);
  const [letterResults, setLetterResults] = useState <LetterResults>({});

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
      setCurrentGuess(prevGuess => { // TODO: sometimes this gets called twice when enter is pressed
        if (prevGuess.length === WORD_LENGTH) {
          const { result, updatedLetterResults } = analyzeGuess(prevGuess, word, letterResults);
          const guessResult = {
            guess: prevGuess,
            result,
          };
          setPrevGuesses([...prevGuesses, guessResult]); // TODO: useCallback
          setLetterResults({...letterResults, ...updatedLetterResults});
          return "";
        }
        return prevGuess;
      });
    }
  }, [prevGuesses, letterResults]);

  useEffect(() => {
    document.addEventListener('keydown', handleUserKeyPress);
    return () => {
      document.removeEventListener('keydown', handleUserKeyPress);
    }
  }, [handleUserKeyPress])

  useEffect(() => {
    setLetterResults(ALPHABET.reduce((a, letter) => ({ ...a, [letter]: LetterResult.UNUSED }), {}));
  }, [])

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
