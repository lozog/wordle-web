import { GameState } from "./wordle";

function saveToLocalStorage(key: string, value: object) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readFromLocalStorage(key: string) {
  return JSON.parse(localStorage.getItem(key));
}

export function isStorageInitialized() {
  return Boolean(localStorage.getItem("statistics"));
}

export function updateStats(values: object) {
  saveToLocalStorage("statistics", {
    ...readFromLocalStorage("statistics"),
    ...values
  });
}

export function readStats() {
  return readFromLocalStorage("statistics");
}

export function saveGameResult(gameState: GameState, guessCount = 0) {
  console.log("saveGameResult")
  const { 
    gamesPlayed,
    gamesWon,
    currentStreak,
    maxStreak,
    guesses
  } = readStats();

  const newCurrentStreak = gameState === GameState.WIN ? currentStreak + 1 : 0;

  updateStats({
    gamesWon: gameState === GameState.WIN ? gamesWon + 1 : gamesWon,
    gamesPlayed: gamesPlayed + 1,
    currentStreak: newCurrentStreak,
    maxStreak: Math.max(newCurrentStreak, maxStreak),
    guesses: (guesses as number[]).map((value, i) => guessCount === i ? value + 1 : value)
  });
}
