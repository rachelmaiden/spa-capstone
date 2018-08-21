var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();


  router.get('/queue',(req, res) => {
      res.render('receptionist/queue')
    })


  router.get('/custProfile',(req, res) => {
      res.render('customer/custProfile')
    })

  router.get('/custLogin',(req, res) => {
    res.render('customer/custLogin')
  })


  

exports.receptionist = router;