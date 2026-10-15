import createElement from '../utils/createElement.js';

export default function tableHeaderEl(obj) {
  const header = createElement('div', { class: 'modal__table-header' });
  const num = createElement(
    'span',
    {
      class: 'modal__table-header-span',
    },
    'N',
  );
  header.append(num);

  for (const key in obj) {
    if (key !== 'cardsSequence' && key !== 'couples' && key !== 'id') {
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

  const action = createElement('span', {
    class: 'modal__table-header-span',
  });
  header.append(action);

  return header;
}
