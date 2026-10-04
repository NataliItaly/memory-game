import { getGameState } from '../states.js';

export default function setGame() {
  const state = getGameState();
  const player1El = document.getElementById('player1');
  const player2El = document.getElementById('player2');
  [player1El, player2El].forEach((player) => {
    player.querySelector('.player__step').textContent = state[player.id].score;

    state.currentPlayer === player.id
      ? player.classList.add('player_active')
      : player.classList.remove('player_active');
  });

  const cards = document.querySelectorAll('.game__card');
  cards.forEach(
    (card) =>
      state.couples.includes(card.dataset.id) &&
      card.classList.add('game__card_open'),
  );
}
