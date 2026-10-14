import createElement from '../utils/createElement.js';

export default function tableHeaderEl(obj) {
  const header = createElement('div', { class: 'modal__table-header' });
  for (const key in obj) {
    if (key !== 'cardsSequence' && key !== 'couples') {
      const span = createElement(
        'span',
        {
          class: 'modal__table-header-span',
        },
        key,
      );
      header.append(span);
    }
  }

  return header;
}
