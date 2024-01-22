// keep ALL variables at the top
var grabStartBtn = document.getElementById('startBtn'); //creates  reference to HTML button with id 'startBtn'
/*Timer variables*/
var timer; //To store the interval ID
var timeRemaining = 300; //time in seconds (5min in total)
var currentQuestionIndex = 0;
var score = 0; // Initialize the score variable
function handleHighScore() {
  document.getElementById('initialBox').classList.remove('hide');
  var typeInitials = document.getElementById('typeInitial');
  var saveBtn = document.getElementById('saveBtn');
  var highScoreDisplay = document.getElementById('highScore');
  saveBtn.addEventListener('click', function () {
    var usersArray = JSON.parse(localStorage.getItem('user')) || []; //This line gets the 'user' array from the local storage. JSON.parse turns a string into an array
    usersArray.push({ initials: typeInitials.value, score: score }); //adds current user to array
    //save the updated usersArray to local storage
    localStorage.setItem('user', JSON.stringify(usersArray));

    // Display final score
    var finalScoreDisplay = document.getElementById('finalScoreDisplay');
    finalScoreDisplay.textContent = 'Final Score: ' + score;
    //Display high score
    var highScores = usersArray
      .map(function (user) {
        return user.initials + ': ' + user.score;
      })
      .join('<br>');

    highScoreDisplay.innerHTML = 'High Scores:<br>' + highScores;
    usersArray.forEach(function (user) {
      //forEach iterates over each elements in the 'usersArray'
      //the function takes 'user' as a peramter to represent each element in the array
      var userScore = document.createElement('div');
      userScore.textContent = user.initials + ': ' + user.score;
      highScoreContainer.appendChild(userScore);
    });
    // usersArray.push({ initials: typeInitials.value, score: score });
    localStorage.setItem('user', JSON.stringify(usersArray));
  }); // stringify turns array back into a string
  var resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = ''; // clears previous content result
  var highScoreContainer = document.createElement('div');
  highScoreContainer.classList.add('highScoreContainer');

  resultsContainer.appendChild(highScoreContainer);
  clearInterval(timer); //stops timer

  var grabQuizContainer = document.getElementById('quizContainer');
  grabQuizContainer.classList.add('hide');
  //in event listener have get and set item

  //set itemfunction to store changed array (this is the one i get with get item)
  //();
  var resultsContainer = document.getElementById('resultsContainer');
  //resultsContainer.append(initialBox, submitInitials); //<- Error to resolve
  // Append the input field to the resultsContainer
  resultsContainer.innerHTML = ''; // clears previous content result
  var highScoreContainer = document.createElement('div');
  highScoreContainer.classList.add('highScoreContainer');
  resultsContainer.append(typeInitials); // <-- Corrected line by chat GPT
  resultsContainer.append(saveBtn); // <-- You might want to append the save button too suggestion by chat GPT
}
var questions = [
  // questions variable is an array
  {
    //has 3 main objects
    question: 'What is Node.js?',
    //correct answer name / value pair
    correctAnswer:
      'A runtime environment for executing JavaScript code outside of a browser',
    //Answers array
    answers: [
      // made up of 3 objects.

      { text: 'A programming language', correct: false }, //each object has 2 properties
      { text: 'A database management system', correct: false },
      {
        text: 'A runtime environment for executing JavaScript code outside of a browser',
        correct: true,
      },
      { text: 'A web browser', correct: false },
    ],
  },
  {
    //!question 2
    question: 'Which of the following is NOT a core module in Node.js?',
    //correct answer
    correctAnswer: 'http (HTTP)',
    //Answers array
    answers: [
      { text: 'fs (File System)', correct: false },
      { text: 'http (HTTP)', correct: true },
      { text: 'path (Path)', correct: false },
      { text: 'db (database', correct: false },
    ],
  },
  {
    //!question 3
    question: 'How do you install external packages in Node.js?',
    //correct answer
    correctAnswer: 'Using the npm install command',
    //Answers array
    answers: [
      { text: 'Using the npm install command', correct: true },
      { text: 'Using the node install command', correct: false },
      { text: 'Using the npm add command', correct: false },
      { text: 'Using the node add command', correct: false },
    ],
  },
  {
    //!question 4
    question:
      'Which of the following is NOT a popular framework for building web applications with Node.js??',
    //correct answer
    correctAnswer: 'Koa.js',
    //Answers array
    answers: [
      { text: 'Koa.js', correct: true },
      { text: 'Nest.js', correct: false },
      { text: 'React.js', correct: false },
      { text: 'Express.js', correct: false },
    ],
  },
  {
    //!question 5
    question:
      'What is the purpose of the package.json file in a Node.js project?',
    //correct answer
    correctAnswer: 'To manage project dependencies and scripts',
    //Answers array
    answers: [
      { text: "To store the project's source code", correct: false },
      { text: "To define the project's database schema", correct: false },
      { text: 'To manage project dependencies and scripts', correct: true },
      { text: "To configure the project's server settings", correct: false },
    ],
  },
  {
    //!question 6
    question: 'What is the package manager used in Node.js?',
    //correct answer
    correctAnswer: 'NPM (Node Package Manager)',
    //Answers array
    answers: [
      { text: 'Yarn', correct: false },
      { text: 'NPM (Node Package Manager)', correct: true },
      { text: 'Gulp Node', correct: false },
      { text: 'Node Browser', correct: false },
    ],
  },
  {
    //! Question 7
    question: 'What is the purpose of the fs module in Node.js?',
    // Correct answer
    correctAnswer: 'To handle file system operations',
    // Answers array
    answers: [
      { text: 'To create and manage databases', correct: false },
      { text: 'To handle file system operations', correct: true },
      { text: 'To handle HTTP requests and responses', correct: false },
      { text: 'To perform mathematical calculations', correct: false },
    ],
  },
  {
    //! Question 8
    question: 'What is the role of the npm command in Node.js?',
    // Correct answer
    correctAnswer: 'To install and manage external packages and dependencies',
    // Answers array
    answers: [
      {
        text: 'To install and manage external packages and dependencies',
        correct: true,
      },
      { text: 'To execute JavaScript code in the browser', correct: false },
      { text: 'To create and manage databases', correct: false },
      { text: 'To handle HTTP requests and responses', correct: false },
    ],
  },
  {
    //! Question 9
    question: 'What is the purpose of the module.exports object in Node.js?',
    // Correct answer
    correctAnswer: 'To install and manage external packages and dependencies',
    // Answers array
    answers: [
      {
        text: 'To import and use external modules',
        correct: true,
      },
      {
        text: 'To export files from your source code with node',
        correct: false,
      },
      { text: 'To define new functions and variables', correct: false },
      { text: 'To handle HTTP requests and responses', correct: false },
      {
        text: 'To handle HTTP requests and responses',
      },
    ],
  },
  {
    //! Question 10
    question: 'What is the role of the  http module in Node.js?',
    // Correct answer
    correctAnswer: 'To install and manage external packages and dependencies',
    // Answers array
    answers: [
      {
        text: 'To handle file system operations',
        correct: false,
      },
      {
        text: 'To handle HTTP requests and responses',
        correct: true,
      },
      {
        text: 'To perform mathematical calculations in spit seconds',
        correct: false,
      },
      { text: 'To create, manage and export databases', correct: false },
    ],
  },
  {
    //! Question 11
    //?EDIT THIS QUESTION
    question: 'What is the purpose of the path module in Node.js?',
    // Correct answer
    correctAnswer: 'To install and manage external packages and dependencies',
    // Answers array
    answers: [
      {
        text: 'To handle file system operations',
        correct: false,
      },
      {
        text: 'To handle HTTP requests and responses',
        correct: false,
      },
      {
        text: 'To create functions and execute them with automation',
        correct: false,
      },
      { text: 'To manipulate file paths', correct: false },
    ],
  },
  {
    //! Question 12
    question:
      'Which of the following statements about arrow functions is NOT true?',
    // Correct answer
    correctAnswer: 'To install and manage external packages and dependencies',
    // Answers array
    answers: [
      {
        text: 'Arrow functions can be used as constructors',
        correct: true,
      },
      {
        text: 'Arrow functions are always anonymous',
        correct: false,
      },
      {
        text: 'Arrow functions do not have their own this value',
        correct: false,
      },
      {
        text: 'Arrow functions cannot be used as methods in objects',
        correct: false,
      },
    ],
  },
  {
    //! Question 13
    question:
      'What is the correct syntax for defining an arrow function with a single parameter?',
    // Correct answer
    correctAnswer: 'param => { }',
    // Answers array
    answers: [
      {
        text: '(param) => { }',
        correct: false,
      },
      {
        text: '(param) => param',
        correct: false,
      },
      {
        text: 'param => param',
        correct: false,
      },
      {
        text: 'param => { }',
        correct: true,
      },
    ],
  },
  {
    //! Question 14
    question:
      'Which of the following statements about arrow functions is true?',
    // Correct answer
    correctAnswer: 'param => { }',
    // Answers array
    answers: [
      {
        text: 'Arrow functions can be used with the new keyword.',
        correct: false,
      },
      {
        text: 'Arrow functions do not have their own this value.',
        correct: true,
      },
      {
        text: 'Arrow functions can be used with the bind() method.',
        correct: false,
      },
      {
        text: 'Arrow functions can be used with the apply() method.',
        correct: false,
      },
    ],
  },
];
//reference to the score element
var scoreDisplay = document.getElementById('scoreDisplay');

/*Start timer function */
function startTimer() {
  //Sets up an interval to update timer every second
  timer = setInterval(function () {
    // Display the time remaining on the screen
    document.getElementById('timerDisplay').textContent =
      'Time: ' + timeRemaining + 's';

    /*checking if time ran out */
    if (timeRemaining <= 0) {
      clearInterval(timer); //stops timer
      alert('Times up!');
    }
    timeRemaining--;
  }, 1000); //updates time every 1 second
}

// function thats triggered when button is clicked
// Variable to keep track of the current question index
var currentQuestionIndex = 0;

// Attached eventListener to the button to trigger the function
grabStartBtn.addEventListener('click', clickedToStartTimerPresentQuestion);

// function that's triggered when the button is clicked
function clickedToStartTimerPresentQuestion() {
  //set all of the elements in the original display to be hidden
  var gameRules = document.getElementById('gameRules');
  //document.getElementById('startBtn').style.display = 'none';
  gameRules.style.display = 'none';
  grabStartBtn.classList.add('hide');
  //call two other starting functions
  startTimer();
  displayQuestion();
}
function displayQuestion() {
  var currentQuestion = questions[currentQuestionIndex]; // this is going to be the question that we are going to start to add to the page
  //clear out quizContainer so we can remove past questions, this only comes into play when we are on the second or any question after the first
  document.getElementById('quizContainer').innerHTML = '';

  var h2Question = document.createElement('h2');
  h2Question.innerText = currentQuestion.question;
  // now we have an h2 element that is going to be able to display to the page so lets append it
  document.getElementById('quizContainer').appendChild(h2Question);

  //next step is to loop through
  for (var i = 0; i < currentQuestion.answers.length; i++) {
    //here you will add console.log
    //console.log(currentQuestion.answers[i]);
    var answerBtn = document.createElement('button');

    answerBtn.innerText = currentQuestion.answers[i].text;
    //
    document.getElementById('quizContainer').appendChild(answerBtn);
    answerBtn.addEventListener('click', function (event) {
      console.log(event.target);

      if (event.target.innerText === currentQuestion.correctAnswer) {
        console.log('clicked right answer');
        score++;
        scoreDisplay.textContent = 'score: ' + score;
      } else {
        timeRemaining--;
      }
      //clear section with questions and increase Question index counter
      //show questions again w/ new index counter
    });
  }
}
document
  .getElementById('quizContainer')
  .addEventListener('click', function (event) {
    //start of function
    event.preventDefault();
    console.log(currentQuestionIndex);
    console.log(questions.length - 1, currentQuestionIndex);
    if (questions.length - 1 > currentQuestionIndex) {
      //ts saying "if theres any q's left in q's array"
      currentQuestionIndex++; //then increment currentQuestionINdex by 1
      displayQuestion(); //calling function degined elsewhere to display next question
    } else {
      handleHighScore(); // else calls handleHIghscore func
    }
  });

// Attached eventListener to the button to trigger the function
/*grabStartBtn.addEventListener('click', clickedToStartTimerPresentQuestion);
function clickedToStartTimerPresentQuestion() {
  //set all of the elements in the original display to be hidden
  var gameRules = document.getElementById('gameRules');
  gameRules.style.display = 'none';
  //call two other starting functions
  startTimer();
  displayQuestion();
} */
