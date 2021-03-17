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
            question: "1. Which of the following is true? ", ///// Write the question inside double quotes
            answers: {
                a: "Data in a 2-3 tree is stored in unsorted manner  ", ///// Write the option 1 inside double quotes
                b: "Data in a 2-3 tree is stored in a sorted manner  ", ///// Write the option 2 inside double quotes
                c: " There is no ordering among data items in a 2-3 tree ", ///// Write the option 2 inside double quotes
                d: "Only leaf nodes have sorted data items  ", ///// Write the option 2 inside double quotes
            },
            correctAnswer: "b" ///// Write the correct option inside double quotes
        },

    {
      question: "2. Which of the following is true? ",  ///// Write the question inside double quotes
      answers: {
        a: " Leaf nodes in a 2-3 tree can be at any level ",                  ///// Write the option 1 inside double quotes
        b: " Leaf nodes in a 2-3 tree can be only at odd levels  ",                  ///// Write the option 2 inside double quotes
 	c: " All leaf nodes in a 2-3 have the same level  ",                  ///// Write the option 2 inside double quotes
	d: " None of the above  ",                  ///// Write the option 2 inside double quotes
	 
             },
      correctAnswer: "c"                ///// Write the correct option inside double quotes
    },

{
      question: "3.  Which of the following best describes a 2-node? ",  ///// Write the question inside double quotes
      answers: {
        a: "A 2-node has one data item and two children ",                  ///// Write the option 1 inside double quotes
        b: "A 2-node has two data items and two children ",                  ///// Write the option 2 inside double quotes
	c: "A 2-node has one data item and one child ", ///// Write the option 3 inside double quotes
        d: "None of the above ", ///// Write the option 4 inside double quotes
             },
      correctAnswer: "a"                ///// Write the correct option inside double quotes
    },

{
      question: "4. Which of the following best describes a 3-node?  ",  ///// Write the question inside double quotes
      answers: {
        a: "A 3-node has one data item and two children ",                  ///// Write the option 1 inside double quotes
        b: "A 3-node has two data items and three children  ",                  ///// Write the option 2 inside double quotes
	c: "A 3-node has one data item and one child  ", ///// Write the option 3 inside double quotes
        d: "None of the above ", ///// Write the option 3 inside double quotes
             },
      correctAnswer: "d"                ///// Write the correct option inside double quotes
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
