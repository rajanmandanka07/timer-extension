document.getElementById("startBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: 'start' });
  });
  
  document.getElementById("stopBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: 'stop' });
  });
  
  document.getElementById("resetBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: 'reset' });
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'update') {
      document.querySelector(".stopwatch").innerText = request.time;
    }
  });
  
