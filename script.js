const questions = [
  {
    question: "Yasir, Dimas, Disho, dan Budi sedang bermain kartu. Siapa yang paling jago bermain kartu?",
    choices: ["Yasir", "Dimas", "Disho", "Budi"],
    answer: "Yasir"
  },
  {
    question: "Dimas selalu mengeluh lapar, Yasir suka diam-diam makan, dan Disho suka masak. Kalau begitu, siapa yang harus mencuci piring?",
    choices: ["Yasir", "Dimas", "Disho", "Budi"],
    answer: "Budi"
  },
  {
    question: "Yasir dan Disho sedang debat, Dimas sibuk main HP, dan Budi tidur. Siapa yang salah?",
    choices: ["Yasir dan Disho", "Dimas", "Budi", "Semua salah"],
    answer: "Yasir dan Disho"
  },
  {
    question: "Kalau Yasir punya mobil, Disho punya motor, dan Dimas punya sepeda, kenapa Budi tetap jalan kaki?",
    choices: [
      "Karena Budi sehat",
      "Karena Budi malas naik kendaraan",
      "Karena Budi cuma ada di cerita ini",
      "Karena kendaraan penuh"
    ],
    answer: "Karena Budi cuma ada di cerita ini"
  },
  {
    question: "Yasir pintar matematika, Disho jago olahraga, Dimas suka nonton film, dan Budi diam saja. Siapa yang paling sibuk?",
    choices: ["Yasir", "Disho", "Dimas", "Budi"],
    answer: "Yasir"
  },
  {
    question: "Dimas bilang Yasir suka makan gratis, Disho suka makan mewah, dan Budi suka makan apa saja. Kalau begitu, siapa yang akan bayar?",
    choices: ["Yasir", "Dimas", "Disho", "Pelayan restoran"],
    answer: "Pelayan restoran"
  },
  {
    question: "Yasir, Disho, dan Budi sering lupa ulang tahun Dimas. Kenapa Dimas tidak pernah marah?",
    choices: [
      "Karena Dimas lupa juga",
      "Karena Dimas sabar",
      "Karena Dimas tidak peduli",
      "Karena Dimas sibuk"
    ],
    answer: "Karena Dimas lupa juga"
  },
  {
    question: "Siapa nama orang yang suka jomok?",
    choices: ["Dimas kapang", "Yasir slebew", "Riski gimang", "Disho adek yasir slebew"],
    answer: "Yasir slebew"
  },
  {
    question: "Hewan apa yang dikenal sebagai raja hutan?",
    choices: ["Harimau", "Singa", "Serigala", "Gajah"],
    answer: "Singa"
  },
  {
    question: "Yasir, Disho, dan Budi sedang lari maraton. Tapi Dimas menang, kenapa?",
    choices: [
      "Karena Dimas lebih cepat",
      "Karena Dimas tidak ikut lari",
      "Karena Dimas naik motor",
      "Karena Dimas tahu jalan pintas"
    ],
    answer: "Karena Dimas naik motor"
  },
  {
    question: "Yasir sedang nyanyi, Disho main gitar, Dimas main drum, dan Budi jadi penonton. Kenapa penonton hanya satu orang?",
    choices: [
      "Karena konser diadakan di rumah Budi",
      "Karena hanya Budi yang mau nonton",
      "Karena mereka tidak populer",
      "Karena tempatnya kecil"
    ],
    answer: "Karena konser diadakan di rumah Budi"
  },
  {
    question: "Yasir punya 10 ribu, Disho punya 5 ribu, Dimas punya 15 ribu, dan Budi tidak punya apa-apa. Kalau begitu, siapa yang akan traktir?",
    choices: ["Yasir", "Dimas", "Disho", "Budi"],
    answer: "Budi"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const startBtn = document.getElementById("start-btn");
const gameInfo = document.getElementById("game-info");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const feedbackElement = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  gameInfo.style.display = "block";
  questionElement.style.display = "block";
  choicesElement.style.display = "block";
  feedbackElement.style.display = "block";
  showQuestion();
});

function startTimer() {
  timeLeft = 20;
  timerElement.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      feedbackElement.textContent =
        "Waktu habis! Jawaban yang benar adalah: " +
        questions[currentQuestionIndex].answer;
      feedbackElement.style.color = "red";
      nextBtn.style.display = "block";
    }
  }, 1000);
}

function showQuestion() {
  feedbackElement.textContent = "";
  feedbackElement.style.color = "black";
  nextBtn.style.display = "none";

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.textContent = choice;
    button.addEventListener("click", () => selectAnswer(choice));
    choicesElement.appendChild(button);
  });

  startTimer();
}

function selectAnswer(selectedChoice) {
  clearInterval(timer);
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedChoice === currentQuestion.answer) {
    feedbackElement.textContent = "Benar!";
    feedbackElement.style.color = "green";
    score += 10;
    scoreElement.textContent = score;
  } else {
    feedbackElement.textContent =
      "Salah! Jawaban yang benar adalah: " + currentQuestion.answer;
    feedbackElement.style.color = "red";
  }
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    gameOver();
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = score;
  restartBtn.style.display = "none";
  showQuestion();
});

function gameOver() {
  questionElement.textContent =
    "Game selesai! Skor akhir Anda: " + score;
  choicesElement.innerHTML = "";
  feedbackElement.textContent = "";
  nextBtn.style.display = "none";
  restartBtn.style.display = "block";
}