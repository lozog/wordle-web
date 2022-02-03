import { ALLOWED_GUESSES, ANSWERS } from "services/answers";
import { ALPHABET, WORD_LENGTH } from "./constants";

export enum LetterResult {
  NOT_IN_WORD,
  INCORRECT_POSITION,
  CORRECT_POSITION,
  NOT_GUESSED,
}

export enum GameState {
  LOSS,
  VALID,
  LENGTH,
  WORD_LIST,
  HARD_MODE,
  WIN
}

export interface LetterResults {
  [x: string]: LetterResult;
};

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
  return ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
}

export function getEmptyLetterResults() {
  return ALPHABET.reduce((a, letter) => ({ ...a, [letter]: LetterResult.NOT_GUESSED }), {});
}

export function validateGuess(
  guess: string,
  isHardMode: boolean,
  word: string,
  letterResults: LetterResults
) {
  if (guess.length !== WORD_LENGTH) {
    return GameState.LENGTH;
  }

  if (ALLOWED_GUESSES.indexOf(guess) === -1 && ANSWERS.indexOf(guess) === -1) {
    return GameState.WORD_LIST;
  }

  if (isHardMode) {
    const wordLetters = word.split("");
    const guessLetters = guess.split("");

    for (const [i, letter] of guessLetters.entries()) {
      if (
        letterResults[wordLetters[i]] === LetterResult.CORRECT_POSITION
        && letter !== wordLetters[i]
      ) {
        // letter at position {i+1} must be {wordLetters[i]}
        return GameState.HARD_MODE;
      }
    }

    Object.keys(letterResults).forEach((letter) => {
      if (
        letterResults[letter] === LetterResult.INCORRECT_POSITION
        && !guessLetters.includes(letter)
      ) {
        // guess must contain letter previously found in word
        return GameState.HARD_MODE;
      }
    })

    for (const letter in letterResults) {
      if (
        letterResults[letter] === LetterResult.INCORRECT_POSITION
        && !guessLetters.includes(letter)
      ) {
        return GameState.HARD_MODE;
      }
    }
  }

  return GameState.VALID;
}

export function getStatusText(gameState: GameState, word = "") {
  switch(gameState) {
    case GameState.LENGTH:
      return "Not enough letters.";
    case GameState.WORD_LIST:
      return "Not in word list.";
    case GameState.WIN:
    return "Correct!";
    case GameState.HARD_MODE:
      return "Guess must include previously revealed hints.";
    case GameState.LOSS:
      return word;
    default:
      return "";
  }
}

export function isGuessCorrect(guessResult: GuessResult) {
  const { result } = guessResult;
  return result.filter((elem) => elem !== LetterResult.CORRECT_POSITION).length === 0;
}

export function isGameInProgress(status: GameState) {
  return ![
    GameState.LOSS,
    GameState.WIN
  ].includes(status);
}
