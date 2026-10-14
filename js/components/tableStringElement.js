import createElement from '../utils/createElement.js';
import getTimerString from '../utils/getTimerString.js';

export default function tableStringElement(obj, i) {
  const string = createElement('div', { class: 'modal__string' });

  const placeSpan = createElement('span', {}, `${i + 1}`);
  string.append(placeSpan);
  for (let key in obj) {
    if (key !== 'cardsSequence' && key !== 'couples') {
      console.log('key', key);
      const spanText = key === 'time' ? getTimerString(obj[key]) : obj[key];
      const span = createElement('span', {}, `${spanText}`);
      string.append(span);
    }
  }

  return string;
}
