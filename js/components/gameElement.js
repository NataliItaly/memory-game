import createElement from '../utils/createElement.js';
import generateCards from '../utils/generateCards.js';
import playerElement from './playerElement.js';

export default function gameElement() {
  const game = createElement('div', { class: 'game' });
  const gameScreen = createElement('div', { class: 'game__screen' });
  const player1 = playerElement(1);
  const player2 = playerElement(2);

  const cards = generateCards();
  cards.forEach((card) => gameScreen.append(card));

  game.append(player1, gameScreen, player2);

  return game;
}
