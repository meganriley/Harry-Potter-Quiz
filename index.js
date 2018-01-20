let questionNumber = 0;
let score= 0;

//Generate the quiz HTML
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return `<div class="question-${questionNumber}">
    <h2>${STORE[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[0]}" name="answer" required>
    <span>${STORE[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[1]}" name="answer" required>
    <span>${STORE[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[2]}" name="answer" required>
    <span>${STORE[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${STORE[questionNumber].answers[3]}" name="answer" required>
    <span>${STORE[questionNumber].answers[3]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questionNumber').text(10)
  }
}
function changeQuestionNumber () {
  //if (questionNumber < STORE.length) {
    questionNumber ++;
  //}
  $('.questionNumber').text(questionNumber+1);
}

function changeScore () {
  score ++;
}

function startQuiz () {
  $('.quizStart').on('click', '.startButton', function (event) {
    $('.quizStart').remove();
    $('.questionAnswerForm').css('display', 'block');
    $('.questionNumber').text(1);
});
}

function renderQuestion () {
  $('.questionAnswerForm').html(generateQuestion());
}

function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}


function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

function userAnswerFeedbackCorrect () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>That's right! 10 points for Gryffindor!</b></p><button type=button class="nextButton">Next</button></div>`);
}

function userAnswerFeedbackWrong () {
  let correctAnswer = `${STORE[questionNumber].correctAnswer}`;
  // let iconImage = `${STORE[questionNumber].icon}`;
  $('.questionAnswerForm').html(`<div class="correctFeedback"><div class="icon"><img src="${STORE[questionNumber].icon}" alt="${STORE[questionNumber].alt}"/></div><p><b>Wrong answer! Did you even study?</b><br>The correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

function updateScore () {
  changeScore();
  $('.score').text(score);
}

function renderResults () {
  if (score >= 6) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Outstanding</h3><img src="http://outrageoussports.com.au/wp-content/uploads/2013/04/quidditch.jpg" alt="Harry Potter winning"/><p>You got ${score} / 10</p><p>Even Hermione Granger is jealous of your score!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 5 && score >= 3) {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>That's a failing grade</h3><img src="http://images3.wikia.nocookie.net/__cb20120119072854/harrypotter/images/d/d1/Neville_cap13.jpg" alt="Neville Longbottom"/><p>You got ${score} / 10</p><p>You may as well have gotten a T for Troll.</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.questionAnswerForm').html(`<div class="results correctFeedback"><h3>Dreadful.</h3><img src="https://cnet4.cbsistatic.com/img/kox8GZhF6kRqjq2nxkhUYmCuKKk=/fit-in/570x0/2016/01/14/365f60ee-4d02-4fbe-baa5-bc06c2b35749/snape1.jpg" alt="Professor Snape"/><p>You got ${score} / 10</p><p>Do you even go to Hogwarts??</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

//what happens when the user clicks next
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//run quiz functions
function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
