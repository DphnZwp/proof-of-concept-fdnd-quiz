const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = 'https://quiz.api.fdnd.nl/v1/question'
const quizUrl = 'https://quiz.api.fdnd.nl/v1/quiz'

// DELETE quiz
router.post('/quiz-verwijderen', urlencodedParser, (request, response) =>{
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

router.get('/quiz-verwijderen', (request, response) => {
    response.render('delete')
})

// DELETE question
router.post('/vragen-verwijderen', urlencodedParser, (request, response) =>{
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

router.get('/vragen-verwijderen', (request, response) => {
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

module.exports = router