var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();
var mid = require("../../middlewares")
var moment = require ('moment')

// HOME PAGE
router.get('/receptionist', (req, res) => {
  res.render('receptionist/receptionist')
})
// [LOGIN]
router.post("/receptionist/login",(req, res) => {
	const query = `
		select * from admin_tbl where admin_username = "${req.body.admin_username}" and admin_desc="receptionist"`

		db.query(query, (err, out) => {
 		if(!out[0])
			return res.redirect("/receptionist/receptionist#notfound")
		else {
			if(out[0].admin_password !== req.body.admin_password)
				return res.redirect("/receptionist/receptionist#incorrect")
			else {
				delete out[0].admin_password
				req.session.user = out[0]	
				return res.redirect("/receptionist/home")
			}
		}

  })
})
// [LOG OUT]
router.post("/receptionist/logout", (req, res) => {
  req.session.destroy(err => {
    if(err) console.err
    res.redirect("/receptionist")
  })
})


// QUEUE
router.get('/home',mid.receptionistnauthed,(req, res) => {
      var fullDate = moment(new Date()).format('MM-DD-YYYY')
      console.log(fullDate)
      const query = `SELECT walkin_queue_tbl.*, walkin_services_tbl.*, customer_tbl.*, services_tbl.*, room_tbl.*
      from walkin_queue_tbl 
      join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
      join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
      join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
      join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id AND room_tbl.room_type_id= '2' AND walkin_date='${fullDate}' group by walkin_services_tbl.walkin_id`
      db.query(query,(err,out)=>{
        res.render('receptionist/queue',{
          walkins: out
        })
      })
    })



// RESERVATION
  router.get('/reservationList',mid.receptionistnauthed,(req, res) => {
    var fullDate = moment(new Date()).format('MM-DD-YYYY')
    console.log(fullDate)
    const query = `SELECT walkin_queue_tbl.*, walkin_services_tbl.*, customer_tbl.*, services_tbl.*, room_tbl.*
    from walkin_queue_tbl 
    join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
    join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
    join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
    join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id AND room_tbl.room_type_id != '2' AND walkin_date >= '${fullDate}' group by walkin_services_tbl.walkin_id`
    db.query(query,(err,out)=>{
      res.render('receptionist/reservationList',{
        reservs: out
      })
    })
  })

  router.get('/ongoing',mid.receptionistnauthed,(req, res) => {
    res.render('receptionist/ongoing')
  })  

  

exports.receptionist = router;