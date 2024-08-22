const questions = [
    {
        question: "Mejor DT del defe?",
        answers: [
            { text: "Ari", correct: false },
            { text: "Eze", correct: false },
            { text: "Diki", correct: true }, // Respuesta correcta
            { text: "Golosina", correct: false }
        ]
    },
    {
        question: "Chichini corona en bariloco?",
        answers: [
            { text: "Si", correct: false },
            { text: "No", correct: false },
            { text: "Con un traba?", correct: false },
            { text: "Realiza el salto del tigre", correct: true } // Respuesta correcta
        ]
    },
    {
        question: "¿Cuál es la mejor corona?",
        answers: [
            { text: "Al 11", correct: true }, // Respuesta correcta
            { text: "Al 32", correct: false },
            { text: "Al 17", correct: false },
            { text: "Al 5", correct: false }
        ]
    },
    {
        question: "Por 200 lucas, al cual te empomas?",
        answers: [
            { text: "Sobrina de Golo", correct: false },
            { text: "Golo lo sobrina", correct: false },
            { text: "A y B son correctas", correct: true } // Respuesta correcta
        ]
    },
    {
        question: "Hoy paga la",
        answers: [
            { text: "La rotten", correct: true }, // Respuesta correcta
            { text: "Le Bandit", correct: false },
            { text: "Club tropicana", correct: false },
            { text: "La Wanted", correct: false }
        ]
    },
    {
        question: "¿Cuál mata más?",
        answers: [
            { text: "Todas las opciones", correct: true }, // Respuesta correcta
            { text: "El 1", correct: false },
            { text: "El 36", correct: false },
            { text: "El 6", correct: false }
        ]
    }
];

const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let correctAnswers = 0;

function startGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = ''; // Limpiar las opciones anteriores
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    nextButton.style.display = 'none';
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        correctAnswers++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.style.display = 'block';
    } else {
        nextButton.innerText = 'Show Results';
        nextButton.style.display = 'block';
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResults();
    }
});

function showResults() {
    questionContainer.innerHTML = `
        <h2>Results</h2>
        <p>${correctAnswers} de ${questions.length} son correctas.</p>
        <button onclick="startGame()">Play Again</button>
    `;
}

startGame();