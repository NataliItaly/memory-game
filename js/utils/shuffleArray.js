import { getGameState, setGameState } from '../states.js';

export default function shuffleArr(arr) {
  const copy = arr.map((el) => el.cloneNode(true));

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}
