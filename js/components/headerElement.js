import createElement from '../utils/createElement.js';

export default function headerElement() {
  const header = createElement('header', { class: 'header' });
  const headerUpper = createElement('div', { class: 'header__upper' });
  const headerLow = createElement('div', { class: 'header__low' });

  const title = createElement('h1', { class: 'header__title' }, 'Memory Game');

  const newGameBtn = createElement(
    'button',
    { class: 'btn header__btn header__init-game-btn' },
    'New Game',
  );

  const scoreBtn = createElement(
    'button',
    { class: 'btn header__score_btn', id: 'score-table-btn' },
    'Winners table',
  );

  const savedGamesBtn = createElement(
    'button',
    { class: 'btn header__saved-games_btn', id: 'saved-table-btn' },
    'Saved Games',
  );

  const pauseGameBtn = createElement(
    'button',
    { class: 'btn header__pause-games_btn', id: 'pause-game-btn' },
    'Pause Game',
  );

  const stopGameBtn = createElement(
    'button',
    { class: 'btn header__finish-games_btn', id: 'finish-game-btn' },
    'Finish Game',
  );

  headerUpper.append(title, scoreBtn, savedGamesBtn);
  headerLow.append(newGameBtn, pauseGameBtn, stopGameBtn);
  header.append(headerUpper, headerLow);
  return header;
}
