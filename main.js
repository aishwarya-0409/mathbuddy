// Initialize the Desmos calculator
const elt = document.getElementById('calculator');
const calculator = Desmos.GraphingCalculator(elt);

// Sample trigonometry quiz data
const trigonometryQuiz = [
    {
        question: "What is the sine of 30 degrees",
        options: ["0.5", "1.0", "0.866", "0.707"],
        correctAnswer: "0.5",
        explanation: "The sine of 30 degrees is 0.5.",
        graph: {
            expressions: [
                // Define Desmos graph expressions here
                { id: "graph1", latex: "y=sin(x)", color: "#ff9900" },
            ],
            xAxisLabel: "x",
            yAxisLabel: "y",
            xAxisStep: 30,
        },
    },
    {
        question: "What is the cosine of 45 degrees",
        options: ["0.5", "1.0", "0.866", "0.707"],
        correctAnswer: "0.707",
        explanation: "The cosine of 45 degrees is 0.707.",
        graph: {
            expressions: [
                // Define Desmos graph expressions here
                { id: "graph2", latex: "y=cos(x)", color: "#0074e4" },
            ],
            xAxisLabel: "x",
            yAxisLabel: "y",
            xAxisStep: 30,
        },
    },
    {
        question: "What is the tangent of 60 degrees?",
        options: ["0.5", "1.0", "1.732", "2.0"],
        correctAnswer: "1.732",
        explanation: "The tangent of 60 degrees is approximately 1.732.",
        graph: {
            expressions: [
                // Define Desmos graph expressions here
                { id: "graph3", latex: "y=tan(x)", color: "#ff66b2" },
            ],
            xAxisLabel: "x",
            yAxisLabel: "y",
            xAxisStep: 30,
        },
    },
    // Add more trigonometry questions here
];

let currentQuestionIndex = 0;
let score = 0;

function initializeQuiz() {
    const startButton = document.getElementById("start-button");
    const quizContainer = document.getElementById("quiz-container");
    const iqBoard = document.getElementById("iq-board");

    startButton.addEventListener("click", () => {
        startButton.style.display = "none";
        quizContainer.style.display = "block";
        iqBoard.style.display = "block";

        // Initialize the Desmos calculator here
        initializeDesmosCalculator();

        // Display the first question
        displayQuestion();
    });
}

function initializeDesmosCalculator() {
    // Clear the Desmos calculator
    calculator.setBlank();

    // Define a function in Desmos to display the question and answer
    calculator.setExpression({
        id: "questionExpression",
        latex: `\\text{Question: }${trigonometryQuiz[currentQuestionIndex].question}`,
    });

    // Hide the calculator initially
    calculator.updateSettings({ showSettings: false });
}

function displayQuestion() {
    const questionText = document.getElementById("question-text");
    const optionsList = document.getElementById("options-list");
    const iqBoard = document.getElementById("iq-board");
    const questionNumberContainer = document.getElementById("question-number");

    const currentQuestion = trigonometryQuiz[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    optionsList.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const optionItem = document.createElement("li");
        optionItem.textContent = option;
        optionItem.addEventListener("click", () => {
            checkAnswer(option, currentQuestion.correctAnswer);
        });
        optionsList.appendChild(optionItem);
    });

    // Display question number navigation
    questionNumberContainer.textContent = "";
    for (let i = 0; i < trigonometryQuiz.length; i++) {
        const questionNumber = document.createElement("span");
        questionNumber.textContent = i + 1;
        questionNumber.addEventListener("click", () => {
            navigateToQuestion(i);
        });
        questionNumberContainer.appendChild(questionNumber);
    }

    iqBoard.textContent = `Question ${currentQuestionIndex + 1} / ${
        trigonometryQuiz.length
    } | Score: ${score}`;

    // Clear the previous graph
    calculator.setBlank();

    // Set the question as a Desmos graph expression
    calculator.setExpression({
        id: "questionExpression",
        latex: `\\text{Question: }${currentQuestion.question}`,
    });
}
function checkAnswer(selectedAnswer, correctAnswer) {
    const iqBoard = document.getElementById("iq-board");
    const optionsList = document.getElementById("options-list");
    const graphContainer = document.getElementById("graph-container");

    optionsList.style.pointerEvents = "none"; // Disable further clicks during feedback

    if (selectedAnswer === correctAnswer) {
        score++;
        iqBoard.textContent = "Correct! 🎉";
        iqBoard.style.color = "green";
    } else {
        iqBoard.textContent = "Incorrect. 😔";
        iqBoard.style.color = "red";
    }

    const currentQuestion = trigonometryQuiz[currentQuestionIndex];
    iqBoard.innerHTML += `<br><small>${currentQuestion.explanation}</small>`;

    // Clear previous graph
    graphContainer.innerHTML = "";

    // Create and display the Desmos graph for the current question
    createDesmosGraph(graphContainer, currentQuestion.graph);

    currentQuestionIndex++;

    if (currentQuestionIndex < trigonometryQuiz.length) {
        setTimeout(() => {
            optionsList.style.pointerEvents = "auto"; // Re-enable clicks for the next question
            displayQuestion();
        }, 1500); // Delay before displaying the next question
    } else {
        iqBoard.innerHTML += `<br>Quiz Finished | Score: ${score} / ${
            trigonometryQuiz.length
        }`;
    }
}

// Function to create and display a Desmos graph
function createDesmosGraph(container, graphData) {
    const calculator = Desmos.Calculator(container, {
        expressions: false, // Disable input area
        settingsMenu: false, // Disable settings menu
    });

    // Load the graph data from your question object
    if (graphData) {
        calculator.updateSettings(graphData);
    }
}

document.addEventListener("DOMContentLoaded", initializeQuiz);

// Wait for the Desmos API script to load
window.addEventListener("DOMContentLoaded", function () {
    // Now you can safely use the Desmos object
    const calculator = Desmos.Calculator(document.getElementById("graph-container"));
    
    // Your code that uses the Desmos calculator goes here
    // For example, you can add equations and customize the graph.
});
