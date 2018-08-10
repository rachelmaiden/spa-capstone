var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();


  router.get('/custHome',(req, res) => {
      res.render('customer/custHome')
    })


  router.get('/custProfile',(req, res) => {
      res.render('customer/custProfile')
    })

  router.get('/custLogin',(req, res) => {
    res.render('customer/custLogin')
  })


  

exports.customer = router;