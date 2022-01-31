import React, { useCallback, useEffect, useState } from "react";
import { Keyboard } from "components/Keyboard";
import { Guess } from "components/Guess";
import { ALPHABET, LetterResult, MAX_GUESS_COUNT, WORD_LENGTH, GuessResult, LetterResults, analyzeGuess } from "services/wordle";
import * as S from "./styles";

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
    setLetterResults(ALPHABET.reduce((a, letter) => ({ ...a, [letter]: LetterResult.NOT_GUESSED }), {}));
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
