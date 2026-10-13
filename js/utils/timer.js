import { getGameState, setGameState } from '../states.js';
import getTimerString from './getTimerString.js';

let gameInterval = null;
let startTime = 0;

export function startTimer(game) {
  stopTimer();
  const state = getGameState();
  game.gameTimer.textContent = getTimerString(startTime);

  gameInterval = setInterval(function () {
    startTime += 1;

    game.gameTimer.textContent = getTimerString(startTime);
    setGameState({ time: startTime });
  }, 1000);
}

export function stopTimer() {
  setGameState({ time: startTime });
  clearInterval(gameInterval);
  gameInterval = null;
}
