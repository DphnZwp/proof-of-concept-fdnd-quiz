const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = 'https://quiz.api.fdnd.nl/v1/question'
const quizUrl = 'https://quiz.api.fdnd.nl/v1/quiz'

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

module.exports = router