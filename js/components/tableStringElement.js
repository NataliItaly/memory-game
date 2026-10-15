import createElement from '../utils/createElement.js';
import getTimerString from '../utils/getTimerString.js';

export default function tableStringElement(obj, i, type = '') {
  const string = createElement('div', { class: 'modal__string' });

  const placeSpan = createElement('span', {}, `${i + 1}`);
  string.append(placeSpan);
  for (let key in obj) {
    if (key !== 'cardsSequence' && key !== 'couples' && key !== 'id') {
      console.log('key, obj[key]', key, obj[key]);
      const spanText = key === 'time' ? getTimerString(obj[key]) : obj[key];
      const span = createElement('span', {}, `${spanText}`);
      string.append(span);
    }
  }

  if (type === 'saved') {
    const resumeSpan = createElement('span', {});
    const resumeBtn = createElement(
      'button',
      {
        class: 'btn modal__span-btn modal__resume-game-btn',
        id: `resume-${obj.id}`,
      },
      'Resume Game',
    );
    resumeSpan.append(resumeBtn);

    const deleteSpan = createElement('span', {});
    const deleteBtn = createElement(
      'button',
      {
        class: 'btn btn_variant modal__span-btn modal__delete-game-btn',
        id: `delete-${obj.id}`,
      },
      'Delete Game',
    );
    deleteSpan.append(deleteBtn);
    string.append(resumeSpan, deleteSpan);
  }

  return string;
}
