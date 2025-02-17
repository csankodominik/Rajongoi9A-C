const quizData = [
  {
    question: 'Ki tervezte?',
    options: ['Markus Persson', 'Mojang', 'Microsoft', 'EA'],
    answer: 'Markus Persson',
  },
  {
    question: 'Mi a Minecraft kódolási nyelve?',
    options: [
      'C#',
      'JavaScript',
      'HTML',
      'Java',
    ],
    answer: 'Java',
  },
  {
    question: 'Ki vásárolta fel??',
    options: ['EA', 'Markus Persson', 'Mojang', 'Microsoft'],
    answer: 'Microsoft',
  },
  {
    question: 'Hány példányt adtak el?',
    options: ['250 millió', '176 millió', '200 millió', '300 millió'],
    answer: '300 millió',
  },
  {
    question: 'Melyik évben adták ki?',
    options: ['2010', '2011', '2009', '2012'],
    answer: '2011',
  },
  {
    question: 'Mi a neve a játékban a legnagyobb ellenségnek, akivel a végén találkozhatsz?',
    options: ['Ender Dragon', 'Ghast', 'Zombie Pigman', 'Wither'],
    answer: 'Ender Dragon',
  },
  {
    question: 'Mi a Minecraft egyik legismertebb blokkjának neve, amit gyakran találsz a föld alatt?',
    options: [
      'Kő',
      'Fa',
      'Gyémánt érc',
      'Homok',
    ],
    answer: 'Kő',
  },
  {
    question: 'Melyik anyagból készül a leggyorsabb és legerősebb csákány a Minecraftban?',
    options: ['Arany', 'Gyémánt', 'Netherite', 'Vas'],
    answer: 'Netherite',
  },
  {
    question: 'Ki adta ki?',
    options: ['Markus Persson', 'EA', 'Microsoft', 'Mojang'],
    answer: 'Mojang',
  },
  {
    question: 'Hány blokk széles a teljes Minecraft világ?',
    options: ['30,000,000', '60,000,000', '100,000,000', 'Végtelen'],
    answer: '60,000,000',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateProgressBar() {
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  document.querySelector('.progress').style.width = `${progress}%`;
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];

      const optionText = document.createTextNode(shuffledOptions[i]);

      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);

  updateProgressBar(); // Progress bar frissítése
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
      const answer = selectedOption.value;
      const options = document.querySelectorAll('.option');

      options.forEach(option => {
          const radio = option.querySelector('input[type="radio"]');
          if (radio.value === quizData[currentQuestion].answer) {
              option.style.backgroundColor = '#4CAF50'; // Helyes válasz: zöld
              option.style.color = '#fff'; // Fehér szöveg
          } else if (answer !== quizData[currentQuestion].answer) {
              option.style.backgroundColor = '#f44336'; // Minden más opció piros, ha a válasz helytelen
              option.style.color = '#fff'; // Fehér szöveg
          } else {
              option.style.backgroundColor = '#f9f9f9'; // Semleges háttér
              option.style.color = '#000'; // Alap szöveg szín
          }
      });

      setTimeout(() => {
          if (answer === quizData[currentQuestion].answer) {
              score++;
          } else {
              incorrectAnswers.push({
                  question: quizData[currentQuestion].question,
                  incorrectAnswer: answer,
                  correctAnswer: quizData[currentQuestion].answer,
              });
          }
          currentQuestion++;
          selectedOption.checked = false;
          if (currentQuestion < quizData.length) {
              displayQuestion();
          } else {
              displayResult();
          }
      }, 1000); // 1 másodperc késleltetés, hogy látszódjon a színezés
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = ` ${score} pontszámot értél el a ${quizData.length}-ből!`;

  // Confetti effektus hozzáadása
  confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
  });
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion(); // Első kérdés újratöltése
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
          <p>
              <strong>Kérdés:</strong> ${incorrectAnswers[i].question}<br>
              <strong>A te válaszod:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
              <strong>Helyes Válasz:</strong> ${incorrectAnswers[i].correctAnswer}
          </p>
      `;
  }

  resultContainer.innerHTML = `
      <p> ${score} pontszámot értél el a ${quizData.length}-ből!</p>
      <p>Helytelen válaszok:</p>
      ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion(); // Első kérdés betöltése