import createElement from '../utils/createElement.js';
import { getGameState } from '../states.js';

export default function savedGamesModal() {
  const state = getGameState();
  const savedGames = state.games;

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
  const subtitle = createElement('p', { class: 'modal__subtitle' }, scoreText);
  const totalSteps = createElement(
    'div',
    { class: 'modal__steps' },
    `Steps: ${state.steps}`,
  );

  const buttonsWrapper = createElement('div', { class: 'modal__buttons' });
  const newGameBtn = createElement(
    'button',
    { class: 'btn modal__btn header__init-game-btn' },
    'New Game',
  );
  const closeBtn = createElement(
    'button',
    { class: 'btn modal__close' },
    'Close',
  );
  buttonsWrapper.append(newGameBtn, closeBtn);

  if (savedGames <= 0) {
    modalContent.append(title, message, buttonsWrapper);
  } else {
    modalContent.append(title, subtitle, totalSteps, buttonsWrapper);
  }

  modal.append(modalContent);
  return modal;
}
