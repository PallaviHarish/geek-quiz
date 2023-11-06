// const questions = [
//     {
//         question:"What city is known as 'The Eternal City'?",
//         answers:[
//             { text: "Adelaide", correct: false},
//             { text: "Philadelphia", correct: false},
//             { text: "Denver", correct: false},
//             { text: "Rome", correct: true},
//         ]
//     },
//     {
//         question:"How many faces does a Dodecahedron have?",
//         answers:[
//             { text: "11", correct: false},
//             { text: "12", correct: true},
//             { text: "13", correct: false},
//             { text: "14", correct: false},
//         ]
//     },
//     {
//         question:"What is a group of pandas known as?",
//         answers:[
//             { text: "Bob", correct: false},
//             { text: "Colony", correct: false},
//             { text: "An embarrassment", correct: true},
//             { text: "Shoal", correct: false},
//         ]
//     },
//     {
//         question:"Which planet has the most moons?",
//         answers:[
//             { text: "Saturn", correct: true},
//             { text: "Jupiter", correct: false},
//             { text: "Neptune", correct: false},
//             { text: "Uranus", correct: false},
//         ]
//     },
// ];
console.log("hello")
const a =5
console.log(a)
const questions = {
    1: {
      question: "What city is known as 'The Eternal City'?",
      answers: ["Adelaide", "Philadelphia", "Denver", "Rome"],
      correctAnswer: "Rome",
    },
    2: {
      question: "How many faces does a Dodecahedron have?",
      answers: ["11", "12", "13", "14"],
      correctAnswer: "12",
    },
    3: {
      question: "What is a group of pandas known as?",
      answers: ["Bob", "Colony", "An embarrassment", "Shoal"],
      correctAnswer: "An embarrassment",
    },
    4: {
      question: "Which planet has the most moons?",
      answers: ["Saturn", "Jupiter", "Neptune", "Uranus"],
      correctAnswer: "Saturn",
    },
    5: {
      question: "What is the closest planet to the Sun?",
      answers: ["Mercury", "Venus", "Earth", "Mars"],
      correctAnswer: "Mercury",
    },
  };

const questionElem = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuesIndex = 1;
let score = 0;

function startQuiz(){
    currentQuesIndex = 1;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){

    resetState();

    let currentQuestion = questions[currentQuesIndex];
    let questionNo = currentQuesIndex;
    questionElem.innerHTML = questionNo + ". " + currentQuestion.question;

    console.log(questionNo + ". " + currentQuestion.question);

    // currentQuestion.answers.forEach(answer =>{
    //     const button = document.createElement("button");
    //     button.innerHTML = answer.text;
    //     button.classList.add("btn");
    //     answerButton.appendChild(button);
    //     if(answer.correct){
    //         button.dataset.correct = answer.correct;
    //     }
    //     button.addEventListener("click",checkAnswer);
    // });

    for(let index=0;index<currentQuestion.answers.length;index++){
        const button = document.createElement("button");
        button.innerHTML = currentQuestion.answers[index];
        button.classList.add("btn");
        answerButton.appendChild(button);
        button.addEventListener("click",checkAnswer);
    }
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function checkAnswer(e){
    const selectedBtn = e.target;
    console.log(questions[currentQuesIndex].correctAnswer)
    const isCorrect = selectedBtn.firstChild.textContent == questions[currentQuesIndex].correctAnswer;
    console.log(isCorrect)
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button =>{
        console.log(selectedBtn.correctAnswer);
         if(button.firstChild.textContent === questions[currentQuesIndex].correctAnswer){
             button.classList.add("correct");
         }
         button.disabled = true;
     });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click",()=>{
    if(currentQuesIndex<6){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function handleNextButton(){
    currentQuesIndex++;
    if(currentQuesIndex<6){
        showQuestion();
    }else{
        showScore();
    }
};

function showScore(){
    resetState();
    questionElem.innerHTML = `You scored ${score} out of ${5} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

startQuiz();
