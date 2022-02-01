import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard } from "components/Keyboard";
import { GameControls } from "components/GameControls";
import { Guess } from "components/Guess";
import { ALPHABET, MAX_GUESS_COUNT, WORD_LENGTH } from "services/constants";
import {
  LetterResult,
  GuessResult,
  LetterResults,
  analyzeGuess,
  getRandomWord,
  validateGuess,
  GuessStatus,
  getStatusText,
  isGuessCorrect,
  GameState
} from "services/wordle";
import * as S from "./styles";

export function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [prevGuesses, setPrevGuesses] = useState<GuessResult[]>([]);
  const [letterResults, setLetterResults] = useState <LetterResults>({});
  const [guessStatus, setGuessStatus] = useState(GuessStatus.VALID);
  const [gameState, setGameState] = useState(GameState.IN_PROGRESS);
  const [word, setWord] = useState(getRandomWord());

  const resetGame = () => {
    setCurrentGuess("");
    setPrevGuesses([]);
    setLetterResults({});
    setGuessStatus(GuessStatus.VALID);
    setGameState(GameState.IN_PROGRESS);
    setWord(getRandomWord());
  };

  const handleLetterPress = (letter: string) => {
    if (gameState !== GameState.IN_PROGRESS) {
      return;
    }

    setCurrentGuess(prevGuess => {
      if (prevGuess.length < WORD_LENGTH) {
        return `${prevGuess}${letter}`;
      }
      return prevGuess;
    });
  }

  const handleUserKeyPress = useCallback(event => {
    if (gameState !== GameState.IN_PROGRESS) {
      return;
    }

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
        setGuessStatus(guessStatus);
        return;
      }
      setGuessStatus(GuessStatus.VALID);

      setCurrentGuess(prevGuess => { // TODO: sometimes this gets called twice when enter is pressed
        if (prevGuess.length === WORD_LENGTH) {
          const { result, updatedLetterResults } = analyzeGuess(prevGuess, word, letterResults);
          const guessResult = {
            guess: prevGuess,
            result,
          };

          if(isGuessCorrect(guessResult)) {
            setGuessStatus(GuessStatus.CORRECT);
            setGameState(GameState.WIN);
          }

          setLetterResults({ ...letterResults, ...updatedLetterResults });
          setPrevGuesses(_ => {
            if (prevGuesses.length + 1 === MAX_GUESS_COUNT) {
              setGameState(GameState.LOSS);
            }
            return [...prevGuesses, guessResult];
          }); // TODO: useCallback

          return "";
        }
        return prevGuess;
      });
    }
  }, [gameState, currentGuess, prevGuesses, word, letterResults]);

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
      <S.StatusText>{getStatusText(guessStatus)}</S.StatusText>
      <GameControls gameState={gameState} word={word} resetGame={resetGame} />
      <S.Guesses>
        {renderGuesses()}
      </S.Guesses>
      <Keyboard letterResults={letterResults} handleLetterPress={handleLetterPress} />
    </S.Container>
  );
}
