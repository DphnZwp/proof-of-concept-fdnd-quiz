const express = require('express')
const path = require('path')
const compression = require('compression')
const app = express()
const PORT = process.env.PORT || 9000
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const url = 'https://quiz.api.fdnd.nl/v1/question'
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))

// Routes
app.get('/', (request, response) => {
  response.render('index')
})

// POST form
// app.post('/quiz-aanmaken', urlencodedParser, (request,response) =>{
//   const postData = {
//     method: 'post',
//     body: JSON.stringify(request.body),
//     headers: {'Content-Type': 'application/json'}
//   }
//   fetchJson(url, postData).then(function () {
//     response.render('quiz-aanmaken')
//   })
// })

// app.get('/quiz-aanmaken', (request, response) => {
//     response.render('quiz-aanmaken')
// })

app.get('/quiz/:question_id', (request, response) => {
  fetchJson(`${url}/${request.params.question_id}`).then((jsonData) => {
    let data = jsonData.data[0]
    let answers = [...data.incorrect_answer.split(','), data.correct_answer]

    if(data.type == 'MC') {
      response.render('question-mc', {
        question_id: data.question_id,
        question: data.question,
        answers: shuffle(answers)
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
const server = app.listen(PORT, () => {
  console.log(`Application started on port: ${PORT}`)
})

// Fetch
async function fetchJson(url, jsonData = {}) {
  return await fetch(url, jsonData)
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