var questions = [
    "Have you registered for the JAM?",
    "Do you have anything important to do between the start and deadline?",
    "Are the tools you use updated and ready for the JAM?",
    "Is your work environment clean?",
    "Do you have groceries or meals planned?",
    "Are you ready to have fun?"
];
var answers = ["Yes", "No", "Maybe", "I don't know"];
var answerKey = ["A", "B", "A", "A", "A", "A"];
var userAnswers,questionNumber,correct,quizAnswer;
var btnStart = document.getElementById("btn-start");
var btnNext = document.getElementById("btn-next");
var quizStart = document.getElementById("quiz-start");
var quizQuestions = document.getElementById("quiz-question-container");
var quizResults = document.getElementById("quiz-results");
var quizScore = document.getElementById("quiz-score");
var question = document.getElementById("question");
var answerA = document.getElementById("answerA");
var answerB = document.getElementById("answerB");
var answerC = document.getElementById("answerC");
var answerD = document.getElementById("answerD");

btnStart.addEventListener("click", startQuiz);
btnNext.addEventListener("click", checkAnswer);

init();

function init(){
    userAnswers = [];
    questionNumber = 0;
    correct = 0;
}

function startQuiz(){
    quizStart.style.display = "none";
    setQuestion();
    quizQuestions.style.display = "block";
}

function checkAnswer() {
    quizAnswer = document.querySelector('input[name = "question"]:checked');
    if (quizAnswer) {
        if (quizAnswer.value == "A") {
            userAnswers.push("A");
        } else if (quizAnswer.value == "B") {
            userAnswers.push("B");
        } else if (quizAnswer.value == "C") {
            userAnswers.push("C");
        } else if (quizAnswer.value == "D") {
            userAnswers.push("D");
        }
        quizAnswer.checked = false;
        nextQuestion();
    }

}

function nextQuestion()
{
    questionNumber += 1;
    if(questionNumber >= questions.length){
        endQuiz();
    } else{
        setQuestion();
    }
}

function setQuestion(){
    question.textContent = "Question " + (questionNumber + 1) + ": " + questions[questionNumber];
    answerA.textContent = answers[0];
    answerB.textContent = answers[1];
    answerC.textContent = answers[2];
    answerD.textContent = answers[3];
}

function endQuiz(){
    gradeQuiz();
    quizScore.textContent = correct + " / " + answerKey.length;
    quizQuestions.style.display = "none";
    quizResults.style.display = "block";
}

function gradeQuiz(){
    for(let i = 0; i < userAnswers.length; i++){
        if(userAnswers[i] === answerKey[i]){
            correct++;
        }
    }
}
