import { cardsNumber } from '../states.js';
import createElement from '../utils/createElement.js';

export default function cardElement(i) {
  const cardId = i % (cardsNumber / 2);

  const card = createElement('div', {
    class: 'game__card',
    'data-id': cardId,
  });
  const cardInner = createElement('div', { class: 'card' });
  const cardFront = createElement('div', { class: 'card__front' });
  const cardBack = createElement('div', { class: 'card__back' });

  const img = createElement('img', {
    class: 'card__img',
    src: `./assets/cards/${cardId + 1}.png`,
    alt: `Alien id ${i}`,
  });

  cardBack.append(img);
  cardInner.append(cardFront, cardBack);
  card.append(cardInner);

  return card;
}
