import { getGameState, resetGameState, setGameState } from '../states.js';
import shuffleArr from './shuffleArray.js';
import cardElement from '../components/cardElement.js';

export default function setGame(game) {
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

  if (state.cardsSequence.length > 0) {
    console.log(
      'from set cards state.isFinished === false - the game in progress',
    );

    // display cards that was already opened
    cards.forEach((card) => {
      card.remove();
    });

    state.cardsSequence.forEach((el) => {
      const cardEl = cardElement(el);

      if (state.couples.includes(cardEl.dataset.id)) {
        cardEl.classList.add('game__card_open');
      }
      game.gameScreen.append(cardEl);
    });
  }
}
