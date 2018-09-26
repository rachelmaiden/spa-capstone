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
      join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id AND room_tbl.room_type_id= '2' AND walkin_date='${fullDate}' AND walkin_indicator=0 group by walkin_services_tbl.walkin_id`
      db.query(query,(err,out)=>{
        res.render('receptionist/queue',{
          walkins: out
        })
      })
    })

  router.post('/home/queue/viewServices',(req,res)=>{
    console.log(req.body.id)
    const query = `SELECT walkin_queue_tbl.*, walkin_services_tbl.*, 
    customer_tbl.cust_fname, customer_tbl.cust_lname, customer_tbl.cust_mname, 
    services_tbl.service_name, services_tbl.service_price, 
    room_tbl.room_name, room_tbl.room_rate, therapist_tbl.*
      from walkin_queue_tbl 
      join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
      join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
      join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
      join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id
      join therapist_tbl on walkin_services_tbl.therapist_id = therapist_tbl.therapist_id where walkin_services_tbl.walkin_id=?`
    
    db.query(query,[req.body.id],(err,out)=>{
      var out1= out;
      const query1 = `SELECT walkin_queue_tbl.*, customer_tbl.* from walkin_queue_tbl join customer_tbl
      on walkin_queue_tbl.cust_id = customer_tbl.cust_id where walkin_queue_tbl.walkin_id =?`
      db.query(query1,[req.body.id],(err,out)=>{
        return res.send({out1:out1, out2:out[0]})
      })
      console.log(out)
    })
  })

router.post('/home/queue/MoveToOngoing',(req,res)=>{
  var alertSuccess = 0
  var notSuccess = 1
  const query = `UPDATE walkin_queue_tbl SET walkin_indicator= 1 WHERE walkin_id =?`

  db.query(query,[req.body.id],(err,out)=>{
    if(err)
    {
      console.log(err)
      res.send({alertSuccess:notSuccess})
    }
    else
    {
      res.send({alertSuccess:alertSuccess})
    }
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
      var fullDate = moment(new Date()).format('MM-DD-YYYY')
      console.log(fullDate)
      const query = `SELECT walkin_queue_tbl.*, walkin_services_tbl.*, customer_tbl.*, services_tbl.*, room_tbl.*
      from walkin_queue_tbl 
      join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
      join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
      join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
      join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id WHERE room_tbl.room_type_id= '2' AND walkin_date='${fullDate}' AND walkin_indicator=1 group by walkin_services_tbl.walkin_id`
      db.query(query,(err,out)=>{
        res.render('receptionist/ongoing',{
          ongoings: out
        })
      })
    })
  

router.post('/ongoing/viewServices',(req,res)=>{
  console.log(req.body.id)
  const query = `SELECT walkin_queue_tbl.*, walkin_services_tbl.*, 
  customer_tbl.cust_fname, customer_tbl.cust_lname, customer_tbl.cust_mname, 
  services_tbl.service_name, services_tbl.service_price, 
  room_tbl.room_name, room_tbl.room_rate
    from walkin_queue_tbl 
    join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
    join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
    join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
    join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id where walkin_services_tbl.walkin_id=?`
  
  db.query(query,[req.body.id],(err,out)=>{
    var out1= out;
    const query1 = `SELECT walkin_queue_tbl.*, customer_tbl.* from walkin_queue_tbl join customer_tbl
    on walkin_queue_tbl.cust_id = customer_tbl.cust_id where walkin_queue_tbl.walkin_id =?`
    db.query(query1,[req.body.id],(err,out)=>{
      return res.send({out1:out1, out2:out[0]})
    })
    console.log(out)
  })
})

router.post('/ongoing/Finish',(req,res)=>{
  var alertSuccess =0
  var notSuccess =1
  var id = req.body.id
  const query = `UPDATE walkin_queue_tbl SET walkin_indicator =2 where walkin_date="${req.body.walkin_date}" AND walkin_start_time="${req.body.startTime}" AND 
  walkin_end_time ="${req.body.endTime}" AND walkin_id ="${id}" `

  db.query(query,(err,out)=>{
    const query2 = `INSERT INTO services_availed_tbl (transaction_id) values("${id}")`
    console.log(query)

    db.query(query2,(err,out)=>{
      console.log(err)
      if(err)
      {
        res.send({alertSuccess:notSuccess})
      }
      else{
        res.send({alertSuccess:alertSuccess})
      }
    })
  })
})

exports.receptionist = router;