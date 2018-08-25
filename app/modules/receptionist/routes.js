var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();


router.get('/receptionist', (req, res) => {
  res.render('receptionist/receptionist')
})

  router.get('/queue',(req, res) => {
      res.render('receptionist/queue')
    })


  

exports.receptionist = router;