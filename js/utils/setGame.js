import { getGameState } from '../states.js';
import generateCards from './generateCards.js';
import shuffleArr from './shuffleArray.js';

export default function setGame(game) {
  console.log('game', game);
  const state = getGameState();
  const player1El = game.player1;
  const player2El = game.player2;
  [player1El, player2El].forEach((player) => {
    player.querySelector('.player__step').textContent = state[player.id].score;

    state.currentPlayer === player.id
      ? player.classList.add('player_active')
      : player.classList.remove('player_active');
  });

  const steps = game.gameSteps;
  steps.textContent = state.steps;

  const gameScreen = game.gameScreen;
  const cards = gameScreen.querySelectorAll('.game__card');
  console.log('isFinished', state.isFinished);
  if (state.isFinished) {
    // shuffle existing cards
    const shuffledCards = shuffleArr([...cards]);
    console.log('shuffled cards', shuffledCards);
    shuffledCards.forEach((card) => {
      card.classList.remove(
        'game__card_rotate',
        'game__card_open',
        'game__card_block',
      );
      gameScreen.append(card);
    });
  } else {
    // display cards that was already opened
    cards.forEach(
      (card) =>
        state.couples.includes(card.dataset.id) &&
        card.classList.add('game__card_open'),
    );
  }
}
