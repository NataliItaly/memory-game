import createElement from '../utils/createElement.js';
import { getGameState, cardsNumber } from '../states.js';

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
  const gameTimer = createElement('div', {
    class: 'game__timer',
    id: 'game-timer',
  });
  const gameMinutes = createElement(
    'span',
    { class: 'game__minutes', id: 'game-minutes' },
    '00',
  );
  const colon = createElement('span', {}, ':');
  const gameSeconds = createElement(
    'span',
    { class: 'game__seconds', id: 'game-seconds' },
    '00',
  );
  gameTimer.append(gameMinutes, colon, gameSeconds);

  const gameScreen = createElement('div', { class: 'game__screen' });

  gameHeader.append(gameSteps, gameResult, gameTimer);
  game.append(gameHeader, gameScreen);

  return {
    game,
    gameSteps,
    currentResult,
    gameScreen,
    gameMinutes,
    gameSeconds,
  };
}
