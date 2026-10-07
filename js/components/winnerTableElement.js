import createElement from '../utils/createElement.js';
import { getGameState } from '../states.js';
import tableStringElement from './tableStringElement.js';

export default function winnerTableElement() {
  const games = getGameState().games;
  const sortedGames = [...games]
    .map((game) => structuredClone(game))
    .sort((a, b) => a.steps - b.steps);
  console.log(sortedGames);

  const info = createElement(
    'div',
    { class: 'modal__info' },
    'There are no winners yet',
  );
  const table = createElement('div', { class: 'modal modal_table' });
  const tableContent = createElement('div', {
    class: 'modal__content modal__content_table',
  });
  const title = createElement('h3', { class: 'modal__title' }, 'Winners');
  const tableText = createElement('div', { class: 'modal__text' });

  sortedGames
    .slice(0, 10)
    .forEach((game, i) => tableText.append(tableStringElement(game, i)));

  const buttonsWrapper = createElement('div', { class: 'modal__buttons' });
  const closeBtn = createElement(
    'button',
    { class: 'btn modal__close' },
    'Close',
  );

  buttonsWrapper.append(closeBtn);

  if (games.length === 0) {
    tableContent.append(info, buttonsWrapper);
  } else {
    tableContent.append(title, tableText, buttonsWrapper);
  }
  table.append(tableContent);

  return table;
}
