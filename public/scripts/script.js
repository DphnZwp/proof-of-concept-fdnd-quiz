const apiBase = 'https://quiz.api.fdnd.nl/v1/question'
const form = document.querySelector(".quiz-form")
const scoreEl = document.querySelector(".score-board .score-number")
const answeredEl = document.querySelector(".score-board .answered-number")
const nextButton = document.querySelector(".nextButton")
const restart = document.querySelector(".restart")

let options = []
let score = localStorage.getItem('score')
scoreEl.innerText = score

async function fetchQuiz() {
  const response = await fetch(apiBase)
  const data = await response.json()
  options = data.data
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if(e.target.quiz.value) {
    checkQuiz(e.target.quiz.value)
    console.log(e.target.quiz.value)
  } else {
    alert("selecteer een antwoord")
  }
})

async function checkQuiz (selected) {
  await fetchQuiz()
  const rightAnswer = options[0].correct_answer
  const rightAnswerTwo = options[1].correct_answer
  const rightAnswerThree = options[2].correct_answer
  const rightAnswerFour = options[3].correct_answer
  const rightAnswerFive = options[4].correct_answer
  const rightAnswerSix = options[5].correct_answer
  const rightAnswerSeven = options[6].correct_answer

  if(selected === rightAnswer || rightAnswerTwo || rightAnswerThree || rightAnswerFour || rightAnswerFive || rightAnswerSix || rightAnswerSeven) {
    score++
    scoreEl.innerText = score
    localStorage.setItem('score', score)
  }
}

restart.addEventListener('click', () => {
  score = 0
  scoreEl.innerText = score
  localStorage.setItem('score', score)
})