const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = 'https://quiz.api.fdnd.nl/v1/question'
const quizUrl = 'https://quiz.api.fdnd.nl/v1/quiz'

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

module.exports = router