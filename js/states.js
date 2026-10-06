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
  currentPlayer: 'player1',
  player1: {
    score: 0,
  },
  player2: {
    score: 0,
  },
  steps: 0,
  isFinished: false,
  games: [],
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
  setGameState(structuredClone(initialGameState));
}
