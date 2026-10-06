import createElement from '../utils/createElement.js';

export default function tableStringElement(obj, i) {
  const string = createElement('div', { class: 'modal__string' });

  const dateSpan = createElement('span', {}, i);
  string.append(dateSpan);
  for (let key in obj) {
    const span = createElement('span', {}, obj[key]);
    string.append(span);
  }

  return string;
}
