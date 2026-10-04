export default function createElement(tag, attributes = {}, text) {
  const element = document.createElement(tag);
  for (let attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  if (text) {
    element.textContent = text;
  }

  return element;
}
