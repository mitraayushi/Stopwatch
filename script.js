let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let lapCount = 0;
let timerStarted = false;

const timeDisplay = document.querySelector('.time');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.querySelector('.lapList');

function startTimer() {
    timer = setInterval(updateTime, 10); // Update every 10 milliseconds
    startBtn.disabled = true;
    timerStarted = true;
}

function stopTimer() {
    clearInterval(timer);
    startBtn.disabled = false;
}

function resetTimer() {
    clearInterval(timer);
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    lapCount = 0;
    updateTime();
    startBtn.disabled = false;
    lapList.innerHTML = '';
    timerStarted = false;
}

function lapTimer() {
    if (!timerStarted) {
        alert("Start the timer first!");
        return;
    }
    lapCount++;
    const lapTime = timeDisplay.textContent;
    const lapItem = document.createElement('li');
    lapItem.classList.add('lapItem');
    lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
    lapList.appendChild(lapItem);
}

function updateTime() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
    }
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    if (minutes === 60) {
        minutes = 0;
        hours++;
    }
    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
    timeDisplay.textContent = formattedTime;
}

function pad(value) {
    return value < 10 ? `0${value}` : value;
}

function padMilliseconds(value) {
    return value < 100 ? `0${value}` : value;
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
