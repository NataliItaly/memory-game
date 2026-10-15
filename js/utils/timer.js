import { setGameState } from '../states.js';
import getTimerString from './getTimerString.js';

let gameInterval = null;

export function startTimer(game, startTime) {
  stopTimer(0);
  game.gameTimer.textContent = getTimerString(startTime);

  gameInterval = setInterval(function () {
    startTime += 1;

    game.gameTimer.textContent = getTimerString(startTime);
    setGameState({ time: startTime });
  }, 1000);
}

export function stopTimer(startTime) {
  setGameState({ time: startTime });
  clearInterval(gameInterval);
  gameInterval = null;
}
