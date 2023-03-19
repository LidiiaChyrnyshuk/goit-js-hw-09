const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startBtnEl.addEventListener('click', handleStartChangeColorClick);
stopBtnEl.addEventListener('click', handleStopChangeColorClick);
let timerId = null;
stopBtnEl.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function handleStartChangeColorClick(evt) {
  evt.target.disabled = true;
  stopBtnEl.removeAttribute('disabled');
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handleStopChangeColorClick(evt) {
  evt.target.disabled = true;
  startBtnEl.removeAttribute('disabled');

  clearInterval(timerId);
}
