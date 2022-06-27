const apiBase = 'https://quiz.api.fdnd.nl/v1/question'
const form = document.querySelector(".quiz-form")
// const qusEl = document.querySelector(".question")
// const qusCon = document.querySelector(".question-container")
// const optionsEl = document.querySelector(".all-options")
const scoreEl = document.querySelector(".score-board .score-number")
const answeredEl = document.querySelector(".score-board .answered-number")
const nextButton = document.querySelector(".nextButton")

let score = 0
let answeredQuestion = 0

async function fetchQuiz() {
  const response = await fetch(apiBase)
  const data = await response.json()
  options = data.data
}

//   fetch(apiBase, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
// })

// async function getCurrentQuestionIndex(questionId) {
//   await fetchQuiz()
//   let currentIndex = options.findIndex(question => question.questionId === questionId)
//   let nextIndex = currentIndex+1 > options.length ? 0 : currentIndex+1
//   let currentQuestion = options[currentIndex]
//   console.log(currentQuestion)
//   let nextQuestion = options[nextIndex]
//   renderQuestion(currentQuestion)
//   nextPage(currentQuestion, nextQuestion)
// }

// function renderQuestion(currentQuestion) {
//   rightAnswer = currentQuestion.correct_answer
//   let possibleAnswers = currentQuestion.incorrect_answers
//   possibleAnswers.splice(Math.floor(Math.random() * 3), 0, rightAnswer)
//   let possibleAnswersArray = possibleAnswers.split(',')
//   qusEl.textContent = currentQuestion.question
//   possibleAnswers.map((answer, index) => {
//     const item = document.createElement("div")
//     item.classList.add("option")
//     item.innerHTML = `
//     <input type="radio" id="option${index + 1}" value="${answer}" name="quiz">
//     <label for="option${index + 1}">
//       <span class="letter">
//         ${String.fromCharCode(96 + index + 1).toUpperCase()}.
//       </span> 
//         ${answer}
//     </label>
//   `
//     optionsEl.appendChild(item)
//   })
// }

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if(e.target.quiz.value) {
    checkQuiz(e.target.quiz.value)
  } else {
    return
  }
})

async function checkQuiz (selected) {
  await fetchQuiz()
  rightAnswer = options.correct_answer

  answeredQuestion++
  if(selected === rightAnswer) {
    score++
  }
  
  updateScoreBoard()
  form.quiz.forEach(input => {
    if(input.value === rightAnswer) {
      input.parentElement.classList.add('correct')
    }
  })
}

function updateScoreBoard() {
  scoreEl.innerText = score
  answeredEl.innerText = answeredQuestion
}