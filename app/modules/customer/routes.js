var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();


  router.get('/home',(req, res) => {
      res.render('customer/home')
    })

  router.get('/login',(req, res) => {
    res.render('customer/login')
  })


exports.customer = router;