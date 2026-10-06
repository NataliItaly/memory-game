import { getGameState, resetGameState, setGameState } from '../states.js';
import generateCards from './generateCards.js';
import setGame from './setGame.js';

export default function initGame(game) {
  resetGameState();
  generateCards();
  setGame(game);
}
