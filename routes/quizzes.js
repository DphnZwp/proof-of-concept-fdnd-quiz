const express = require('express')
const router = express.Router()
const app = express()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const quizUrl = 'https://quiz.api.fdnd.nl/v1/quiz'

app.get('/', (request, response) => {
    response.render('index.ejs')
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