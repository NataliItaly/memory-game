import createElement from './createElement.js';
import shuffleArr from './shuffleArray.js';
import { cardsNumber } from '../states.js';
import cardElement from '../components/cardElement.js';

export default function generateCards() {
  const cardElements = Array.from({ length: cardsNumber }, (_, i) => {
    const cardEl = cardElement(i);
    return cardEl;
  });

  const shuffledElements = shuffleArr(cardElements);

  return shuffledElements;
}
