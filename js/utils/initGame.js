import { getGameState, resetGameState, setGameState } from '../states.js';
import generateCards from './generateCards.js';
import setGame from './setGame.js';

export default function initGame(game) {
  resetGameState();
  generateCards(); // cards sequence is created here
  setGame(game);
}
