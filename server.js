const express = require('express')
const path = require('path')
const compression = require('compression')
const app = express()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const url = 'https://quiz.api.fdnd.nl/v1/question'
const quizUrl = 'https://quiz.api.fdnd.nl/v1/quiz'
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))

// Routes
app.get('/', (request, response) => {
  response.render('index')
})

// POST quiz
app.post('/quiz-aanmaken', urlencodedParser, (request, response) =>{
  const postData = {
    method: 'POST',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(quizUrl, postData).then(function () {
    response.render('add')
  })
})

app.get('/quiz-aanmaken', (request, response) => {
    response.render('add')
})

// POST question
app.post('/vragen-aanmaken', urlencodedParser, (request, response) => {
  const postData = {
    method: 'post',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(url, postData).then((jsonData) => {
    response.render('add-questions')
  })
})

app.get('/vragen-aanmaken', async (request, response) => {
    response.render('add-questions')
})

// DELETE quiz
app.post('/quiz-verwijderen', urlencodedParser, (request, response) =>{
  const postData = {
    method: 'delete',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(quizUrl, postData).then(function () {
    response.render('delete', {
      title: 'Smart zone toevoegen',
    })
  })
})

app.get('/quiz-verwijderen', (request, response) => {
    response.render('delete', {
      title: 'Smart zone toevoegen',
    })
})

// DELETE question
app.post('/vragen-verwijderen', urlencodedParser, (request, response) =>{
  const postData = {
    method: 'delete',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(url, postData).then(function () {
    response.render('delete', {
      title: 'Smart zone toevoegen',
    })
  })
})

app.get('/vragen-verwijderen', (request, response) => {
    response.render('delete', {
      title: 'Smart zone toevoegen',
    })
})

app.get('/quiz/:question_id', (request, response) => {
  fetchJson(`${url}/${request.params.question_id}`).then((jsonData) => {
    let data = jsonData.data[0]
    console.log(data);
    let answers = [...data.incorrect_answer.split(','), data.correct_answer]
    if(data.type == 'MC' || data.type == 'Meerkeuze') {
      response.render('question-mc', {
        question: data.question,
        answers: shuffle(answers),
        links: data.question_id,
      })
    } // hier kan je nog meer soorten vragen renderen.
  })
})

// Cache Headers
app.use((req, res, next) => {
  res.set('Cache-control', 'public, max-age=300')
  next()
})

// Compress all response
app.use(compression())

// Server port
app.set('port', process.env.PORT || 9000)

const server = app.listen(app.get('port'), () => {
  console.log(`Application started on port: ${app.get('port')}`)
})

// Fetch
async function fetchJson(quizUrl, postData = {}) {
  return await fetch(quizUrl, postData)
    .then((response) => response.json())
    .catch((error) => error)
}

async function fetchJson(url, postData = {}) {
  return await fetch(url, postData)
    .then((response) => response.json())
    .catch((error) => error)
}

// Fisher-Yates shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}