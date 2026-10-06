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
import winnerTableElement from './components/winnerTableElement.js';
import setTimeString from './utils/setTimeString.js';
//localStorage.clear();
const containerEl = createElement('div', { class: 'container' });
const headerEl = headerElement();
const gameEl = gameElement();
const videoEl = videoElement();

containerEl.append(headerEl, gameEl.game);
document.body.prepend(videoEl, containerEl);
/*
window.addEventListener('DOMContentLoaded', function () {
  const wasAlreadyLoaded = getIsFirstLoad();
  if (wasAlreadyLoaded) {
    initGame(gameEl);
    setIsFirstLoad();
  } else {
    setGame(gameEl);
  }
}); */

const state = getGameState();

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
  if (e.target.closest('.init-game-btn')) {
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
    //console.log(winnerTableEl);
    document.body.prepend(winnerTableEl);
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

    const gameState = getGameState();

    const currentCardId = currentCard.dataset.id;

    if (currentClick > 0) {
      gameState.currentCouple = [
        ...getGameState().currentCouple,
        currentCardId,
      ];
      gameState.currentClick -= 1;
      //((currentCouple = [...currentCouple, currentCardId]),
      //(currentClick -= 1));
      setGameState({
        currentClick: gameState.currentClick,
        currentCouple: gameState.currentCouple,
      });
      //console.log(getGameState());
    }

    if (gameState.currentClick === 0) {
      // increase steps count
      gameState.steps += 1;
      setGameState({ steps: gameState.steps, currentClick: 2 });
      gameEl.gameSteps.textContent = steps;

      // block all the cards except opened
      const cards = gameEl.gameScreen.querySelectorAll('.game__card');
      cards.forEach((card) => card.classList.add('game__card_blocked'));

      // check if 2 last clicks was successful
      if (gameState.currentCouple[0] === gameState.currentCouple[1]) {
        const currentScore = gameState[currentPlayer].score + 1;
        gameState.couples = [...couples, currentCardId];

        setGameState({
          couples: gameState.couples,
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
      }

      gameState.currentPlayer =
        gameState.currentPlayer === 'player1' ? 'player2' : 'player1';
      setGameState({
        currentPlayer: gameState.currentPlayer,
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

          // set game finished
          gameState.isFinished = true;

          // set final game state
          setGameState({
            currentClick: gameState.currentClick,
            currentCouple: [],
            couples: gameState.couples,
            currentPlayer: gameState.currentPlayer,
            player1: gameState.player1,
            player2: gameState.player2,
            steps: gameState.steps,
            isFinished: gameState.isFinished,
          });

          const winner =
            gameState.player1.score === gameState.player2.score
              ? ''
              : gameState.player1.score > gameState.player2.score
                ? 'player1'
                : 'player2';

          if (winner) {
            document
              .querySelector(`#${winner} .player__step`)
              .classList.add('player__step_active');
          }

          // fix completed game
          const date = new Date();
          const time = setTimeString(date);
          const result = {
            winner,
            score: [player1.score, player2.score],
            time,
            steps,
          };

          // set game finished
          gameState.isFinished = true;

          const allGames = [...gameState.games, result];

          // set final game state
          setGameState({
            isFinished: gameState.isFinished,
            games: allGames,
          });

          // open modal
          setTimeout(function () {
            const modal = winnerModal(winner);
            document.body.prepend(modal);
          }, 600);
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
