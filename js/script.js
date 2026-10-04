import createElement from './utils/createElement.js';
import videoElement from './components/videoElement.js';
import gameElement from './components/gameElement.js';
import { cardsNumber } from './states.js';
import generateCards from './utils/generateCards.js';
import { getGameState, setGameState } from './states.js';
import playAudio from './utils/playAudio.js';
import winnerModal from './components/winnerModal.js';

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
    currentGameState.steps += 1;
    if (currentGameState.currentClick > 0) {
      const currentCardId = currentCard.dataset.id;

      currentGameState.currentCouple.push(currentCardId);

      currentGameState.currentClick -= 1;
      if (currentGameState.currentClick === 0) {
        // block all the cards except opened
        const cards = document.querySelectorAll('.game__card');
        cards.forEach((card) => card.classList.add('game__card_blocked'));

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

          openCards.forEach((card) => {
            card.classList.remove('game__card_rotate');
            card.classList.add('game__card_open');
          });

          // set score
          const currentStepElement = document.querySelector(
            `#${currentGameState.currentPlayer} .player__step`,
          );

          currentStepElement.textContent =
            currentGameState[currentGameState.currentPlayer].score;
          currentStepElement.classList.add('player__step_active');
          playAudio('./assets/score-sound.mp3');

          setTimeout(function () {
            currentStepElement.classList.remove('player__step_active');
          }, 2000);
        }

        currentGameState.currentCouple = [];

        currentGameState.currentPlayer =
          currentGameState.currentPlayer === 'player1' ? 'player2' : 'player1';

        // set cards backwards and change player
        setTimeout(function () {
          // check if all cards are open
          if (
            Array.from(cards).every((card) =>
              card.classList.contains('game__card_open'),
            )
          ) {
            players.forEach((player) =>
              player.classList.remove('player_active'),
            );

            const winner =
              currentGameState.player1.score > currentGameState.player2.score
                ? 'player1'
                : 'player2';
            document
              .querySelector(`#${winner} .player__step`)
              .classList.add('player__step_active');

            // open modal
            setTimeout(function () {
              const modal = winnerModal(winner);
              document.body.append(modal);
            }, 1000);
          } else {
            cards.forEach((card) => {
              card.classList.remove('game__card_rotate');
              card.classList.remove('game__card_blocked');
            });

            players.forEach((player) =>
              player.classList.toggle('player_active'),
            );
          }
        }, 1500);

        currentGameState.currentClick = 2;
      }

      console.log('game', currentGameState);
    } else {
      currentGameState.currentClick = 2;
    }
  }
});
