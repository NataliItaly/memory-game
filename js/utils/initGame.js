import { getGameState, resetGameState, setGameState } from '../states.js';
import setGame from './setGame.js';

export default function initGame(game) {
  resetGameState();
  setGameState({ isFinished: true });
  setGame(game);
}
