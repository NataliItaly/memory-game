export const cardsNumber = 16;

const gameState = {
  currentClick: 2,
  currentCouple: [],
  couples: [],
  currentPlayer: 'player1',
  player1: {
    couples: null,
    score: 0,
  },
  player2: {
    couples: null,
    score: 0,
  },
};

export function getGameState() {
  return gameState;
}

export function setGameState(obj) {
  for (let key in obj) {
    if (gameState[key]) {
      gameState[key] = obj[key];
    }
  }
}
