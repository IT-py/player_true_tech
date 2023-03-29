// Получение объектов элементов страницы
const video = document.querySelector('video');
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const statusDiv = document.querySelector('#status-div');
const errorDiv = document.querySelector('#error-div');

// Проверка поддержки браузером Web Speech API
if (!('webkitSpeechRecognition' in window)) {
  errorDiv.textContent = 'Ваш браузер не поддерживает Web Speech API';
} else {
  // Создание объекта распознавания речи
  const recognition = new window.webkitSpeechRecognition();

  // Настройка параметров распознавания речи
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'ru-RU';

  // Обработка начала распознавания речи
  recognition.onstart = () => {
    statusDiv.textContent = 'Распознавание речи запущено';
    startBtn.disabled = true;
    stopBtn.disabled = false;
  };

  // Обработка результатов распознавания речи
  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript;
    console.log(transcript);
    // Проверка команды
    if (transcript.includes('пауза')) {
      video.pause();
      statusDiv.textContent = 'Видео остановлено';
    } else if (transcript.includes('продолжить')) {
      video.play();
      statusDiv.textContent = 'Видео возобновлено';
    } else {
      statusDiv.textContent = 'Не удалось распознать команду';
    }
  };

  // Обработка ошибки распознавания речи
  recognition.onerror = (event) => {
    errorDiv.textContent = `Ошибка распознавания речи: ${event.error}`;
  };

  // Обработка конца распознавания речи
  recognition.onend = () => {
    statusDiv.textContent = 'Распознавание речи остановлено';
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };

  // Запуск распознавания речи по нажатию кнопки "Start"
  startBtn.addEventListener('click', () => {
    recognition.start();
  });

  // Остановка распознавания речи по нажатию кнопки "Stop"
  stopBtn.addEventListener('click', () => {
    recognition.stop();
  });
  recognition.onerror = (event) => {
  console.error('Ошибка создания объекта распознавания речи:', event.error);
    };

}
