import createElement from './createElement.js';
import shuffleArr from './shuffleArray.js';
import { cardsNumber, setGameState } from '../states.js';
import cardElement from '../components/cardElement.js';

export default function generateCards() {
  const cardElements = Array.from({ length: cardsNumber }, (_, i) => {
    const cardId = (i % (cardsNumber / 2)) + 1;
    const cardEl = cardElement(cardId);
    return cardEl;
  });
  const shuffledElements = shuffleArr(cardElements);

  // save shuffled elements to the game state
  const currentSequence = shuffledElements.map((card) => card.dataset.id);
  setGameState({ cardsSequence: currentSequence });

  return shuffledElements;
}
