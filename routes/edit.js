const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = 'https://quiz.api.fdnd.nl/v1/question'
const quizUrl = 'https://quiz.api.fdnd.nl/v1/quiz'

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

module.exports = router