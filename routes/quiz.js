const express = require('express')
const app = express()
const router = express.Router()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const url = 'https://quiz.api.fdnd.nl/v1/question'

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