const express = require('express')
const app = express()
const path = require('path')
const compression = require('compression')
const port = process.env.port || 9000
app.listen(port, () => {
  console.log(`server running op port ${port}`)
})

app.use(express.static(path.join(__dirname + '/public')))
app.set('views', path.join(__dirname + '/views'))
app.set('view engine', 'ejs')

const homeRoute = require('./routes/quizzes')
const addRoute = require('./routes/add')
const editRoute = require('./routes/edit')
const deleteRoute = require('./routes/delete')
const quizRoute = require('./routes/quiz')
const resultsRoute = require('./routes/results')

// Routes
app.use('/', homeRoute)
app.use('/', addRoute)
app.use('/', editRoute)
app.use('/', deleteRoute)
app.use('/', quizRoute)
app.use('/', resultsRoute)

// Cache headers
app.use((request,response,next) =>{
  // cache get reqest
  if(request.method ==='GET'){
    response.set('Cache-control', 'public, max-age=500')
  } else{
    response.set('Cache-control', `no-store`)
  }
  next()
})
// Compress all response
app.use(compression())
