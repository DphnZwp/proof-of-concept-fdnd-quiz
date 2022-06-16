const express = require('express')
const path = require('path')
const compression = require('compression')
const app = express()
const PORT = process.env.PORT || 9000

app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname + '/public')))

// Routes
app.get('/', (request, response) => {
  response.render('index')
})

app.get('/quiz', (request, response) => {
  response.render('quiz')
})

app.get('/highscores', (request, response) => {
  response.render('highscores')
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