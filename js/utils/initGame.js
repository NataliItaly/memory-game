import { getGameState, resetGameState, setGameState } from '../states.js';
import generateCards from './generateCards.js';
import setGame from './setGame.js';
import getTimerString from './getTimerString.js';
import { startTimer } from './timer.js';

export default function initGame(game) {
  resetGameState();
  generateCards(); // cards sequence is created here

  //startTimer(game);

  setGame(game);
}
