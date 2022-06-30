const apiBase = 'https://quiz.api.fdnd.nl/v1/question'
const form = document.querySelector(".quiz-form")
const scoreEl = document.querySelector(".score-board .score-number")
const answeredEl = document.querySelector(".score-board .answered-number")
const nextButton = document.querySelector(".nextButton")

let options = []
let score = 0
let answeredQuestion = 0

async function fetchQuiz() {
  const response = await fetch(apiBase)
  const data = await response.json()
  options = data.data
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if(e.target.quiz.value) {
    checkQuiz(e.target.quiz.value)
    // console.log(e.target.quiz.value)
  } else {
    alert("selecteer een antwoord")
  }
})

async function checkQuiz (selected) {
  await fetchQuiz()
  const rightAnswer = options[0].correct_answer
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