export const cardsNumber = 16;

let isFirstLoad = Boolean(localStorage.getItem('isFirstLoad'));

export function setIsFirstLoad() {
  isFirstLoad = false;
  localStorage.setItem('isFirstLoad', 'false');
}

export function getIsFirstLoad() {
  return isFirstLoad;
}

const initialGameState = {
  currentClick: 2,
  currentCouple: [],
  couples: [],
  cardsSequence: [],
  score: 0,
  steps: 0,
  time: 0,
  isPlaying: false,
  results: [],
  games: [],
  savedGames: [],
};

let gameState;

const savedGameState = localStorage.getItem('gameState');

if (savedGameState) {
  gameState = JSON.parse(savedGameState);
} else {
  gameState = structuredClone(initialGameState);
  localStorage.setItem('gameState', JSON.stringify(gameState));
}

export function getGameState() {
  return gameState;
}

export function setGameState(obj) {
  for (let key in obj) {
    if (key in gameState) {
      gameState[key] = obj[key];
    }
  }

  localStorage.setItem('gameState', JSON.stringify(gameState));
}

export function resetGameState() {
  const games = getGameState().games;
  const savedGames = getGameState().savedGames;

  setGameState(structuredClone(initialGameState));
  setGameState({ games, savedGames });
  console.log('reset', getGameState().time);
}
