const homeScreen = document.getElementById("home-screen");
const quizScreen = document.getElementById("quiz-screen");
const startBtn = document.getElementById("start-btn");
// Quiz Questions
const quiz = [
{
    question: "What is HTML?",
    answers: [
        "Programming Language",
        "Markup Language",
        "Database",
        "Operating System"
    ],
    correct: 1
},
{
    question: "Which language is used for styling webpages?",
    answers: [
        "HTML",
        "CSS",
        "Java",
        "Python"
    ],
    correct: 1
},
{
    question: "Which language makes webpages interactive?",
    answers: [
        "HTML",
        "CSS",
        "JavaScript",
        "PHP"
    ],
    correct: 2
},
{
    question: "Which tag creates the largest heading?",
    answers: [
        "<p>",
        "<h1>",
        "<div>",
        "<span>"
    ],
    correct: 1
},

{
    question: "What does CSS stand for?",
    answers: [
        "Cascading Style Sheets",
        "Creative Style Sheets",
        "Computer Style Sheets",
        "Color Style Sheets"
    ],
    correct: 0
}
];

// Variables
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

// HTML Elements
const question = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const buttons = document.querySelectorAll(".btn");
const scoreText = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

const result = document.getElementById("result");
const finalScore = document.getElementById("final-score");
const playAgain = document.getElementById("play-again");

const timerText = document.getElementById("timer");
const progressBar = document.getElementById("progress-bar");

// Load Question
function loadQuestion(){

    clearInterval(timer);

    let q = quiz[currentQuestion];

    questionNumber.innerHTML =
    `Question ${currentQuestion + 1} of ${quiz.length}`;

    question.innerHTML = q.question;

    buttons.forEach((button,index)=>{

        button.textContent = q.answers[index];
        button.disabled = false;
        button.classList.remove("correct","wrong");

    });

    progressBar.style.width =
    ((currentQuestion + 1) / quiz.length) * 100 + "%";

    startTimer();
}

// Timer
function startTimer(){

    timeLeft = 15;

    timerText.innerHTML =
    "⏰ Time Left : " + timeLeft + "s";

    timer = setInterval(()=>{

        timeLeft--;

        timerText.innerHTML =
        "⏰ Time Left : " + timeLeft + "s";

        if(timeLeft <= 0){

            clearInterval(timer);

            buttons.forEach(btn=>btn.disabled=true);

            buttons[quiz[currentQuestion].correct]
            .classList.add("correct");

        }

    },1000);

}
startBtn.addEventListener("click",()=>{

homeScreen.style.display="none";

quizScreen.style.display="block";

loadQuestion();

});
// Answer Click
buttons.forEach((button,index)=>{

button.addEventListener("click",()=>{

clearInterval(timer);

buttons.forEach(btn=>btn.disabled=true);

if(index===quiz[currentQuestion].correct){

button.classList.add("correct");

score++;

scoreText.innerHTML="Score : "+score;

}else{

button.classList.add("wrong");

buttons[quiz[currentQuestion].correct]
.classList.add("correct");

}

});

});

// Next Button
nextBtn.addEventListener("click",()=>{

currentQuestion++;

if(currentQuestion<quiz.length){

loadQuestion();

}else{

showResult();

}

});

// Result
function showResult(){

clearInterval(timer);

document.getElementById("answers").style.display="none";

question.style.display="none";

questionNumber.style.display="none";

nextBtn.style.display="none";

scoreText.style.display="none";

timerText.style.display="none";

let message="";

if(score===5){

message="🏆 Excellent! Perfect Score";

}else if(score>=3){

message="🎉 Good Job!";

}else{

message="📚 Keep Practicing!";

}

result.style.display="block";

finalScore.innerHTML=`
<h2>${message}</h2>
<h1>${score} / ${quiz.length}</h1>
`;

}

// Play Again
playAgain.addEventListener("click",()=>{

location.reload();

});