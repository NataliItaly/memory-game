import createElement from '../utils/createElement.js';

export default function finishGameConfirmModal() {
  const modal = createElement('div', { class: 'modal' });
  const modalContent = createElement('div', { class: 'modal__content' });
  const title = createElement(
    'h3',
    { class: 'modal__title' },
    'Are you sure to finish current game?',
  );

  const buttonsWrapper = createElement('div', { class: 'modal__buttons' });
  const confirmBtn = createElement(
    'button',
    { class: 'btn modal__btn header__init-game-btn', id: 'confirm-btn' },
    'Yes',
  );
  const rejectBtn = createElement(
    'button',
    { class: 'btn modal__close', id: 'reject-btn' },
    'No',
  );

  buttonsWrapper.append(confirmBtn, rejectBtn);
  modalContent.append(title, buttonsWrapper);
  modal.append(modalContent);
  return modal;
}
