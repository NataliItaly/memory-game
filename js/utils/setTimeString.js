export default function setTimeString(date) {
  console.log(date);

  const formated = date.toLocaleDateString('en-US').split('T')[0].split('/');
  console.log(formated);
  return [formated[1], formated[0], formated[2]].join('.');
}
