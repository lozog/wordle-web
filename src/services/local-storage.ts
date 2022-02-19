import { MAX_GUESS_COUNT } from "./constants";
import { GameState } from "./wordle";

function saveToLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key));
}

function updateStats(values: object) {
  saveToLocalStorage("statistics", {
    ...readFromLocalStorage("statistics"),
    ...values
  });
}

export function isStorageInitialized() {
  return Boolean(localStorage.getItem("statistics"));
}

export function saveHardMode(isHardModeEnabled = false) {
  saveToLocalStorage("hard_mode", isHardModeEnabled)
}

export function readHardMode() {
  return Boolean(readFromLocalStorage("hard_mode"));
}

export function readStats() {
  return readFromLocalStorage("statistics");
}

export function resetStats() {
  updateStats({
    gamesPlayed: 0,
    gamesWon: 0,
    guesses: [...Array(MAX_GUESS_COUNT + 1)].map(_ => 0), // add 1 because you can't have 0 guesses
    currentStreak: 0,
    maxStreak: 0
  });
}

export function saveGameResult(gameState: GameState, guessCount = 0) {
  const { 
    gamesPlayed,
    gamesWon,
    currentStreak,
    maxStreak,
    guesses
  } = readStats();

  const newCurrentStreak = gameState === GameState.WIN ? currentStreak + 1 : 0;
  const newGuesses = gameState === GameState.WIN
    ? (guesses as number[]).map((value, i) => guessCount === i ? value + 1 : value)
    : guesses;

  updateStats({
    gamesWon: gameState === GameState.WIN ? gamesWon + 1 : gamesWon,
    gamesPlayed: gamesPlayed + 1,
    currentStreak: newCurrentStreak,
    maxStreak: Math.max(newCurrentStreak, maxStreak),
    guesses: newGuesses
  });
}
