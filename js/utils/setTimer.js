export default function setTimer(timestamp) {
  return `${String(Math.floor(timestamp / 60)).padStart(2, '0')} : ${String(timestamp % 60).padStart(2, '0')}`;
}
