const express = require('express')
const app = express()
const router = express.Router()

app.get('/resultaten', (request, response) => {
  response.render('results')
})

module.exports = router