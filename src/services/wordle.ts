import { ANSWERS } from "services/answers";

export enum LetterResult {
  NOT_IN_WORD,
  INCORRECT_POSITION,
  CORRECT_POSITION,
  NOT_GUESSED,
}

export enum GameResult {
  LOSS,
  WIN
}

export interface LetterResults { [x: string]: LetterResult; };

export interface GuessResult {
  guess: string;
  result: LetterResult[];
}

export function analyzeGuess(guess: string, word: string, letterResults: LetterResults) {
  const guessResult = guess.split("").map(_ => LetterResult.NOT_IN_WORD);
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
      || updatedLetterResults[guessResult[0]] === LetterResult.NOT_GUESSED
    ) {
      updatedLetterResults = { ...updatedLetterResults, ...{ [guessResult[0]]: guessResult[1] as LetterResult } }
    }
  })

  return {
    result: guessResult, updatedLetterResults
  };
}

export function getRandomWord() {
  const word = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];

  return word;
}
