let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function startTimer() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updatePopup();
    }, 10);
    isRunning = true;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updatePopup();
  isRunning = false;
}

function updatePopup() {
  chrome.runtime.sendMessage({ type: 'update', time: formatTime(elapsedTime) });
}

function formatTime(time) {
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = Math.floor(time % 1000);

  return (
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + ":" +
    (milliseconds < 100 ? "0" : "") + (milliseconds < 10 ? "0" : "") + milliseconds
  );
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'start') {
    startTimer();
  } else if (request.type === 'stop') {
    stopTimer();
  } else if (request.type === 'reset') {
    resetTimer();
  }
});
