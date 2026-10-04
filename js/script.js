import createElement from './utils/createElement.js';
import videoElement from './components/videoElement.js';
import { cardsNumber } from './states.js';
import generateCards from './utils/generateCards.js';
const container = createElement('div', { class: 'container' });

const videoEl = videoElement();
const game = createElement('div', { class: 'game' });
container.append(game);

const cards = generateCards();
cards.forEach((card) => game.append(card));

document.body.prepend(container, videoEl);

window.addEventListener('click', function (e) {
  if (e.target.closest('.game__card')) {
    const currentCard = e.target.closest('.game__card');
    //const card = currentCard.querySelector('.game__card');
    currentCard.classList.add('game__card_rotate');
    //console.log(card);
  }
});
