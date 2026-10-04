import createElement from '../utils/createElement.js';

export default function playerElement(index) {
  const player = createElement('div', {
    class: `player ${index === 1 ? 'player_active' : ''}`,
    id: `player${index}`,
  });

  const playerTitle = createElement(
    'h2',
    { class: 'player__title' },
    `Player ${index}`,
  );

  const step = createElement('div', { class: 'player__step' }, '0');

  player.append(playerTitle, step);

  return player;
}
