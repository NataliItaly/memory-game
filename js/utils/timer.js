import { getGameState, setGameState } from '../states.js';
import getTimerString from './getTimerString.js';

let gameInterval = null;

export function startTimer(game) {
  stopTimer();

  const state = getGameState();
  let startTime = state.time ?? 0;
  game.gameTimer.textContent = getTimerString(startTime);

  gameInterval = setInterval(function () {
    startTime += 1;

    setGameState({ time: startTime });

    game.gameTimer.textContent = getTimerString(startTime);
  }, 1000);
}

export function stopTimer() {
  clearInterval(gameInterval);
  gameInterval = null;
}
