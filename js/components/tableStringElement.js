import createElement from '../utils/createElement.js';

export default function tableStringElement(obj, i) {
  const string = createElement('div', { class: 'modal__string' });

  const placeSpan = createElement('span', {}, `${i + 1}`);
  string.append(placeSpan);
  for (let key in obj) {
    if (obj[key] === '') obj[key] = 'Draw';
    const span = createElement('span', {}, obj[key]);
    string.append(span);
  }

  return string;
}
