export enum LetterResult {
  INCORRECT,
  INCORRECT_POSITION,
  CORRECT_POSITION,
  UNUSED,
}

export enum GameResult {
  LOSS,
  WIN
}

export const WORD_LENGTH = 5;
export const MAX_GUESS_COUNT = 6;
export const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split("");
export const HARD_MODE = false;

export interface GuessResult {
  guess: string;
  result: LetterResult[];
}
