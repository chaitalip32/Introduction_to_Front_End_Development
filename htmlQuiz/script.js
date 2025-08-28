const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreElement = document.getElementById("right-answers");
const currentQuestionElement = document.getElementById("current-question");
const totalQuestionsElement = document.getElementById("total-questions");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

let currentQuestionIndex = 0;
let score = 0;

const questions = [
	{
		question: "What is 2 + 2?",
		answers: [
			{ text: "3", correct: false },
			{ text: "4", correct: true },
			{ text: "5", correct: false },
			{ text: "22", correct: false },
		],
	},
	{
		question: "What is the capital of France?",
		answers: [
			{ text: "Berlin", correct: false },
			{ text: "Madrid", correct: false },
			{ text: "Paris", correct: true },
			{ text: "Lisbon", correct: false },
		],
	},
	{
		question: "Which language runs in a web browser?",
		answers: [
			{ text: "Python", correct: false },
			{ text: "Java", correct: false },
			{ text: "C", correct: false },
			{ text: "JavaScript", correct: true },
		],
	},
];

totalQuestionsElement.innerText = questions.length;

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
	currentQuestionIndex++;
	setNextQuestion();
});
restartButton.addEventListener("click", startQuiz);

function startQuiz() {
	startButton.classList.add("hide");
	restartButton.classList.add("hide");
	questionContainer.classList.remove("hide");
	currentQuestionIndex = 0;
	score = 0;
	scoreElement.innerText = score;
	setNextQuestion();
}

function setNextQuestion() {
	resetState();
	if (currentQuestionIndex < questions.length) {
		showQuestion(questions[currentQuestionIndex]);
		updateProgressBar();
	} else {
		showFinalScreen();
	}
}

function showQuestion(question) {
	questionElement.innerText = question.question;
	currentQuestionElement.innerText = currentQuestionIndex + 1;

	answerButtons.innerHTML = "";
	question.answers.forEach((answer) => {
		const button = document.createElement("button");
		button.innerText = answer.text;
		button.classList.add("btn");
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
		answerButtons.appendChild(button);
	});
}

function resetState() {
	nextButton.classList.add("hide");
}

function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct === "true";
	if (correct) {
		score++;
		scoreElement.innerText = score;
	}
	Array.from(answerButtons.children).forEach((button) => {
		button.disabled = true;
		if (button.dataset.correct === "true") {
			button.style.background = "#4caf50";
		} else {
			button.style.background = "#f44336";
		}
	});
	nextButton.classList.remove("hide");
}

function updateProgressBar() {
	const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
	progressBar.style.width = progress + "%";
	progressText.innerText = Math.round(progress) + "%";
}

function showFinalScreen() {
	questionElement.innerHTML = `🎉 Quiz Finished! <br> 
		You scored <strong>${score}</strong> out of <strong>${questions.length}</strong> 
		(${Math.round((score / questions.length) * 100)}%)`;

	answerButtons.innerHTML = "";
	nextButton.classList.add("hide");
	restartButton.classList.remove("hide");
    
	progressBar.style.width = "100%";
	progressText.innerText = "100%";
}

