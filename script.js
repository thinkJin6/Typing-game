const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const tiemEl = document.getElementById('time');
const endgameEl = document.getElementById('end__game--container');
const btnSetting = document.getElementById('btn--settings');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings__form');
const difficultySelect = document.getElementById('difficulty');

// List of word for game
const words = [
  'about',
  'all',
  'also',
  'and',
  'because',
  'but',
  'by',
  'can',
  'come',
  'there',
  'these',
  'they',
  'thing',
  'think',
  'this',
  'those',
  'time',
  'to',
  'two',
  'up',
  'use',
  'very',
  'want',
  'way',
  'we',
  'well',
  'what',
  'when',
  'which',
  'who',
  'will',
  'with',
  'would',
  'year',
  'your',
];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Focus on text on start
text.focus();

// Set Difficulty to value in local storage or medium
const getDifficultyDefualt = function () {
  return localStorage.getItem('difficulty')
    ? localStorage.getItem('difficulty')
    : 'medium';
};

let difficulty = getDifficultyDefualt();

// Set difficulty select value
difficultySelect.value = getDifficultyDefualt();

// Generate random word from arr
const getRandomWord = function () {
  return words[Math.trunc(Math.random() * words.length)];
};

// Add word to DOM
const addWordToDOM = function () {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
};

// Update score
const updateScore = function () {
  score++;
  scoreEl.innerHTML = score;
};

// Game over and show screen
const gameOver = function () {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}🎊</p>
        <button onclick="location.reload()">Reload</button>
    `;

  endgameEl.style.display = 'flex';
};

// Update time
const updateTime = function () {
  time--;
  tiemEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    // Eng game
    gameOver();
  }
};

// Start Counting down
const timeInterval = setInterval(updateTime, 1000);

////////////////////////// Event listener/////////////////////////////////////////////////////////////////////////////////////////////

// Typing
text.addEventListener('input', function (e) {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // clear input field
    e.target.value = '';

    if (difficulty === 'hard') time += 2;
    if (difficulty === 'medium') time += 3;
    if (difficulty === 'easy') time += 5;

    updateTime();
  }
});

// Settings btn click
btnSetting.addEventListener('click', function () {
  settings.classList.toggle('hidden');
});

// Settings select
settingsForm.addEventListener('change', function (e) {
  difficulty = e.target.value;

  localStorage.setItem('difficulty', difficulty);
});

// Clear input field when hits enter
window.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') text.value = '';
});

// Init random word
addWordToDOM();
