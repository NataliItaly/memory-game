import createElement from '../utils/createElement.js';
import { getGameState, cardsNumber } from '../states.js';
import getTimerString from '../utils/getTimerString.js';

export default function gameElement() {
  const gameState = getGameState();
  const game = createElement('div', { class: 'game' });
  const gameHeader = createElement('div', { class: 'game__header' });

  const currentResult = createElement(
    'span',
    { class: 'game__result_current' },
    `${gameState.score}`,
  );
  const span = createElement('span', { class: 'game__result_span' }, '/');
  const totalResult = createElement(
    'span',
    { class: 'game__result_total' },
    `${cardsNumber / 2}`,
  );
  const gameResult = createElement('div', { class: 'game__result' });
  gameResult.append(currentResult, span, totalResult);

  const gameSteps = createElement(
    'div',
    { class: 'game__steps', id: 'game-steps' },
    '0',
  );
  const gameTimer = createElement(
    'div',
    {
      class: 'game__timer',
      id: 'game-timer',
    },
    getTimerString(gameState.time),
  );

  const gameScreen = createElement('div', { class: 'game__screen' });

  gameHeader.append(gameSteps, gameResult, gameTimer);
  game.append(gameHeader, gameScreen);

  return {
    game,
    gameSteps,
    currentResult,
    gameScreen,
    gameTimer,
    /* gameMinutes,
    gameSeconds, */
  };
}
