const express = require('express')
const router = express.Router()

router.get('/resultaten', (request, response) => {
  response.render('results')
})

module.exports = router