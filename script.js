const headerSubjectContainer = document.querySelector(".header-subject-container");
const headerSubjectImage = document.querySelector(".header-subject-img");
const headerSubjectText = document.querySelector(".header-subject-text");
const headerToggleInput = document.getElementById("header-toggle-input");

const startPage = document.querySelector(".start-page");
const subjectButtons = document.querySelectorAll(".subject-option-button");

const questionPage = document.querySelector(".question-page");
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const progressBar = document.querySelector(".progress-fill");
const answersContainer = document.querySelector(".answer-options-container");
const answerButtons = document.querySelectorAll(".answer-option-button");
const answerTexts = document.querySelectorAll(".answer-text");
const submitButton = document.querySelector(".submit-button");
const errorMessage = document.querySelector(".error-message-container");

const scorePage = document.querySelector(".score-page");
const scoreSubjectText = document.querySelector(".score-subject-text");
const scoreSubjectIconContainer = document.querySelector(".score-subject-img-container");
const scoreSubjectIcon = document.querySelector(".score-subject-img");
const scoreText = document.querySelector(".score-text");
const playAgainButton = document.querySelector(".play-again-button");

let quizzesData = [];
let currentSubject = {};
let currentQuestion = {};
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let isSubmitted = false;

const fetchData = async () => {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) throw new Error("Failed to load data.");

    const data = await response.json();
    quizzesData = data.quizzes;

    subjectButtons.forEach((btn) => btn.removeAttribute("disabled"));
  } catch (error) {
    console.error("Error:", error);
  }
};
fetchData();

const renderQuestion = () => {
  currentQuestion = currentSubject.questions[currentQuestionIndex];

  const { question, options } = currentQuestion;

  questionNumber.textContent = currentQuestionIndex + 1;
  questionText.textContent = question;

  answerTexts.forEach((text, index) => (text.textContent = options[index]));

  const progressValue = ((currentQuestionIndex + 1) / currentSubject.questions.length) * 100;
  progressBar.style.width = `${progressValue}%`;
};

const nextQuestion = () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < currentSubject.questions.length) {
    isSubmitted = false;
    selectedAnswer = null;

    submitButton.textContent = "Submit Answer";
    answerButtons.forEach((button) => {
      button.classList.remove("selected", "correct", "incorrect");
    });

    answersContainer.classList.remove("disabled");

    renderQuestion();
  } else {
    questionPage.classList.add("hidden");
    scorePage.classList.remove("hidden");

    scoreText.textContent = score;

    const subjectKey = currentSubject.title.toLowerCase();
    scoreSubjectIcon.src = `./images/icon-${subjectKey}.svg`;
    scoreSubjectIconContainer.className = "score-subject-img-container";
    scoreSubjectIconContainer.classList.add(`bg-${subjectKey}`);
    scoreSubjectText.textContent = currentSubject.title;
  }
};

subjectButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const selectedSubject = e.currentTarget.querySelector(".subject-option").textContent.trim();

    currentSubject = quizzesData.find((quiz) => quiz.title === selectedSubject);

    if (!currentSubject) {
      console.error("Failed to find subject.");
      return;
    }

    startPage.classList.add("hidden");
    questionPage.classList.remove("hidden");

    headerSubjectContainer.classList.remove("hidden");
    const subjectKey = selectedSubject.toLowerCase();
    headerSubjectImage.src = `./images/icon-${subjectKey}.svg`;
    headerSubjectImage.className = "header-subject-img";
    headerSubjectImage.classList.add(`bg-${subjectKey}`);
    headerSubjectText.textContent = selectedSubject;

    renderQuestion();
  });
});

answersContainer.addEventListener("click", (e) => {
  if (isSubmitted) return;

  const clickedButton = e.target.closest(".answer-option-button");

  if (!clickedButton) return;

  answerButtons.forEach((btn) => btn.classList.remove("selected"));

  clickedButton.classList.add("selected");

  selectedAnswer = clickedButton.querySelector(".answer-text").textContent.trim();

  errorMessage.classList.remove("show");
});

submitButton.addEventListener("click", () => {
  if (!isSubmitted) {
    if (!selectedAnswer) {
      errorMessage.classList.add("show");
      return;
    }

    errorMessage.classList.remove("show");

    const selectedButton = document.querySelector(".answer-option-button.selected");
    const { answer } = currentQuestion;

    if (selectedAnswer === answer) {
      score++;

      selectedButton.classList.add("correct");
    } else {
      selectedButton.classList.add("incorrect");

      answerButtons.forEach((button) => {
        const currentAnswerText = button.querySelector(".answer-text").textContent.trim();
        if (currentAnswerText === currentQuestion.answer) {
          button.classList.add("correct");
        }
      });
    }

    isSubmitted = true;
    submitButton.textContent = "Next Question";
    answersContainer.classList.add("disabled");
  } else {
    nextQuestion();
  }
});

playAgainButton.addEventListener("click", () => {
  currentSubject = {};
  currentQuestion = {};
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswer = null;
  isSubmitted = false;

  answersContainer.classList.remove("disabled");

  startPage.classList.remove("hidden");
  questionPage.classList.add("hidden");
  scorePage.classList.add("hidden");

  headerSubjectContainer.classList.add("hidden");
  headerSubjectImage.src = "";
  headerSubjectImage.className = "header-subject-img";
  headerSubjectText.textContent = "";

  progressBar.style.width = "0%";

  submitButton.textContent = "Submit Answer";

  answerButtons.forEach((btn) => btn.classList.remove("selected", "correct", "incorrect"));
});

headerToggleInput.addEventListener("change", () => document.body.classList.toggle("dark-mode"));
