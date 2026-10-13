import createElement from './utils/createElement.js';
import videoElement from './components/videoElement.js';
import gameElement from './components/gameElement.js';
import headerElement from './components/headerElement.js';
import { getGameState, setGameState } from './states.js';
import playAudio from './utils/playAudio.js';
import winnerModal from './components/winnerModal.js';
import closeModal from './utils/closeModal.js';
import setGame from './utils/setGame.js';
import initGame from './utils/initGame.js';
import winnerTableElement from './components/winnerTableElement.js';
import setTimeString from './utils/setTimeString.js';
import { startTimer, stopTimer } from './utils/timer.js';

const containerEl = createElement('div', { class: 'container' });
const headerEl = headerElement();
const gameEl = gameElement();
const videoEl = videoElement();
console.log(gameEl);
containerEl.append(headerEl, gameEl.game);
document.body.prepend(videoEl, containerEl);

const state = getGameState();
console.log(state.cardsSequence);
if (state.cardsSequence.length > 0) {
  setGame(gameEl);
} else {
  initGame(gameEl);
}

window.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

window.addEventListener('click', function (e) {
  if (e.target.closest('.header__init-game-btn')) {
    closeModal();
    initGame(gameEl);
  }

  if (e.target.closest('.modal__close')) {
    closeModal();
  }

  if (
    e.target.classList.contains('modal') &&
    !e.target.classList.contains('modal__content')
  ) {
    closeModal();
  }

  if (e.target.closest('.header__score_btn')) {
    const winnerTableEl = winnerTableElement();
    document.body.prepend(winnerTableEl);
  }

  if (e.target.closest('.game__card')) {
    // check if it's first turned card
    if (
      state.currentCouple.length === 0 &&
      state.steps === 0 &&
      state.isPlaying === false
    ) {
      setGameState({ isPlaying: true });
      startTimer(gameEl);
    }

    const currentCard = e.target.closest('.game__card');
    currentCard.classList.add('game__card_rotate');

    const currentCardId = currentCard.dataset.id;

    if (state.currentClick > 0) {
      state.currentCouple = [...getGameState().currentCouple, currentCardId];
      state.currentClick -= 1;

      setGameState({
        currentClick: state.currentClick,
        currentCouple: state.currentCouple,
      });
    }

    if (state.currentClick === 0) {
      // increase steps count
      state.steps += 1;
      setGameState({ steps: state.steps, currentClick: 2 });
      gameEl.gameSteps.textContent = state.steps;

      // block all the cards except opened
      const cards = gameEl.gameScreen.querySelectorAll('.game__card');
      cards.forEach((card) => card.classList.add('game__card_blocked'));

      // check if 2 last clicks was successful
      if (state.currentCouple[0] === state.currentCouple[1]) {
        const currentScore = state.score + 1;
        state.couples = [...state.couples, currentCardId];

        setGameState({
          couples: state.couples,
          score: currentScore,
        });

        // set guessed card as open
        const openCards = gameEl.gameScreen.querySelectorAll(
          `.game__card[data-id="${state.currentCouple[0]}"]`,
        );
        openCards.forEach((card) => {
          card.classList.remove('game__card_rotate');
          card.classList.add('game__card_open');
        });

        gameEl.currentResult.textContent = currentScore;
        gameEl.currentResult.classList.add('player__step_active');
        playAudio('./assets/score-sound.mp3');

        setTimeout(function () {
          gameEl.currentResult.classList.remove('player__step_active');
        }, 2000);
      } else {
        playAudio('./assets/fail-sound.mp3');
      }

      // set cards backwards
      setTimeout(function () {
        // check if all cards are open
        if (
          Array.from(cards).every((card) =>
            card.classList.contains('game__card_open'),
          )
        ) {
          // set game finished
          state.isFinished = true;
          stopTimer();

          // fix completed game
          const date = new Date();
          const time = setTimeString(date);
          const result = {
            time,
            steps: state.steps,
          };

          // set game finished
          state.isFinished = true;

          const allGames = [...state.games, result];

          // set final game state
          setGameState({
            currentClick: state.currentClick,
            currentCouple: [],
            couples: state.couples,
            steps: state.steps,
            score: state.score,
            isFinished: true,
            games: allGames,
            isPlaying: false,
          });

          // open modal
          setTimeout(function () {
            const modal = winnerModal();
            document.body.prepend(modal);
          }, 600);
        } else {
          cards.forEach((card) => {
            card.classList.remove('game__card_rotate', 'game__card_blocked');
          });
        }
      }, 1500);

      setGameState({ currentClick: 2, currentCouple: [] });
    }
  }
});
