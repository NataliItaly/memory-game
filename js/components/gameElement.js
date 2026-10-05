import createElement from '../utils/createElement.js';
import generateCards from '../utils/generateCards.js';
import playerElement from './playerElement.js';

export default function gameElement() {
  const game = createElement('div', { class: 'game' });
  const gameHeader = createElement('div', { class: 'game__header' });
  const player1 = playerElement(1);
  const player2 = playerElement(2);
  const gameSteps = createElement(
    'div',
    { class: 'game__steps', id: 'game-steps' },
    '0',
  );
  const gameScreen = createElement('div', { class: 'game__screen' });

  const cards = generateCards();
  cards.forEach((card) => gameScreen.append(card));

  gameHeader.append(player1, gameSteps, player2);
  game.append(gameHeader, gameScreen);

  return {
    game,
    gameSteps,
    player1,
    player2,
    gameScreen,
  };
}
