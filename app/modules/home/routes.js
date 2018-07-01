var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();



router.get('/', (req, res) => {
    res.render('home/views/admindashboard')
})

router.get('/adminAmenities', (req, res) => {
    res.render('home/views/adminAmenities')
})
// ***************************************** C U S T O M E R *****************************************

 // READ 
router.get('/adminCustomer', (req, res) => {
    const query = ` select * from customer_tbl`
    db.query(query,(err,out) =>{
      res.render('home/views/adminCustomer',{
        customers: out
      })
      console.log(out)
    })
})

// CREATE(ADD)
router.post('/adminCustomer',(req, res) => {
  const query = `
    insert into 
    customer_tbl(cust_firstname,cust_middlename, cust_lastname, house_no,street_name,brgy_district,city, contact_no, cust_email, age) 
    values("${req.body.firstname}","${req.body.middlename}","${req.body.lastname}", 
      "${req.body.house_no}","${req.body.street_name}","${req.body.brgy_district}","${req.body.city}", "${req.body.contact_no}","${req.body.email}","${req.body.age}")
        `
  db.query(query, (err, out) => {
    res.redirect('/adminCustomer')
    console.log(query)
  })
})

// DELETE
router.post('/adminCustomer/delete', (req, res) => {
    console.log(req.body.id)
    const query = `delete from customer_tbl where cust_id = ${req.body.id}`
      
    db.query(query,(err,out)=>{
      res.redirect('/adminCustomer')
    })
  })

// ***************************************** P R O M O  B U N D L E *****************************************
//READ
router.get('/adminPromos', (req, res) => {
    const query = ` select * from promo_bundle_tbl;
    select * from services_tbl `
    db.query(query,(err,out) =>{
      res.render('home/views/adminPromos',{
        promos: out[0],
        services: out[1]
      })
      console.log(out[0])
      console.log(out[1])
    })
})
// CREATE(ADD)
router.post('/adminPromos',(req, res) => {
    const query = `
      insert into 
      promo_bundle_tbl(promobundle_name, services_included, duration, promobundle_price,promobundle_valid)
      value("${req.body.name}","${req.body.promos}","${req.body.duration}","${req.body.price}","${req.body.valid}")`
    db.query(query, (err, out) => {
      res.redirect('/adminPromos')
      console.log(query)
    })
  })

// DELETE
router.post('/adminPromos/delete', (req, res) => {
    console.log(req.body.id)
    const query = `delete from promo_bundle_tbl where promobundle_id = ${req.body.id}`
      
    db.query(query,(err,out)=>{
      res.redirect('/adminPromos')
    })
  }) 
// ***************************************** R O O M *****************************************
//READ
router.get('/adminRooms', (req, res) => {
    const query = ` select * from room_tbl `
    db.query(query,(err,out) =>{
      res.render('home/views/adminRooms',{
        rooms: out
      })
      console.log(out)
    })
})
// CREATE(ADD)
router.post('/adminRooms',(req, res) => {
    const query = `
      insert into 
      room_tbl(room_name, room_type,bed_qty)
      value("${req.body.name}","${req.body.type}","${req.body.quantity}")`
    db.query(query, (err, out) => {
      res.redirect('/adminRooms')
      console.log(query)
    })
  })
// DELETE
router.post('/adminRooms/delete', (req, res) => {
    console.log(req.body.id)
    const query = `delete from room_tbl where room_id = ${req.body.id}`
      
    db.query(query,(err,out)=>{
      res.redirect('/adminRooms')
    })
  })


// ***************************************** S E R V I C E *****************************************
//READ
router.get('/adminServices', (req, res) => {
    const query = ` select services_tbl.*, service_type.* from services_tbl, service_type 
    where 
    services_tbl.service_type = service_type.service_type_id;
    select * from service_type`
    db.query(query,(err,out) =>{
      res.render('home/views/adminServices',{
        services: out[0],
        typs: out[1]
      })
      console.log(out)
    })
})
// CREATE(ADD)
router.post('/adminServices',(req, res) => {
    const query = `
      insert into 
      services_tbl(service_name, service_type, service_duration, service_price)
      value("${req.body.name}","${req.body.type}","${req.body.duration}","${req.body.price}")`
    db.query(query, (err, out) => {
      res.redirect('/adminServices')
      console.log(query)
    })
  })

// DELETE
router.post('/adminServices/delete', (req, res) => {
    console.log(req.body.id)
    const query = `delete from services_tbl where service_id = ${req.body.id}`
      
    db.query(query,(err,out)=>{
      res.redirect('/adminServices')
    })
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
// ***************************************** B O O K  R E S E R V A T I O N *****************************************
router.get('/bookReservation', (req, res) => {
  const query = ` select * from services_tbl where service_type ='1';
  select * from services_tbl where service_type ='2';
  select * from services_tbl where service_type ='3'`
  db.query(query,(err,out) =>{
    res.render('home/views/bookReservation',{
      bodys: out[0],
      scrubs: out[1],
      adds: out[2]
    })
    console.log(out)
  })
})

router.get('/selectDate',(req, res) => {
    res.render('home/views/selectDate')
})

router.post('/adminAme', (req, res) => {
    console.log('hello')
})

exports.index = router