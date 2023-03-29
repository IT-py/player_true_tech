const video = document.getElementById('my-video');
const playPauseBtn = document.getElementById('play-pause-btn');
const speedSlider = document.getElementById('speed-slider');
const brightnessSlider = document.getElementById('brightness-slider');
const contrastSlider = document.getElementById('contrast-slider');
const rewindBtn = document.getElementById('rewind-btn');
const forwardBtn = document.getElementById('forward-btn');
const introBtns = document.getElementById('intro-btns');

const remindersCheckbox = document.getElementById('reminders-checkbox');
const remindersDialog = document.createElement('div');
remindersDialog.style.display = 'none';
remindersDialog.innerHTML = `
  <h2>Настройки напоминаний</h2>
  <label for="num-reminders">Количество напоминаний:</label>
  <input type="number" id="num-reminders" value="3" min="1" max="10"><br>
  <label for="reminder-interval">Интервал напоминаний (в минутах):</label>
  <input type="number" id="reminder-interval" value="10" min="1" max="60"><br>
  <button id="save-reminders">Сохранить</button>
`;
const saveRemindersBtn = remindersDialog.querySelector('#save-reminders');
const numRemindersInput = remindersDialog.querySelector('#num-reminders');
const reminderIntervalInput = remindersDialog.querySelector('#reminder-interval');




const switchVideoBtn = document.getElementById('switch-video-btn');
switchVideoBtn.addEventListener('click', switchVideo);






const savedTime = localStorage.getItem('savedTime');
// Если такое время есть, устанавливаем его в качестве времени начала видео
if (savedTime) {
video.currentTime = parseFloat(savedTime);
}

// Сохраняем время, на котором остановился пользователь в localStorage при закрытии страницы
window.addEventListener('beforeunload', () => {
localStorage.setItem('savedTime', video.currentTime);
});

function changeColor() {
  var color1 = document.getElementById("color1").value;
  var color2 = document.getElementById("color2").value;
    var colorMap = {
      "красный": 0,
      "оранжевый": 30,
      "желтый": 60,
      "зеленый": 240,
      "синий": 120,

    };

  if (!isNaN(color1)) {
    color1 = parseInt(color1);
  } else {
    color1 = colorMap[color1.toLowerCase()] || 0;
  }
  if (!isNaN(color2)) {
    color2 = parseInt(color2);
  } else {
    color2 = colorMap[color2.toLowerCase()] || 0;
  }
  video.style.filter = "hue-rotate(" + color1 + "deg) saturate(100%)";
  video.style.webkitFilter = "hue-rotate(" + color1 + "deg) saturate(100%)";
  video.style.mozFilter = "hue-rotate(" + color1 + "deg) saturate(100%)";
  video.style.msFilter = "hue-rotate(" + color1 + "deg) saturate(100%)";
  video.style.oFilter = "hue-rotate(" + color1 + "deg) saturate(100%)";
  video.style.filter = video.style.filter.replace(color1 + "deg", color2 + "deg");
  video.style.webkitFilter = video.style.webkitFilter.replace(color1 + "deg", color2 + "deg");
  video.style.mozFilter = video.style.mozFilter.replace(color1 + "deg", color2 + "deg");
  video.style.msFilter = video.style.msFilter.replace(color1 + "deg", color2 + "deg");
  video.style.oFilter = video.style.oFilter.replace(color1 + "deg", color2 + "deg");
}


function togglePlayPause() {
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = 'Pause';
  } else {
    video.pause();
    playPauseBtn.textContent = 'Play';
  }
}

function setSpeed() {
  video.playbackRate = parseFloat(speedSlider.value);
}

function setBrightness() {
  video.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%)`;
}

function setContrast() {
  video.style.filter = `brightness(${brightnessSlider.value}%) contrast(${contrastSlider.value}%)`;
}

function rewind() {
  video.currentTime -= 15;
}

function forward() {
  video.currentTime += 15;
}

playPauseBtn.addEventListener('click', togglePlayPause);
speedSlider.addEventListener('input', setSpeed);
brightnessSlider.addEventListener('input', setBrightness);
contrastSlider.addEventListener('input', setContrast);
rewindBtn.addEventListener('click', rewind);
forwardBtn.addEventListener('click', forward);

if (!savedTime) {
  video.currentTime = 0;
}
video.play();


window.addEventListener('beforeunload', () => {
  video.pause();
});

window.addEventListener('unload', () => {
  video.pause();
});


remindersCheckbox.addEventListener('change', () => {
  if (remindersCheckbox.checked) {
    remindersDialog.style.display = 'block';
  } else {
    remindersDialog.style.display = 'none';
  }
});

saveRemindersBtn.addEventListener('click', () => {
  const numReminders = parseInt(numRemindersInput.value);
  const reminderInterval = parseInt(reminderIntervalInput.value);
  startReminders(numReminders, reminderInterval);
  remindersDialog.style.display = 'none';
});

function startReminders(numReminders, reminderInterval) {
  const reminderTimes = getReminderTimes(numReminders, reminderInterval);

  reminderTimes.forEach((reminderTime) => {
    setTimeout(() => {
      if (!video.paused) {
        video.pause();
        alert('Время отдохнуть!');
      }
    }, reminderTime * 60 * 1000);
  });
}

function getReminderTimes(numReminders, reminderInterval) {
  const reminderTimes = [];

  for (let i = 0; i < numReminders; i++) {
    reminderTimes.push(reminderInterval * (i + 1));
  }

  return reminderTimes;
}

document.body.appendChild(remindersDialog);

function switchVideo() {
  if (video.src.endsWith('video.mp4')) {
    video.src = 'relax.mp4';
  } else {
    video.src = 'video.mp4';
  }
  video.load();
  video.play();
}
function switchVideo() {
  if (remindersDialog.style.display !== 'none') {
    video.pause();
  }
  if (video.src.endsWith('video.mp4')) {
    video.src = 'relax.mp4';
  } else {
    video.src = 'video.mp4';
  }
  video.load();
  video.play();
}
function switchVideo() {
  const currentTime = video.currentTime;
  if (remindersDialog.style.display !== 'none') {
    video.pause();
  }
  if (video.src.endsWith('video.mp4')) {
    video.src = 'relax.mp4';
  } else {
    video.src = 'video.mp4';
  }
  video.load();
  video.addEventListener('loadedmetadata', () => {
    video.currentTime = currentTime;
    video.play();
  });
}

function saveParamsToJson() {
  const params = {
    numReminders: parseInt(numRemindersInput.value),
    reminderInterval: parseInt(reminderIntervalInput.value),
    color1: document.getElementById("color1").value,
    color2: document.getElementById("color2").value,
    brightness: parseInt(brightnessSlider.value),
    contrast: parseInt(contrastSlider.value),
    speed: parseFloat(speedSlider.value)
  };
  const jsonData = JSON.stringify(params, null, 2); // добавляем отступы для удобочитаемости
  const filename = 'params.json';
  const blob = new Blob([jsonData], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
}






