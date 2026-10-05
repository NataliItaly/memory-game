export default function winnerTableElement() {
  const modal = createElement('div', { class: 'modal' });
  const modalContent = createElement('div', { class: 'modal__content' });
  const title = createElement('h3', { class: 'modal__title' }, titleText);
  const subtitle = createElement('p', { class: 'modal__subtitle' }, scoreText);
  const totalSteps = createElement(
    'div',
    { class: 'modal__steps' },
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
  modalContent.append(title, subtitle, totalSteps, buttonsWrapper);
  modal.append(modalContent);
  return modal;
}
