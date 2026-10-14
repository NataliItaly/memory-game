import createElement from './utils/createElement.js';
import videoElement from './components/videoElement.js';
import gameElement from './components/gameElement.js';
import headerElement from './components/headerElement.js';
import { getGameState, resetGameState, setGameState } from './states.js';
import playAudio from './utils/playAudio.js';
import winnerModal from './components/winnerModal.js';
import closeModal from './utils/closeModal.js';
import setGame from './utils/setGame.js';
import initGame from './utils/initGame.js';
import winnerTableElement from './components/winnerTableElement.js';
import setTimeString from './utils/setTimeString.js';
import { startTimer, stopTimer } from './utils/timer.js';
import generateCards from './utils/generateCards.js';
import finishGameConfirmModal from './components/finishGameConfirmModal.js';
import pauseGameConfirmModal from './components/pauseGameConfirmModal.js';
import savedGamesModal from './components/savedGamesModal.js';

const containerEl = createElement('div', { class: 'container' });
const headerEl = headerElement();
const gameEl = gameElement();
const videoEl = videoElement();

containerEl.append(headerEl, gameEl.game);
document.body.prepend(videoEl, containerEl);

const state = getGameState();
console.log('initial sequence', state.cardsSequence);
if (state.cardsSequence.length > 0) {
  setGame(gameEl);

  if (state.isPlaying) {
    startTimer(gameEl);
  }
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

  if (e.target.closest('#pause-game-btn')) {
    const confirmModal = pauseGameConfirmModal();
    document.body.prepend(confirmModal);
    const currentState = getGameState();
    console.log('current state when press pause', currentState);
    const couples = [...currentState.couples];
    const cardsSequence = [...currentState.cardsSequence];
    console.log('couples', couples);
    console.log('cardsSequence', cardsSequence);
  }

  if (e.target.closest('#confirm-pause-btn')) {
    const currentState = getGameState();
    console.log('current state', currentState);
    const couples = [...currentState.couples];
    const cardsSequence = [...currentState.cardsSequence];
    const score = currentState.score;
    const steps = currentState.steps;
    const time = currentState.time;
    console.log('couples', couples);
    console.log('cardsSequence', cardsSequence);

    const gameForSave = {
      couples,
      cardsSequence,
      score,
      steps,
      time,
    };
    console.log('gameForSave', gameForSave);
    stopTimer();

    // defensive check if localStorage doesn't have savedGames property
    const savedGames = Array.isArray(currentState.savedGames)
      ? currentState.savedGames
      : [];

    setGameState({ savedGames: [...savedGames, gameForSave] });
    resetGameState();

    // display screen with new cards sequence for a new game
    generateCards();
    setGame(gameEl);
    closeModal();
  }

  if (e.target.closest('#saved-table-btn')) {
    const savedTableEl = savedGamesModal();
    document.body.prepend(savedTableEl);
  }

  if (e.target.closest('#finish-game-btn')) {
    const confirmModal = finishGameConfirmModal();
    document.body.prepend(confirmModal);
  }

  if (e.target.closest('#confirm-btn')) {
    stopTimer();
    resetGameState();
    generateCards();
    setGame(gameEl);
  }

  if (e.target.closest('.game__card')) {
    const currentState = getGameState();
    console.log('sequence after click on card', getGameState().cardsSequence);
    // check if it's first turned card
    if (
      currentState.currentCouple.length === 0 &&
      currentState.steps === 0 &&
      currentState.isPlaying === false
    ) {
      setGameState({ isPlaying: true });
      startTimer(gameEl);
    }

    const currentCard = e.target.closest('.game__card');
    currentCard.classList.add('game__card_rotate');

    const currentCardId = currentCard.dataset.id;

    if (currentState.currentClick > 0) {
      currentState.currentCouple = [
        ...getGameState().currentCouple,
        currentCardId,
      ];
      currentState.currentClick -= 1;

      setGameState({
        currentClick: currentState.currentClick,
        currentCouple: currentState.currentCouple,
      });
    }

    if (currentState.currentClick === 0) {
      // increase steps count
      currentState.steps += 1;
      setGameState({ steps: currentState.steps, currentClick: 2 });
      gameEl.gameSteps.textContent = currentState.steps;

      // block all the cards except opened
      const cards = gameEl.gameScreen.querySelectorAll('.game__card');
      cards.forEach((card) => card.classList.add('game__card_blocked'));

      // check if 2 last clicks was successful
      if (currentState.currentCouple[0] === state.currentCouple[1]) {
        const currentScore = currentState.score + 1;
        currentState.couples = [...currentState.couples, currentCardId];

        setGameState({
          couples: currentState.couples,
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
          currentState.isFinished = true;
          stopTimer();

          // fix completed game
          const date = new Date();
          const time = setTimeString(date);
          const result = {
            time,
            steps: currentState.steps,
          };

          // set game finished
          currentState.isFinished = true;

          const allGames = [...currentState.games, result];

          // set final game state
          setGameState({
            currentClick: state.currentClick,
            currentCouple: [],
            couples: currentState.couples,
            steps: currentState.steps,
            score: currentState.score,
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
