import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard } from "components/Keyboard";
import { Guess } from "components/Guess";
import { ALPHABET, MAX_GUESS_COUNT, WORD_LENGTH } from "services/constants";
import {
  LetterResult,
  GuessResult,
  LetterResults,
  analyzeGuess,
  getRandomWord,
  validateGuess,
  GuessStatus
} from "services/wordle";
import * as S from "./styles";

function getStatusText(status: GuessStatus) {
  if (status === GuessStatus.LENGTH) {
    return "Not enough letters.";
  }

  if (status === GuessStatus.WORD_LIST) {
    return "Not in word list.";
  }

  return "";
}

export function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [prevGuesses, setPrevGuesses] = useState<GuessResult[]>([]);
  const [letterResults, setLetterResults] = useState <LetterResults>({});
  const [status, setStatus] = useState(GuessStatus.VALID);
  const word = useMemo(() => getRandomWord(), []);

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
      const guessStatus = validateGuess(currentGuess);
      if (guessStatus !== GuessStatus.VALID) {
        setStatus(guessStatus);
        return "";
      }
      setStatus(GuessStatus.VALID);

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
  }, [currentGuess, prevGuesses, word, letterResults]);

  useEffect(() => {
    document.addEventListener('keydown', handleUserKeyPress);
    return () => {
      document.removeEventListener('keydown', handleUserKeyPress);
    }
  }, [handleUserKeyPress])

  useEffect(() => {
    console.log(word) // TODO: only do this locally
    setLetterResults(ALPHABET.reduce((a, letter) => ({ ...a, [letter]: LetterResult.NOT_GUESSED }), {}));
  }, [word])

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
      <S.StatusText>{getStatusText(status)}</S.StatusText>
      <S.Guesses>
        {renderGuesses()}
      </S.Guesses>
      <Keyboard letterResults={letterResults} handleLetterPress={handleLetterPress} />
    </S.Container>
  );
}
