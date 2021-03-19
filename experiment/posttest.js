/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////

(function() {
function buildQuiz() {
// we'll need a place to store the HTML output
const output = [];

// for each question...
myQuestions.forEach((currentQuestion, questionNumber) => {
// we'll want to store the list of answer choices
const answers = [];

// and for each available answer...
for (letter in currentQuestion.answers) {
// ...add an HTML radio button
answers.push(
`<label>
<input type="radio" name="question${questionNumber}" value="${letter}">
${letter} :
${currentQuestion.answers[letter]}
</label>`
);
}

// add this question and its answers to the output
output.push(
`<div class="question"> ${currentQuestion.question} </div>
<div class="answers"> ${answers.join("")} </div>`
);
});

// finally combine our output list into one string of HTML and put it on the page
quizContainer.innerHTML = output.join("");
}

function showResults() {
// gather answer containers from our quiz
const answerContainers = quizContainer.querySelectorAll(".answers");
answerContainers.forEach(e => e.style.color = "black");

// keep track of user's answers
let numCorrect = 0;

// for each question...
myQuestions.forEach((currentQuestion, questionNumber) => {
// find selected answer
const answerContainer = answerContainers[questionNumber];
const selector = `input[name=question${questionNumber}]:checked`;
const userAnswer = (answerContainer.querySelector(selector) || {}).value;

// if answer is correct
if (userAnswer === currentQuestion.correctAnswer) {
// add to the number of correct answers
numCorrect++;

// color the answers green
//answerContainers[questionNumber].style.color = "lightgreen";
} else {
// if answer is wrong or blank
// color the answers red
answerContainers[questionNumber].style.color = "red";
}
});

// show number of correct answers out of total
resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////






/////////////// Write the MCQ below in the exactly same described format ///////////////


const myQuestions = [{
question: "1. Which of the following statements are correct about a 2-3 tree?", ///// Write the question inside double quotes
answers: {
a: "A 2-3 tree has either 2 keys or 3 keys in every node ", ///// Write the option 1 inside double quotes
b: "A 2-3 has two types of nodes, namely 2-node and 3-node ", ///// Write the option 2 inside double quotes
c: " A node in a 2-3 tree can have only only one child ", ///// Write the option 3 inside double quotes
d: "A node in a 2-3 tree can have more than one root", ///// Write the option 4 inside double quotes
},
correctAnswer: "b" ///// Write the correct option inside double quotes
},

{
question: "2. Key values in the nodes of a 2-3 tree always appear sorted from top to bottom and left to right in the tree. ",  ///// Write the question inside double quotes
answers: {
a: "True ",                  ///// Write the option 1 inside double quotes
b: "False ",                  ///// Write the option 2 inside double quotes

},
correctAnswer: "a"                ///// Write the correct option inside double quotes
},

{
question: "3. Keys in a 2-3 tree are always sorted when __________. ",  ///// Write the question inside double quotes
answers: {
a: "All leaves in a 2-3 tree are at the same level",                  ///// Write the option 1 inside double quotes
b: "Atleast one leaf node in a 2-3 tree has two chidren ",                  ///// Write the option 2 inside double quotes
c: "Leaf nodes in a 2-3 tree are allowed to have more than two children", ///// Write the option 3 inside double quotes
d: "Leaf nodes in a 2-3 tree may or may not have child nodes ", ///// Write the option 4 inside double quotes
},
correctAnswer: "a"                ///// Write the correct option inside double quotes
},

{
question: "4. Which of the following is correct about a 2-node?",  ///// Write the question inside double quotes
answers: {
a: "A two node has only one child",                  ///// Write the option 1 inside double quotes
b: "A two node has one data element and two children ",                  ///// Write the option 2 inside double quotes
c: " A two node has one data element and two children", ///// Write the option 3 inside double quotes

},
correctAnswer: "b"                ///// Write the correct option inside double quotes
},

{
question: "5. What is the time complexity of search in a 2-3 tree? ",  ///// Write the question inside double quotes
answers: {
a: "O(log N)",                  ///// Write the option 1 inside double quotes
b: "O(N)",                  ///// Write the option 2 inside double quotes
c: "O(1)  ", ///// Write the option 3 inside double quotes
d: "None of the above ", ///// Write the option 4 inside double quotes

},
correctAnswer: "a"                ///// Write the correct option inside double quotes
},

];




/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the below code ////////////////////////

/////////////////////////////////////////////////////////////////////////////


// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener("click", showResults);
})();


/////////////////////////////////////////////////////////////////////////////

/////////////////////// Do not modify the above code ////////////////////////

/////////////////////////////////////////////////////////////////////////////
