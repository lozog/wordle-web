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

export const WORD_LENGTH = 5;
export const MAX_GUESS_COUNT = 6;
export const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
export const HARD_MODE = false;

export interface LetterResults { [x: string]: LetterResult; };

export interface GuessResult {
  guess: string;
  result: LetterResult[];
}
