import createElement from './createElement.js';
import shuffleArr from './shuffleArray.js';
import { cardsNumber } from '../states.js';

export default function generateCards() {
  const cardElements = Array.from({ length: cardsNumber }, (_, i) => {
    const cardId = i % (cardsNumber / 2);
    const img = createElement('img', {
      class: 'game__img',
      src: `./assets/cards/${cardId + 1}.png`,
      alt: `Alien id ${i}`,
    });
    const card = createElement('div', {
      class: 'game__card',
      'data-id': cardId,
    });
    card.append(img);
    return card;
  });

  const shuffledElements = shuffleArr(cardElements);
  console.log(shuffledElements);

  return shuffledElements;
}
