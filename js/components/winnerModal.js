import createElement from '../utils/createElement.js';
import { getGameState } from '../states.js';

export default function winnerModal(winner) {
  const state = getGameState();

  const modal = createElement('div', { class: 'modal' });
  const modalContent = createElement('div', { class: 'modal__content' });
  const title = createElement(
    'h3',
    { class: 'modal__title' },
    `The winner is ${winner.toUpperCase()}`,
  );
  const subtitle = createElement(
    'p',
    { class: 'modal__subtitle' },
    `Score: ${state[winner].score}`,
  );
  const totalSteps = createElement(
    'div',
    { class: 'modal__steps' },
    `Steps: ${state.steps}`,
  );

  const buttonsWrapper = createElement('div', { class: 'modal__buttons' });
  const newGameBtn = createElement(
    'button',
    { class: 'btn modal__btn' },
    'New Game',
  );
  const closeBtn = createElement(
    'button',
    { class: 'btn modal__close' },
    'Close',
  );

  buttonsWrapper.append(newGameBtn, closeBtn);
  modalContent.append(title, subtitle, totalSteps, buttonsWrapper);
  modal.append(modalContent);
  return modal;
}
