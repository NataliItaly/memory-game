import createElement from '../utils/createElement.js';
import { getGameState } from '../states.js';

export default function winnerModal() {
  const state = getGameState();
  const titleText = 'You are win!';

  const modal = createElement('div', { class: 'modal' });
  const modalContent = createElement('div', { class: 'modal__content' });
  const title = createElement('h3', { class: 'modal__title' }, titleText);
  const totalSteps = createElement(
    'div',
    { class: 'modal__steps' },
    `Steps: ${state.steps}`,
  );
  const totalTime = createElement(
    'div',
    { class: 'modal__time' },
    `Steps: ${state.steps}`,
  );

  const buttonsWrapper = createElement('div', { class: 'modal__buttons' });
  const newGameBtn = createElement(
    'button',
    { class: 'btn modal__btn init-game-btn' },
    'New Game',
  );
  const closeBtn = createElement(
    'button',
    { class: 'btn modal__close' },
    'Close',
  );

  buttonsWrapper.append(newGameBtn, closeBtn);
  modalContent.append(title, totalSteps, totalTime, buttonsWrapper);
  modal.append(modalContent);
  return modal;
}
