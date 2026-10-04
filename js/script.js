import createElement from './utils/createElement.js';
import { cardsNumber } from './states.js';
import generateCards from './utils/generateCards.js';
const container = createElement('div', { class: 'container' });
document.body.prepend(container);
const game = createElement('div', { class: 'game' });
container.append(game);

const cards = generateCards();
cards.forEach((card) => game.append(card));
