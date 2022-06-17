const baseURL = "https://opentdb.com/api.php?amount=1&type=multiple"
const form = document.querySelector(".quiz-form")
const qusEl = document.querySelector(".question")
const optionsEl = document.querySelector(".all-options")
const scoreEl = document.querySelector(".score-board .score-number")
const answeredEl = document.querySelector(".score-board .answered-number")

let question, answer
let options = []
let score = 0
let answeredQuestion = 0

quizApp()

async function fetchQuiz(){
  const response = await fetch(baseURL)
  const data = await response.json()
  // console.log(data.results)
  return data.results
}

async function quizApp() {
  const data = await fetchQuiz()
  question = data[0].question
  options = []
  answer = data[0].correct_answer
  data[0].incorrect_answers.map(option => options.push(option))
  // Place correct answer in a random place between the incorrect options
  options.splice(Math.floor(Math.random() * options.length + 1), 0, answer)
  // console.log(options, answer)
  console.log(answer)
  renderQuiz(question, options)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if(e.target.quiz.value){
    checkQuiz(e.target.quiz.value)
    e.target.querySelector('button').style.display = 'none'
    // generateFinishButton()
  }else{
    return
  }
})

function renderQuiz(question, options) {
  optionsEl.innerHTML = "";
  qusEl.innerText = question
  options.map((option, index) => {
    const item = document.createElement("div")
    item.classList.add("option")
    item.innerHTML = `
    <input type="radio" id="option${index + 1}" value="${option}" name="quiz">
    <label for="option${index + 1}">
      <span class="letter">${String.fromCharCode(96 + index + 1).toUpperCase()}</span> ${option}
    </label>
  `
    optionsEl.appendChild(item)
  })
}

function checkQuiz (selected){
  answeredQuestion++
  if(selected === answer){
    score++
  }
  updateScoreBoard()
  form.quiz.forEach(input => {
    if(input.value === answer){
      input.parentElement.classList.add('correct')
    }
  })
}

function updateScoreBoard(){
  scoreEl.innerText = score
  answeredEl.innerText = answeredQuestion
}

// function generateFinishButton() {
//   const finishButton = document.createElement('button')
//   finishButton.innerText = 'Finish'
//   finishButton.setAttribute('')
// }