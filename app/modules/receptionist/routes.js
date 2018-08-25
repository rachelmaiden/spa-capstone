var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();


  router.get('/queue',(req, res) => {
      res.render('receptionist/queue')
    })

  router.get('/reservationList',(req, res) => {
    res.render('receptionist/reservationList')
  })  

  router.get('/ongoing',(req, res) => {
    res.render('receptionist/ongoing')
  })  

  

exports.receptionist = router;