import createElement from '../utils/createElement.js';
import { getGameState } from '../states.js';
import tableStringElement from './tableStringElement.js';

export default function winnerTableElement() {
  const games = getGameState().games;
  const table = createElement('div', { class: 'modal modal_table' });
  const tableContent = createElement('div', { class: 'modal__content' });
  const title = createElement('h3', { class: 'modal__title' }, 'Winners');
  const tableText = createElement('div', { class: 'modal__text' });
  games.forEach((game) => tableText.append(tableStringElement()));

  const buttonsWrapper = createElement('div', { class: 'modal__buttons' });
  const closeBtn = createElement(
    'button',
    { class: 'btn modal__close' },
    'Close',
  );

  buttonsWrapper.append(closeBtn);
  tableContent.append(title, tableText, buttonsWrapper);
  table.append(tableContent);

  return table;
}
