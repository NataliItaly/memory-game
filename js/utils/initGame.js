import { getGameState, resetGameState, setGameState } from '../states.js';
import generateCards from './generateCards.js';
import setGame from './setGame.js';
import setTimerString from './setTimeString.js';

export default function initGame(game) {
  resetGameState();
  generateCards(); // cards sequence is created here

  const secondsEl = game.gameSeconds;
  const minutesEl = game.gameMinutes;
  let startTime = 0;

  const gameInterval = setInterval(function () {
    startTime += 1;

    setGameState({ time: startTime });

    game.gameTimer.textContent = setTimerString();
  }, 1000);

  setGame(game);
}
