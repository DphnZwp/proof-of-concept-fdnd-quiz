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
  fetchJson(quizUrl).then(function (
    jsonData
  ) {
    response.render('index', {
      name: jsonData.data[0].name,
    })
  })
})

app.get('/resultaten', (request, response) => {
  response.render('results')
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

// PUT quiz
app.post('/quiz-bewerken', urlencodedParser, (request, response) =>{
  const postData = {
    method: 'PUT',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(quizUrl, postData).then(function () {
    response.render('edit')
  })
})

app.get('/quiz-bewerken', (request, response) => {
    response.render('edit')
})

// PUT question
app.post('/vragen-bewerken', urlencodedParser, (request, response) => {
  const postData = {
    method: 'PUT',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(url, postData).then((jsonData) => {
    response.render('edit-questions')
  })
})

app.get('/vragen-bewerken', async (request, response) => {
    response.render('edit-questions')
})


// DELETE quiz
app.post('/quiz-verwijderen', urlencodedParser, (request, response) =>{
  const postData = {
    id: request.body.quiz_id
  }
  
  fetchJsonWithBody(quizUrl, {
    method: 'DELETE',
    body: JSON.stringify(postData),
    headers: {'Content-Type': 'application/json'}
  }).then((data) => {
    console.log(data)
    response.render('delete')
  })
})

app.get('/quiz-verwijderen', (request, response) => {
    response.render('delete')
})

// DELETE question
app.post('/vragen-verwijderen', urlencodedParser, (request, response) =>{
  const postData = {
    id: request.body.quiz_id
  }
  
  fetchJsonWithBody(url, {
    method: 'DELETE',
    body: JSON.stringify(postData),
    headers: {'Content-Type': 'application/json'}
  }).then((data) => {
    console.log(data)
    response.render('delete-questions')
  })
})

app.get('/vragen-verwijderen', (request, response) => {
    response.render('delete-questions')
})

app.get('/quiz/:question_id', (request, response) => {
  fetchJson(`${url}/${request.params.question_id}`).then((jsonData) => {
    let data = jsonData.data[0]
    console.log(data);
    let answers = [...data.incorrect_answer.split(','), data.correct_answer]
    
    if(data.type == 'Meerkeuze') {
      response.render('question-mc', {
        question: data.question,
        answers: shuffle(answers),
        next: data.question_id,
        data: data,
      })
    }
    if(data.type == 'Open vraag') {
      response.render('question-mc', {
        question: data.question,
        next: data.question_id,
        data: data,
      })
    }
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

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
 async function fetchJson(url, data) {
	return await fetch(url, data)
		.then((response) => response.json())
		.catch((error) => error);
}

/**
 * 
 * @param {*} url 
 * @param {*} body 
 * @returns 
 */
async function fetchJsonWithBody(url, body) {
  return await fetch(url, body)
    .then((response) => response.json())
		.catch((error) => error);
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