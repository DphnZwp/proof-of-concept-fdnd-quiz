const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = 'https://quiz.api.fdnd.nl/v1/question'
const quizUrl = 'https://quiz.api.fdnd.nl/v1/quiz'

// PUT quiz
router.post('/quiz-bewerken', urlencodedParser, (request, response) =>{
  const postData = {
    method: 'PUT',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(quizUrl, postData).then(function () {
    response.render('edit')
  })
})

router.get('/quiz-bewerken', (request, response) => {
    response.render('edit')
})

// PUT question
router.post('/vragen-bewerken', urlencodedParser, (request, response) => {
  const postData = {
    method: 'PUT',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(url, postData).then((jsonData) => {
    response.render('edit-questions')
  })
})

router.get('/vragen-bewerken', async (request, response) => {
    response.render('edit-questions')
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

module.exports = router