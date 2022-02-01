import React, { useCallback, useEffect, useState } from "react";
import { Keyboard } from "components/Keyboard";
import { GameControls } from "components/GameControls";
import { Guess } from "components/Guess";
import { ALPHABET, MAX_GUESS_COUNT, WORD_LENGTH } from "services/constants";
import {
  LetterResult,
  GuessResult,
  LetterResults,
  GameState,
  analyzeGuess,
  getRandomWord,
  validateGuess,
  getStatusText,
  isGuessCorrect,
  isGameInProgress
} from "services/wordle";
import * as S from "./styles";

export function App() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [prevGuesses, setPrevGuesses] = useState<GuessResult[]>([]);
  const [letterResults, setLetterResults] = useState <LetterResults>({});
  const [gameState, setGameState] = useState(GameState.VALID);
  const [word, setWord] = useState(getRandomWord());

  const resetGame = () => {
    setCurrentGuess("");
    setPrevGuesses([]);
    setLetterResults({});
    setGameState(GameState.VALID);
    setWord(getRandomWord());
  };

  const handleLetterPress = useCallback((letter: string) => {
    if (!isGameInProgress(gameState)) {
      return;
    }

    setCurrentGuess(prevGuess => {
      if (prevGuess.length < WORD_LENGTH) {
        return `${prevGuess}${letter}`;
      }
      return prevGuess;
    });
  }, [gameState]);

  const handleBackspace = useCallback(() => {
    setCurrentGuess(prevGuess => {
      if (prevGuess.length > 0) {
        return prevGuess.slice(0, -1);
      }
      return "";
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const gameState = validateGuess(currentGuess);
    if (gameState !== GameState.VALID) {
      setGameState(gameState);
      return;
    }
    setGameState(GameState.VALID);

    setCurrentGuess(prevGuess => {
      if (prevGuess.length === WORD_LENGTH) {
        const { result, updatedLetterResults } = analyzeGuess(prevGuess, word, letterResults);
        const guessResult = {
          guess: prevGuess,
          result,
        };

        if (isGuessCorrect(guessResult)) {
          setGameState(GameState.WIN);
        }

        setLetterResults({ ...letterResults, ...updatedLetterResults });
        setPrevGuesses(_ => {
          if (prevGuesses.length + 1 === MAX_GUESS_COUNT) {
            setGameState(GameState.LOSS);
          }
          return [...prevGuesses, guessResult];
        });

        return "";
      }
      return prevGuess;
    });
  }, [currentGuess, letterResults, prevGuesses, word]);

  const handleUserKeyPress = useCallback(event => {
    if (!isGameInProgress(gameState)) {
      return;
    }

    const { key, keyCode } = event;
    if (keyCode >= 65 && keyCode <= 90) {
      handleLetterPress(key);
    }

    if (key === "Backspace") {
      handleBackspace();
    }

    if (key === "Enter") {
      handleSubmit();
    }
  }, [gameState, handleBackspace, handleSubmit, handleLetterPress]);

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
      <S.GameState>
        {gameState === GameState.LOSS && (
          <S.Word>{word}</S.Word>
        )}
        {gameState !== GameState.LOSS && (
          getStatusText(gameState)
        )}
      </S.GameState>
      <GameControls gameState={gameState} resetGame={resetGame} />
      <S.Guesses>
        {renderGuesses()}
      </S.Guesses>
      <Keyboard
        letterResults={letterResults}
        handleLetterPress={handleLetterPress}
        handleBackspace={handleBackspace}
        handleSubmit={handleSubmit}
      />
    </S.Container>
  );
}
