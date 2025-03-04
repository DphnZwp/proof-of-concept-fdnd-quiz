const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const url = 'https://quiz.api.fdnd.nl/v1/question'
const quizUrl = 'https://quiz.api.fdnd.nl/v1/quiz'

// POST quiz
router.post('/quiz-aanmaken', urlencodedParser, (request, response) =>{
  const postData = {
    method: 'POST',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(quizUrl, postData).then(function () {
    response.render('add')
  })
})

router.get('/quiz-aanmaken', (request, response) => {
    response.render('add')
})

// POST question
router.post('/vragen-aanmaken', urlencodedParser, (request, response) => {
  const postData = {
    method: 'post',
    body: JSON.stringify(request.body),
    headers: {'Content-Type': 'application/json'}
  }
  fetchJson(url, postData).then((jsonData) => {
    response.render('add-questions')
  })
})

router.get('/vragen-aanmaken', async (request, response) => {
    response.render('add-questions')
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