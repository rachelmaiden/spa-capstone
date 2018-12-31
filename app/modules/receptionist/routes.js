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


// [QUEUE - VIEW]
router.get('/home',mid.receptionistnauthed,(req, res) => {
      var fullDate = moment(new Date()).format('MM-DD-YYYY')
      console.log(fullDate)
  const query = `SELECT *
  FROM walkin_queue_tbl 
  JOIN walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
  JOIN customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
  JOIN services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
  JOIN room_tbl on room_tbl.room_id = walkin_services_tbl.room_id 
  JOIN therapist_in_service_tbl ON therapist_in_service_tbl.walkin_id = walkin_queue_tbl.walkin_id
  JOIN therapist_tbl ON therapist_tbl.therapist_id = therapist_in_service_tbl.therapist_id
  WHERE walkin_queue_tbl.walkin_date = CURDATE() AND walkin_indicator = 0 GROUP BY walkin_services_tbl.walkin_id;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out)=>{
    req.session.utilities = out[1]

    for(var i=0;i<out[0].length;i++)
    {
      out[0][i].walkin_date = moment(out[0][i].walkin_date).format('MMMM DD, YYYY')
    }
    res.render('receptionist/queue',{
      walkins: out[0],
      reqSession: req.session
    })
  })
})
// [QUEUE - VIEW SERVICES]
router.post('/home/queue/viewServices',(req,res)=>{
  const query = `SELECT * FROM walkin_queue_tbl
  JOIN walkin_services_tbl ON walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id
  JOIN customer_tbl ON walkin_queue_tbl.cust_id = customer_tbl.cust_id
  JOIN services_tbl ON services_tbl.service_id = walkin_services_tbl.service_id
  JOIN room_tbl ON room_tbl.room_id = walkin_services_tbl.room_id
  WHERE walkin_queue_tbl.walkin_id= "${req.body.id}";
  `
  
  db.query(query,(err,out)=>{
    console.log(query)
    var out1= out[0]
    var outPromo= out[1]
    var outPackage= out[2]
    console.log(out)
    const query1 = `SELECT * FROM walkin_queue_tbl 
    JOIN customer_tbl ON walkin_queue_tbl.cust_id = customer_tbl.cust_id 
    JOIN therapist_in_service_tbl ON therapist_in_service_tbl.walkin_id = walkin_queue_tbl.walkin_id
    JOIN therapist_tbl ON therapist_tbl.therapist_id = therapist_in_service_tbl.therapist_id
    where walkin_queue_tbl.walkin_id =?`
    db.query(query1,[req.body.id],(err,out)=>{
      return res.send({
        out1:out1,
        outPromo:outPromo,
        outPackage:outPackage, 
        out2:out[0]})
    })
  })
})

// [QUEUE - MOVING TO ONGOING SERVICES]
router.post('/home/queue/MoveToOngoing',(req,res)=>{
  var alertSuccess = 0
  var notSuccess = 1
  const query = `UPDATE walkin_queue_tbl SET walkin_indicator= 1 WHERE walkin_id="${req.body.id}"`

  db.query(query,(err,out)=>{
    if(err)
    {
      console.log(err)
      res.send({alertSuccess:notSuccess})
    }
    else
    {
      console.log(query)
      res.send({alertSuccess:alertSuccess})
    }
  })
})

// [QUEUE - MOVING TO ONGOING SERVICES - ADVANCE]
router.post('/home/queue/AdvanceReservation',(req,res)=>{
  var alertSuccess =0
  var notSuccess =1
  const query=`UPDATE walkin_queue_tbl SET walkin_date = "${req.body.dateOnly}",
  walkin_start_time = "${req.body.new_startTime}", walkin_end_time="${req.body.new_endTime}", walkin_indicator = 1 
  WHERE walkin_id = ${req.body.id}`

  db.query(query,(err,out)=>{
    if(err)
    {
      res.send({alertDesc:notSuccess})
      console.log(err)
    }
    else
    {
      console.log(query)
      res.send({alertDesc:alertSuccess})
    }
  })
})

// [RESERVATION - VIEW]
router.get('/reservationList',mid.receptionistnauthed,(req, res) => {

  var fullDate = moment(new Date()).format('MM-DD-YYYY')

  console.log(fullDate)
  const query = `
  SELECT walkin_queue_tbl.*, walkin_services_tbl.*, customer_tbl.*, services_tbl.*, room_tbl.*
  FROM walkin_queue_tbl 
  JOIN walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
  JOIN customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
  JOIN services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
  JOIN room_tbl on room_tbl.room_id = walkin_services_tbl.room_id WHERE walkin_queue_tbl.walkin_payment_status=0 
  AND walkin_queue_tbl.walkin_date != CURDATE() AND walkin_queue_tbl.walkin_indicator =0  || walkin_queue_tbl.walkin_indicator =1 group by walkin_services_tbl.walkin_id;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out)=>{
    req.session.utilities = out[1]


    for(var i=0;i<out[0].length;i++)
    {
      out[0][i].walkin_date = moment(out[0][i].walkin_date).format('MMMM DD, YYYY')
    }
    res.render('receptionist/reservationList',{
      reservs: out[0],
      reqSession: req.session
    })
  })
})

// [ONGOING SERVICES - VIEW]
router.get('/ongoing',mid.receptionistnauthed,(req, res) => {
    var fullDate = moment(new Date()).format('YYYY-MM-DD')
    console.log(fullDate)
    const query = `SELECT walkin_queue_tbl.*, walkin_services_tbl.*, customer_tbl.*, services_tbl.*, room_tbl.*
    from walkin_queue_tbl 
    join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
    join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
    join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
    join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id WHERE room_tbl.room_type_id= '2' AND walkin_date='${fullDate}' AND walkin_indicator=1 group by walkin_services_tbl.walkin_id;
    SELECT * FROM utilities_tbl`
    db.query(query,(err,out)=>{
      req.session.utilities = out[1] 
      res.render('receptionist/ongoing',{
        ongoings: out[0],
        reqSession: req.session
      })
    })
  })
  
// [ONGOING SERVICES - VIEW SERVICES ]
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
  var walkin_date = moment(req.body.walkin_date).format("YYYY-MM-DD")
  const query = `UPDATE walkin_queue_tbl SET walkin_indicator =2 where walkin_date="${walkin_date}" AND walkin_start_time="${req.body.startTime}" AND 
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