const apiBase = '/json/quiz.json'
const form = document.querySelector(".quiz-form")
const qusEl = document.querySelector(".question")
const optionsEl = document.querySelector(".all-options")
const scoreEl = document.querySelector(".score-board .score-number")
const answeredEl = document.querySelector(".score-board .answered-number")
const nextButton = document.querySelector(".nextButton")

let question, answer
let options = []
let score = 0
let answeredQuestion = 0

// renderQuiz()
getCurrentIndex(1)

async function fetchQuiz() {
  const response = await fetch(apiBase)
  const data = await response.json()
  options = data
}

// async function renderQuiz() {
//   await fetchQuiz()
//   // console.log(options)
//   let questions = ""
//   let answers = ""
//   options.forEach(quiz => {
//     rightAnswer = quiz.correct_answer
//     let possibleAnswers = quiz.incorrect_answers
//     possibleAnswers.splice(Math.floor(Math.random() * 3), 0, rightAnswer)
//     possibleAnswers.map((answer, index) => {
//       answers += `
//         <div class="option">
//           <input type="radio" id="option${index + 1}" value="${answer}" name="quiz">
//           <label for="option${index + 1}">
//             <span class="letter">${String.fromCharCode(96 + index + 1).toUpperCase()}</span> ${answer}
//           </label>
//         </div>
//       `
//     })
//     questions += `
//       <h1> ${quiz.question}</h1>
//     `
//   })
//   qusEl.innerHTML = questions
//   optionsEl.innerHTML = answers
// }

async function getCurrentIndex(questionId) {
  await fetchQuiz()
  let currentIndex = options.findIndex(question => question.questionId === questionId)
  let nextIndex = currentIndex+1 > options.length ? 0 : currentIndex+1
  let currentQuestion = options[currentIndex]
  let nextQuestion = options[nextIndex]
  renderQuestion(currentQuestion)
  nextPage(currentQuestion, nextQuestion)
}

function renderQuestion(currentQuestion) {
  rightAnswer = currentQuestion.correct_answer
  let possibleAnswers = currentQuestion.incorrect_answers
  possibleAnswers.splice(Math.floor(Math.random() * 3), 0, rightAnswer)
  qusEl.innerText = currentQuestion.question
  possibleAnswers.map((answer, index) => {
    const item = document.createElement("div")
    item.classList.add("option")
    item.innerHTML = `
    <input type="radio" id="option${index + 1}" value="${answer}" name="quiz">
    <label for="option${index + 1}">
      <span class="letter">${String.fromCharCode(96 + index + 1).toUpperCase()}</span> ${answer}
    </label>
  `
    optionsEl.appendChild(item)
  })
}

function renderNextQuestion(nextQuestion) {
  rightAnswer = nextQuestion.correct_answer
  let possibleAnswers = nextQuestion.incorrect_answers
  possibleAnswers.splice(Math.floor(Math.random() * 3), 0, rightAnswer)
  qusEl.innerText = nextQuestion.question
  possibleAnswers.map((answer, index) => {
    const item = document.createElement("div")
    item.classList.add("option")
    item.innerHTML = `
    <input type="radio" id="option${index + 1}" value="${answer}" name="quiz">
    <label for="option${index + 1}">
      <span class="letter">${String.fromCharCode(96 + index + 1).toUpperCase()}</span> ${answer}
    </label>
  `
    optionsEl.appendChild(item)
  })
}

function nextPage(currentQuestion, nextQuestion) {
  nextButton.addEventListener('click', () => {
    renderNextQuestion(nextQuestion)
  })
}


// form.addEventListener('submit', (e) => {
//   e.preventDefault()

//   if(e.target.quiz.value) {
//     checkQuiz(e.target.quiz.value)
//   } else {
//     return
//   }
// })

// function checkQuiz (selected) {
//   answeredQuestion++
//   if(selected === rightAnswer) {
//     score++
//   }
  
//   updateScoreBoard()
//   form.quiz.forEach(input => {
//     if(input.value === rightAnswer) {
//       input.parentElement.classList.add('correct')
//     }
//   })
// }

// function updateScoreBoard() {
//   scoreEl.innerText = score
//   answeredEl.innerText = answeredQuestion
// }