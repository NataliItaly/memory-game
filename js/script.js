import createElement from './utils/createElement.js';
import videoElement from './components/videoElement.js';
import gameElement from './components/gameElement.js';
import { cardsNumber } from './states.js';
import generateCards from './utils/generateCards.js';
import { getGameState, setGameState } from './states.js';

const container = createElement('div', { class: 'container' });
const gameEl = gameElement();
const videoEl = videoElement();

container.append(gameEl);
document.body.prepend(container, videoEl);

window.addEventListener('click', function (e) {
  if (e.target.closest('.game__card')) {
    const currentCard = e.target.closest('.game__card');
    currentCard.classList.add('game__card_rotate');

    const players = document.querySelectorAll('.player');

    const currentGameState = getGameState();
    if (currentGameState.currentClick > 0) {
      const currentCardId = currentCard.dataset.id;
      //console.log(currentCardId);
      //console.log('click on begin', currentGameState.currentClick);

      currentGameState.currentCouple.push(currentCardId);

      currentGameState.currentClick -= 1;
      if (currentGameState.currentClick === 0) {
        // check if 2 last clicks was successful
        if (
          currentGameState.currentCouple[0] ===
          currentGameState.currentCouple[1]
        ) {
          console.log(currentGameState.currentPlayer);
          currentGameState[currentGameState.currentPlayer].score += 1;

          // set guessed card as open
          const openCards = document.querySelectorAll(
            `.game__card[data-id="${currentGameState.currentCouple[0]}"]`,
          );
          console.log(openCards);
          openCards.forEach((card) => {
            card.classList.remove('game__card_rotate');
            card.classList.add('game__card_open');
          });

          const currentStepElement = document.querySelector(
            `#${currentGameState.currentPlayer} .player__step`,
          );
          console.log(currentStepElement);
          currentStepElement.textContent =
            currentGameState[currentGameState.currentPlayer].score;
          currentStepElement.classList.add('player__step_active');

          setTimeout(function () {
            currentStepElement.classList.remove('player__step_active');
          }, 500);
        }

        currentGameState.currentCouple = [];

        currentGameState.currentPlayer =
          currentGameState.currentPlayer === 'player1' ? 'player2' : 'player1';

        setTimeout(function () {
          const cards = document.querySelectorAll('.game__card');
          cards.forEach((card) => card.classList.remove('game__card_rotate'));
          players.forEach((player) => player.classList.toggle('player_active'));
        }, 1000);

        currentGameState.currentClick = 2;
      }

      console.log('game', currentGameState);
    } else {
      currentGameState.currentClick = 2;
    }
  }
});
