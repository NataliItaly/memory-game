import createElement from '../utils/createElement.js';
import { getGameState } from '../states.js';
import tableStringElement from './tableStringElement.js';
import tableHeaderEl from './tableHeaderEl.js';

export default function savedGamesModal() {
  const state = getGameState();
  const savedGames = state.savedGames;

  const modal = createElement('div', { class: 'modal' });
  const modalContent = createElement('div', { class: 'modal__content' });
  const title = createElement(
    'h3',
    { class: 'modal__title' },
    'Your saved games',
  );

  const message = createElement(
    'div',
    { class: 'modal__message' },
    "You don't have any saved games yet",
  );

  const gamesTable = createElement('div', { class: 'modal__table' });
  const header = tableHeaderEl(savedGames[0]);
  gamesTable.append(header);
  savedGames.forEach((game, i) =>
    gamesTable.append(tableStringElement(game, i)),
  );

  const buttonsWrapper = createElement('div', { class: 'modal__buttons' });
  const closeBtn = createElement(
    'button',
    { class: 'btn modal__close' },
    'Close',
  );
  buttonsWrapper.append(closeBtn);

  if (savedGames <= 0) {
    modalContent.append(title, message, buttonsWrapper);
  } else {
    modalContent.append(title, gamesTable, buttonsWrapper);
  }

  modal.append(modalContent);
  return modal;
}
