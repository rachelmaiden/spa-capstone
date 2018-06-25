var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('home/views/index')
})

router.get('/adminAmenities', (req, res) => {
    res.render('home/views/adminAmenities')
})

router.get('/adminCustomer', (req, res) => {
    res.render('home/views/adminCustomer')

})

router.get('/adminReservation',(req, res) => {
    res.render('home/views/adminReservation')
})

router.get('/bookReservation',(req, res) => {
    res.render('home/views/bookReservation')
})

router.get('/selectDate',(req, res) => {
    res.render('home/views/selectDate')
})

router.post('/adminAme', (req, res) => {
    console.log('hello')
})

exports.index = router