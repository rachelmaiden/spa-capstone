var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('ne/views/index')
})

router.get('/profile', (req, res) => {
    res.render('ne/views/profile')
})

router.post('/profile', (req, res) => {
    console.log('hello')
})

exports.helloworld = router