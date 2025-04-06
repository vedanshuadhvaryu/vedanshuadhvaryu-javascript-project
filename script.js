function showTab(id) {
    const tabs = document.querySelectorAll('.section');
    const buttons = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelector(`.tab-button[onclick="showTab('${id}')"]`).classList.add('active');
  }

  setInterval(() => {
    document.getElementById('localTime').textContent = new Date().toLocaleTimeString();
  }, 1000);

  const timezoneSelect = document.getElementById('timezoneSelect');
  timezoneSelect.addEventListener('change', updateWorldTime);

  function updateWorldTime() {
    const tz = timezoneSelect.value;
    const time = new Date().toLocaleTimeString('en-US', { timeZone: tz });
    document.getElementById('worldTime').textContent = time;
  }
  updateWorldTime();
  setInterval(updateWorldTime, 1000);

  let alarmTime = null;
  setInterval(() => {
    if (alarmTime && new Date().toTimeString().slice(0,5) === alarmTime) {
      alert("Alarm Ringing!");
      document.getElementById('alarmStatus').textContent = 'Alarm triggered!';
      alarmTime = null;
    }
  }, 1000);

  function setAlarm() {
    alarmTime = document.getElementById('alarmTime').value;
    document.getElementById('alarmStatus').textContent = `Alarm set for ${alarmTime}`;
  }

  let stopwatchMilliseconds = 0;
  let stopwatchInterval = null;

  function updateStopwatch() {
    let ms = Math.floor(stopwatchMilliseconds % 1000);
    let totalSeconds = Math.floor(stopwatchMilliseconds / 1000);
    let hrs = Math.floor(totalSeconds / 3600);
    let mins = Math.floor((totalSeconds % 3600) / 60);
    let secs = totalSeconds % 60;
    document.getElementById('stopwatchDisplay').textContent = `${pad(hrs)}:${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
  }

  function startStopwatch() {
    if (!stopwatchInterval) {
      let lastUpdate = performance.now();
      stopwatchInterval = setInterval(() => {
        let now = performance.now();
        stopwatchMilliseconds += now - lastUpdate;
        lastUpdate = now;
        updateStopwatch();
      }, 10);
    }
  }

  function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }

  function resetStopwatch() {
    stopStopwatch();
    stopwatchMilliseconds = 0;
    updateStopwatch();
    document.getElementById('stopwatchLaps').innerHTML = '';
  }

  function lapStopwatch() {
    const time = document.getElementById('stopwatchDisplay').textContent;
    const lap = document.createElement('div');
    lap.textContent = time;
    const container = document.getElementById('stopwatchLaps');
    container.insertBefore(lap, container.firstChild);
  }

  let timerInterval = null;
  let timerRemainingMilliseconds = 0;

  function startTimer() {
    let minutes = parseInt(document.getElementById('timerMinutes').value);
    if (isNaN(minutes) || minutes <= 0) return;
    timerRemainingMilliseconds = minutes * 60 * 1000;
    updateTimerDisplay();
    clearInterval(timerInterval);
    let lastUpdate = performance.now();
    timerInterval = setInterval(() => {
      let now = performance.now();
      timerRemainingMilliseconds -= now - lastUpdate;
      lastUpdate = now;
      if (timerRemainingMilliseconds <= 0) {
        clearInterval(timerInterval);
        document.getElementById('timerDisplay').textContent = "Time's up!";
        alert("Timer Done!");
      } else {
        updateTimerDisplay();
      }
    }, 10);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function resetTimer() {
    stopTimer();
    timerRemainingMilliseconds = 0;
    document.getElementById('timerDisplay').textContent = '00:00.000';
    document.getElementById('timerMinutes').value = '';
    document.getElementById('timerLaps').innerHTML = '';
  }

  function lapTimer() {
    const time = document.getElementById('timerDisplay').textContent;
    const lap = document.createElement('div');
    lap.textContent = time;
    const container = document.getElementById('timerLaps');
    container.insertBefore(lap, container.firstChild);
  }

  function updateTimerDisplay() {
    let totalSeconds = Math.floor(timerRemainingMilliseconds / 1000);
    let mins = Math.floor(totalSeconds / 60);
    let secs = totalSeconds % 60;
    let ms = Math.floor(timerRemainingMilliseconds % 1000);
    document.getElementById('timerDisplay').textContent = `${pad(mins)}:${pad(secs)}.${pad(ms, 3)}`;
  }

  function pad(num, size = 2) {
    return num.toString().padStart(size, '0');
  }
