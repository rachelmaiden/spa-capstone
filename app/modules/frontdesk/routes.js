var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();
var mid = require("../../middlewares")

// [FRONTDESK-HOME]
router.get('/frontdesk/fdRegistration',mid.frontdesknauthed,(req,res)=>{
  res.render('frontdesk/fdRegistration')
})

// [FRONT DESK - LOGIN PAGE] 
router.get('/frontdesk', (req, res) => {
  res.render('frontdesk/frontdesk')
})
// [LOGIN]
router.post("/frontdesk/login",(req, res) => {
	const query = `
		select * from admin_tbl where admin_username = "${req.body.admin_username}" and admin_desc="front_desk"`

		db.query(query, (err, out) => {
 		if(!out[0])
			return res.redirect("/frontdesk#notfound")
		else {
			if(out[0].admin_password !== req.body.admin_password)
				return res.redirect("/frontdesk#incorrect")
			else {
				delete out[0].admin_password
				req.session.user = out[0]	
				return res.redirect("/frontdesk/fdRegistration")
			}
		}

	})
// [LOG OUT]
router.post("/frontdesk/logout", (req, res) => {
  req.session.destroy(err => {
    if(err) console.err
    res.redirect("/frontdesk")
  })
})
  

// [SEARCH]
router.post('/frontdesk/search', (req, res) => {
  console.log(req.body.searchBar)
  const query= `SELECT * FROM customer_tbl WHERE
  cust_fname LIKE '%${req.body.searchBar}%' OR
  cust_mname LIKE '%${req.body.searchBar}%' OR
  cust_lname LIKE '%${req.body.searchBar}%' OR
  CONCAT(cust_fname," ",cust_lname)  = '${req.body.searchBar}' AND delete_stats=0
  `
  db.query(query, (err,out)=>{
    res.send({out:out})
    console.log(query)
    console.log(out)
  })
})

//[ADD NEW CUSTOMER]
router.post('/frontdesk/Home/newCustomer',(req, res) => {
  const query= `select * from customer_tbl where cust_fname LIKE "%${req.body.firstname}%" and cust_lname LIKE "%${req.body.lastname}%" 
  and cust_birthMonth LIKE "%${req.body.month}%" and cust_birthDate LIKE "%${req.body.date}%" and cust_birthYear LIKE "%${req.body.year}%"`
  
  db.query(query, (err, out) => {
    if(out== undefined || out == 0)
    {
    var alertSuccess = 1 ;
    const query = `
    insert into 
    customer_tbl(cust_fname,cust_mname, cust_lname, cust_birthMonth, cust_birthDate, cust_birthYear, address_house_no,address_street_name,address_admin_district,address_city, cust_contact_no, cust_gender, medical_history, delete_stats) 
    values("${req.body.firstname}","${req.body.middlename}","${req.body.lastname}", "${req.body.month}","${req.body.date}","${req.body.year}", 
    "${req.body.house_no}","${req.body.street_name}","${req.body.brgy_district}","${req.body.city}", "${req.body.contact_no}", "${req.body.gender}", "${req.body.medical_history}",0)
    `

    db.query(query, (err, out) => {
      console.log("----------------------------")
      console.log("CUSTOMER NOT EXIST")
      console.log("----------------------------")
      console.log("NAGINSERT CHECK MO PA SA DB")
      console.log("----------------------------")
      console.log(query)
      console.log(alertSuccess)
      res.render('frontdesk/Home',{
        alertSuccess
      })
    })
    }
    else if(out != undefined) 
    {
      db.query(query, (err, out) => {
        console.log("----------------------------")
        console.log("CUSTOMER ALREADY EXIST")
        console.log("----------------------------")
        console.log("DI NAGINSERT CHECK MO PA SA DB")
        console.log("----------------------------")
        return res.redirect("/frontdesk/Home?customeralreadyexist?")
      })
    }
  })
})
})



// [RESERVATION]
router.get('/reservation',mid.frontdesknauthed,(req, res) => {
  date = req.query.date
  console.log(date)
  console.log('ID NI CUSTOMER')
  console.log(customerId)
  const query = `
  SELECT services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc from services_tbl join service_duration_tbl 
  on services_tbl.service_duration_id = service_duration_tbl.service_duration_id join service_type_tbl 
  on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats=0 and services_tbl.service_availability=0; 
  SELECT * FROM promo_bundle_tbl where delete_stats = 0;
  SELECT * FROM room_tbl where delete_stats=0 and room_availability= 0 and room_type_id=2;
  SELECT * FROM room_tbl where delete_stats=0 and room_availability= 0 and room_type_id=6;
  SELECT * FROM therapist_tbl where delete_stats=0 and therapist_availability= 0;
  SELECT * FROM customer_tbl where delete_stats=0 and cust_id=${customerId}`
  
  // SELECT services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc from services_tbl join service_duration_tbl 
  // on services_tbl.service_duration_id = service_duration_tbl.service_duration_id join service_type_tbl 
  // on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats=0 and services_tbl.service_type_id= 1;
  // SELECT services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc from services_tbl join service_duration_tbl 
  // on services_tbl.service_duration_id = service_duration_tbl.service_duration_id join service_type_tbl 
  // on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats=0 and services_tbl.service_type_id= 2;
  // SELECT services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc from services_tbl join service_duration_tbl 
  // on services_tbl.service_duration_id = service_duration_tbl.service_duration_id join service_type_tbl 
  // on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats=0 and services_tbl.service_type_id= 3;
  db.query(query,(err,out) =>{
      res.render('frontdesk/reservation',{
        services: out[0],
        promos: out[1],
        crooms: out[2],
        prooms: out[3],
        therapists: out[4],
        customers: out[5],
        date
      })
      console.log(date)
    })
  })


router.post('/reservation/query',(req, res) => {
  const query = `select * from room_tbl where delete_stats=0 and room_availability=0`
  db.query(query,(err, out) => {
    res.send(out)
  })
})



// [BOOK RESERVATION - SELECTING DATE]
router.get('/selectDate',mid.frontdesknauthed,(req,res)=>{
  res.render('frontdesk/selectDate')
})

// [BOOK RESERVATION - SELECTING DATE]
router.get('/selectDate/:cust_id',mid.frontdesknauthed,(req, res) => {
  customerId = req.params.cust_id
  console.log(customerId)
  const query = `SELECT * FROM customer_tbl where cust_id= ${req.params.cust_id}`
  db.query(query,(err,out) =>{
		res.render("frontdesk/selectDate",{
      customers: out,
      customerId
		})
	})
})

router.get('/fdReservation', (req, res) => {
  res.render('frontdesk/fdReservation')
})

router.get('/fdBookReservation', (req, res) => {
  res.render('frontdesk/fdBookReservation')
})



exports.frontdesk = router;