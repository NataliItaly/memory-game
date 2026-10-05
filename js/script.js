import createElement from './utils/createElement.js';
import videoElement from './components/videoElement.js';
import gameElement from './components/gameElement.js';
import headerElement from './components/headerElement.js';
import { getIsFirstLoad, setIsFirstLoad } from './states.js';
import { getGameState, resetGameState, setGameState } from './states.js';
import playAudio from './utils/playAudio.js';
import winnerModal from './components/winnerModal.js';
import closeModal from './utils/closeModal.js';
import setGame from './utils/setGame.js';
import initGame from './utils/initGame.js';

const containerEl = createElement('div', { class: 'container' });
const headerEl = headerElement();
const gameEl = gameElement();
const videoEl = videoElement();

containerEl.append(headerEl, gameEl.game);
document.body.prepend(videoEl, containerEl);

window.addEventListener('DOMContentLoaded', function () {
  const wasAlreadyLoaded = getIsFirstLoad();
  if (wasAlreadyLoaded) {
    initGame(gameEl);
    setIsFirstLoad();
  } else {
    setGame(gameEl);
  }
});

window.addEventListener('click', function (e) {
  if (e.target.closest('.init-game-btn')) {
    closeModal();
    initGame(gameEl);
  }

  if (e.target.closest('.modal__close')) {
    closeModal();
  }

  if (e.target.closest('.game__card')) {
    const currentCard = e.target.closest('.game__card');
    currentCard.classList.add('game__card_rotate');

    const players = document.querySelectorAll('.player');

    let {
      currentClick,
      currentCouple,
      couples,
      currentPlayer,
      player1,
      player2,
      steps,
      isFinished,
      games,
    } = getGameState();

    const currentCardId = currentCard.dataset.id;

    if (currentClick > 0) {
      //currentCouple.push(currentCardId);
      ((currentCouple = [...currentCouple, currentCardId]),
        (currentClick -= 1));
      setGameState({
        currentClick,
        currentCouple,
      });
      console.log(getGameState());
    }

    if (currentClick === 0) {
      // increase steps count
      steps += 1;
      setGameState({ steps, currentClick: 2 });
      gameEl.gameSteps.textContent = steps;

      // block all the cards except opened
      const cards = gameEl.gameScreen.querySelectorAll('.game__card');
      cards.forEach((card) => card.classList.add('game__card_blocked'));

      // check if 2 last clicks was successful
      if (currentCouple[0] === currentCouple[1]) {
        const currentScore = getGameState()[currentPlayer].score + 1;
        console.log('currentScore', currentScore);
        couples = [...couples, currentCardId];

        setGameState({
          couples,
          [currentPlayer]: { score: currentScore },
        });

        // set guessed card as open
        const openCards = gameEl.gameScreen.querySelectorAll(
          `.game__card[data-id="${currentCouple[0]}"]`,
        );
        openCards.forEach((card) => {
          card.classList.remove('game__card_rotate');
          card.classList.add('game__card_open');
        });

        // set score
        const currentStepElement = document.querySelector(
          `#${currentPlayer} .player__step`,
        );

        currentStepElement.textContent = currentScore;
        currentStepElement.classList.add('player__step_active');
        playAudio('./assets/score-sound.mp3');

        setTimeout(function () {
          currentStepElement.classList.remove('player__step_active');
        }, 2000);
        console.log(getGameState());
      }

      currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
      setGameState({
        currentPlayer,
      });

      // set cards backwards and change player
      setTimeout(function () {
        // check if all cards are open
        if (
          Array.from(cards).every((card) =>
            card.classList.contains('game__card_open'),
          )
        ) {
          players.forEach((player) => player.classList.remove('player_active'));

          const winner =
            player1.score === player2.score
              ? ''
              : player1.score > player2.score
                ? 'player1'
                : 'player2';
          if (winner) {
            document
              .querySelector(`#${winner} .player__step`)
              .classList.add('player__step_active');
          }

          // fix completed game
          const result = {
            winner,
            score: [player1.score, player2.score],
          };
          // set game finished
          isFinished = true;

          // set final game state
          setGameState({
            currentClick,
            currentCouple: [],
            couples,
            currentPlayer,
            player1,
            player2,
            steps,
            isFinished,
            games: [...games, result],
          });

          // open modal
          setTimeout(function () {
            const modal = winnerModal(winner);
            document.body.prepend(modal);
          }, 1000);
        } else {
          cards.forEach((card) => {
            card.classList.remove('game__card_rotate', 'game__card_blocked');
          });

          players.forEach((player) => player.classList.toggle('player_active'));
        }
      }, 1500);

      setGameState({ currentClick: 2, currentCouple: [] });
    }
  }
});
