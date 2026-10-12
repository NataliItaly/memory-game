import { getGameState, resetGameState, setGameState } from '../states.js';
import generateCards from './generateCards.js';
import setGame from './setGame.js';
import gameElement from '../components/gameElement.js';

export default function initGame(game) {
  resetGameState();
  generateCards(); // cards sequence is created here
  const secondsEl = gameElement().gameSeconds;
  const minutesEl = gameElement().gameMinutes;
  console.log(gameElement(), secondsEl, minutesEl);
  let startTime = 0;
  console.log(startTime);

  const gameInterval = setInterval(function () {
    startTime += 1;

    secondsEl.textContent = String(startTime % 60).padStart(2, '0');
    minutesEl.textContent = String(Math.floor(startTime / 60)).padStart(2, '0');
    console.log('seconds', String(startTime % 60).padStart(2, '0'));
    console.log('startTime', startTime);
  }, 1000);

  setGame(game);
}
