const questions = [
    {
        question:"What city is known as 'The Eternal City'?",
        answers:[
            { text: "Adelaide", correct: false},
            { text: "Philadelphia", correct: false},
            { text: "Denver", correct: false},
            { text: "Rome", correct: true},
        ]
    },
    {
        question:"How many faces does a Dodecahedron have?",
        answers:[
            { text: "11", correct: false},
            { text: "12", correct: true},
            { text: "13", correct: false},
            { text: "14", correct: false},
        ]
    },
    {
        question:"What is a group of pandas known as?",
        answers:[
            { text: "Bob", correct: false},
            { text: "Colony", correct: false},
            { text: "An embarrassment", correct: true},
            { text: "Shoal", correct: false},
        ]
    },
    {
        question:"Which planet has the most moons?",
        answers:[
            { text: "Saturn", correct: true},
            { text: "Jupiter", correct: false},
            { text: "Neptune", correct: false},
            { text: "Uranus", correct: false},
        ]
    },
];

const questionElem = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuesIndex = 0;
let score = 0;

function startQuiz(){
    currentQuesIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuesIndex];
    let questionNo = currentQuesIndex + 1;
    questionElem.innerHTML = questionNo + ". " + currentQuestion.question;

    console.log(questionNo + ". " + currentQuestion.question);
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",checkAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function checkAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click",()=>{
    if(currentQuesIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

function showScore(){
    resetState();
    questionElem.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

startQuiz();