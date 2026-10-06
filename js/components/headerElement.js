import createElement from '../utils/createElement.js';

export default function headerElement() {
  const header = createElement('div', { class: 'header' });

  const title = createElement('h1', { class: 'header__title' }, 'Memory Game');

  const newGameBtn = createElement(
    'button',
    { class: 'btn header__btn init-game-btn' },
    'New Game',
  );

  const scoreBtn = createElement(
    'button',
    { class: 'btn header__score_btn', id: 'score-table' },
    'Winners table',
  );

  header.append(newGameBtn, title, scoreBtn);
  return header;
}
