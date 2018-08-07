var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();


router.get('/custHome',(req, res) => {
    res.render('customer/custHome')
  })


exports.maintenance = router