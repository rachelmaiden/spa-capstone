var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();

router.get('/', (req, res) => {
    res.render('home/views/admindashboard')
})

router.get('/adminAmenities', (req, res) => {
    res.render('home/views/adminAmenities')
})

router.get('/adminCustomer', (req, res) => {
    res.render('home/views/adminCustomer')

})

router.get('/adminPromos', (req, res) => {
    res.render('home/views/adminPromos')

})

router.get('/adminRooms', (req, res) => {
    res.render('home/views/adminRooms')

})

router.get('/adminServices', (req, res) => {
    res.render('home/views/adminServices')

})

router.get('/adminTherapist', (req, res) => {
    res.render('home/views/adminTherapist')

})

router.get('/adminReservation',(req, res) => {
    res.render('home/views/adminReservation')
})

router.get('/adminQueue',(req, res) => {
    res.render('home/views/adminQueue')
})

router.get('/bookReservation',(req, res) => {
    console.log(req.query)
    res.render('home/views/bookReservation',{date: req.query.date})
})

router.post('/bookReservation',(req, res) => {
    console.log(req.body) //galing sa form na sinubmit
    db.query(`select cust_id where username=${req.body.username}`,(err, results, fields) =>{
        if(err) return console.log(err)
        db.query('insert into reservation_appointment_tbl values ')
    })
})



router.get('/selectDate',(req, res) => {
    res.render('home/views/selectDate')
})

router.post('/adminAme', (req, res) => {
    console.log('hello')
})

exports.index = router