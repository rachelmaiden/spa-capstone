var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();
var mid = require("../../middlewares")
var moment = require ('moment')

// [FRONTDESK-HOME]
router.get('/frontdesk/home',mid.frontdesknauthed,(req,res)=>{
  const query = ` select * from customer_tbl where delete_stats=0`
  db.query(query,(err,out) =>{
      res.render('frontdesk/registration',{
        customers: out
      })
    })
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
				return res.redirect("/frontdesk/home")
			}
		}

  })
})
// [LOG OUT]
router.post("/frontdesk/logout", (req, res) => {
  req.session.destroy(err => {
    if(err) console.err
    res.redirect("/frontdesk")
  })
})
  

// // [SEARCH]
// router.post('/frontdesk/search', (req, res) => {
//   console.log(req.body.searchBar)
//   const query= `SELECT * FROM customer_tbl WHERE
//   cust_fname LIKE '%${req.body.searchBar}%' OR
//   cust_mname LIKE '%${req.body.searchBar}%' OR
//   cust_lname LIKE '%${req.body.searchBar}%' OR
//   CONCAT(cust_fname," ",cust_lname)  = '${req.body.searchBar}' AND delete_stats=0
//   `
//   db.query(query, (err,out)=>{
//     res.send({out:out})
//     console.log(query)
//     console.log(out)
//   })
// })

// [ADD NEW CUSTOMER]
router.post('/frontdesk/home/newCustomer',(req, res) => {
  const query= `select * from customer_tbl where cust_fname LIKE "%${req.body.firstname}%" and cust_lname LIKE "%${req.body.lastname}%" 
  and cust_birthMonth LIKE "%${req.body.month}%" and cust_birthDate LIKE "%${req.body.date}%" and cust_birthYear LIKE "%${req.body.year}%" and cust_address LIKE "%${req.body.address}%"`
  
  db.query(query, (err, out) => {
    if(out== undefined || out == 0)
    {
    var alertSuccess = 1 ;
    var notSuccess = 0
    const query = `
    insert into 
    customer_tbl(cust_fname,cust_mname, cust_lname, cust_birthMonth, cust_birthDate, cust_birthYear, cust_address,cust_contact_no, cust_gender, medical_history, delete_stats, cust_type) 
    values("${req.body.firstname}","${req.body.middlename}","${req.body.lastname}", "${req.body.month}","${req.body.date}","${req.body.year}", 
    "${req.body.address}","${req.body.contact_no}", "${req.body.gender}", "${req.body.medical_history}",0,0)
    `

    db.query(query, (err, out) => {
      console.log("----------------------------")
      console.log("CUSTOMER NOT EXIST")
      console.log("----------------------------")
      console.log("NAGINSERT CHECK MO PA SA DB")
      console.log("----------------------------")
      console.log(query)
      console.log(alertSuccess)
      // return res.redirect("/frontdesk/home#success")
      res.send({alertSuccess:alertSuccess})
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

        res.send({alertSuccess:notSuccess})
        // return res.redirect("/frontdesk/home#customeralreadyexist")
      })
    }
  })
})

//[ADD NEW CUSTOMER - LOYALTY]
router.post('/frontdesk/home/newCustomer/Loyalty',(req, res) => {
  var cust_id;
  const query= `select * from customer_tbl where cust_fname LIKE "%${req.body.firstname}%" and cust_lname LIKE "%${req.body.lastname}%" 
  and cust_birthMonth LIKE "%${req.body.month}%" and cust_birthDate LIKE "%${req.body.date}%" and cust_birthYear LIKE "%${req.body.year}%" and cust_address LIKE "%${req.body.address}%"`
  
  db.query(query, (err, out) => {
    if(out== undefined || out == 0)
    {
      const query = `select * from loyalty_tbl where member_username = "${req.body.username}"`
      db.query(query, (err,out)=>{
        if(out== undefined || out ==0)
        {
          var alertSuccess = 1 ;
          var notSuccess= 0;
          const query = `
          insert into 
          customer_tbl(cust_fname,cust_mname, cust_lname, cust_birthMonth, cust_birthDate, cust_birthYear, cust_address,cust_contact_no, cust_gender, medical_history, delete_stats,cust_type) 
          values("${req.body.firstname}","${req.body.middlename}","${req.body.lastname}", "${req.body.month}","${req.body.date}","${req.body.year}", 
          "${req.body.address}","${req.body.contact_no}", "${req.body.gender}", "${req.body.medical_history}",0,1)
          `
      
          db.query(query, (err, out) => {
            cust_id= out.insertId;
            db.query(`insert into loyalty_tbl(cust_id,member_username, member_password) value("${cust_id}","${req.body.username}","${req.body.password}")`, (err,out)=>{
              
              // return res.redirect("/frontdesk/home#success")
              res.send({alertSuccess: alertSuccess})
            })
          })
        }
        else if(out != undefined)
        {
          db.query(query, (err, out) => {
            res.send({alertSuccess: notSuccess})
          })
        }
      })
    }
    else if(out != undefined) 
    {
      db.query(query, (err, out) => {
        res.send({alertSuccess:notSuccess})
      })
    }
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
    })
  })


router.post('/selectTime/query',(req, res) => {
  const query = `select * from room_tbl where delete_stats=0 and room_availability=0`
  db.query(query,(err, out) => {
    res.send(out)
  })
})

router.post('/selectTime/queryRoom',(req,res)=>{
  const query = `SELECT * FROM room_tbl where delete_stats = 0 AND room_availability=0`

  db.query(query,(err,out)=>{
    res.send(out)
  })
})

router.post('/selectTime/queryCommon',(req, res) => {
  const query = `SELECT room_tbl.*, room_type_tbl.*
  FROM room_tbl 
  JOIN room_type_tbl ON room_tbl.room_type_id = room_type_tbl.room_type_id
  WHERE room_tbl.room_rate = 0
  GROUP BY room_tbl.room_type_id;
  SELECT * FROM room_tbl where room_gender = 1;
  SELECT * FROM room_tbl where room_gender = 2
  `

  db.query(query,(err, out) => {
    res.send({common:out[0],
    boys:out[1],
    girls:out[2]
    })
  })
})
router.post('/selectTime/addResource/Multiple', mid.frontdesknauthed,(err,res)=>{
  var dateNow = moment().format('MM-DD-YYYY')
  console.log(dateNow)
  const query =`SELECT SUM(bed_occupied) AS occupied, walkin_queue_tbl.*, walkin_services_tbl.*, room_tbl.* , room_type_tbl.room_type_desc from walkin_queue_tbl 
  join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id
  join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id
  join room_type_tbl on room_tbl.room_type_id = room_type_tbl.room_type_id 
  where walkin_queue_tbl.walkin_date = '${dateNow}' 
  group by walkin_queue_tbl.walkin_start_time , room_tbl.room_name
  ORDER BY walkin_queue_tbl.walkin_start_time`

  db.query(query,(err,out)=>{
    res.send(out)
  })
})
router.post('/selectTime/addResource', mid.frontdesknauthed,(req,res)=>{
  var dateNow = moment().format('MM-DD-YYYY')
  console.log(dateNow)
  const query =`SELECT walkin_queue_tbl.*, walkin_services_tbl.*, room_tbl.* , room_type_tbl.* from walkin_queue_tbl 
  join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id
  join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id
  join room_type_tbl on room_tbl.room_type_id = room_type_tbl.room_type_id 
  where walkin_queue_tbl.walkin_date = '${dateNow}' AND room_tbl.room_id=?
  group by walkin_queue_tbl.walkin_start_time , room_tbl.room_name
  ORDER BY walkin_queue_tbl.walkin_start_time `

  db.query(query,[req.body.id],(err,out)=>{
    res.send(out)
  })
})


// // [BOOK RESERVATION - SELECTING DATE]
// router.get('/selectDate',mid.frontdesknauthed,(req,res)=>{
//   res.render('frontdesk/selectDate')
// })

// [BOOK RESERVATION - SELECTING DATE]
router.get('/selectDate',mid.frontdesknauthed,(req, res) => {
  customerId = req.query.id
  restype=req.query.reservetype
  male = req.query.male
  female = req.query.female
  console.log(customerId)
  const query = `SELECT * FROM customer_tbl where cust_id= ${customerId}`
  db.query(query,(err,out) =>{
		res.render("frontdesk/selectDate",{
      customers: out,
      customerId,
      restype, male,female
		})
	})
})

// [BOOK RESERVATION - CHOOSE SERVICES]
router.get('/bookreservation',mid.frontdesknauthed, (req, res) => {
  date = req.query.date
  time = req.query.time
  room = req.query.room
  roomId = req.query.roomId

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
  
  db.query(query,(err,out) =>{
      res.render('frontdesk/fdBookReservation',{
        services: out[0],
        promos: out[1],
        crooms: out[2],
        prooms: out[3],
        therapists: out[4],
        customers: out[5],
        date, time,room, roomId
      })
      console.log(date)
      console.log(time)
    })
})

router.post('/bookreservation/addReservation',(req,res)=>{
  var walkinId;
  console.log(req.body)
  const query= `INSERT INTO walkin_queue_tbl(cust_id, walkin_start_time, walkin_end_time, walkin_total_amount, walkin_total_points,walkin_date,walkin_payment_status)
  values("${req.body.customerId}","${req.body.timeStart}","${req.body.timeEnd}","${req.body.finalTotal}","${req.body.finalPoints}","${req.body.date}",0)`
  db.query(query,(err,out)=>{
    var notSuccess=0;
    var querySuccess= 1
    walkinId=out.insertId;
    console.log(walkinId)
    for(var i=0;i<req.body.serviceId.length;i++)
      {
        const query1= `insert into walkin_services_tbl(walkin_id,service_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) values("${walkinId}","${req.body.serviceId[i]}","${req.body.roomId}","${req.body.serviceQuantity[i]}","${req.body.serviceNewDuration[i]}",
          "${req.body.bed_quantity}","${req.body.serviceTotal[i]}")`
        db.query(query1,(err,out)=>{
          console.log(query1)
          console.log(req.body.serviceId[i])
        })
      }
      if(err)
      {
        res.send({alertDesc: notSuccess})
      }
      else
      {
        res.send({alertDesc:querySuccess})
      }
  })
})

router.get('/selectTime',mid.frontdesknauthed,(req,res)=>{
  res.render('frontdesk/selectTime',{
    date:req.query
  })
})

router.get('/fdHome', (req, res) => {
  res.render('frontdesk/Home')
})
router.get('/fdReservation',mid.frontdesknauthed, (req, res) => {
  var fullDate = moment(new Date()).format('MM-DD-YYYY')

  console.log(fullDate)
  const query = `SELECT walkin_queue_tbl.*, walkin_services_tbl.*, customer_tbl.*, services_tbl.*, room_tbl.*
  from walkin_queue_tbl 
  join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
  join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
  join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
  join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id AND room_tbl.room_type_id= '2' AND walkin_date='${fullDate}' group by walkin_services_tbl.walkin_id;
  SELECT walkin_queue_tbl.*, walkin_services_tbl.*, customer_tbl.*, services_tbl.*, room_tbl.*
  from walkin_queue_tbl 
  join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
  join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
  join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
  join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id AND room_tbl.room_type_id != '2' AND walkin_date >= '${fullDate}' group by walkin_services_tbl.walkin_id`
  db.query(query,(err,out)=>{
    res.render('frontdesk/fdReservation',{
      walkins: out[0],
      reservs: out[1]
    })
    console.log(out[0])
  })
})

router.post('/fdReservation/viewServices',(req,res)=>{
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
  })
})

router.get('/summary', (req, res) => {
  res.render('frontdesk/summary')
})

router.get('/payment',mid.frontdesknauthed, (req, res) => {
  const query = `SELECT walkin_queue_tbl.*, walkin_services_tbl.*,customer_tbl.*, services_tbl.service_name, room_tbl.room_name
  FROM walkin_queue_tbl 
  JOIN walkin_services_tbl ON walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id
  JOIN customer_tbl ON customer_tbl.cust_id = walkin_queue_tbl.cust_id
  JOIN services_tbl ON services_tbl.service_id = walkin_services_tbl.service_id
  JOIN room_tbl ON room_tbl.room_id = walkin_services_tbl.room_id
  WHERE walkin_queue_tbl.walkin_payment_status = 0 
  GROUP BY walkin_services_tbl.walkin_id`
  db.query(query,(err,out)=>{
    res.render('frontdesk/payment',{
      notpaids : out
    })
  })
})
router.post('/payment/query/CheckoutDets',mid.frontdesknauthed, (req, res) => {
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
  })
  })


  
exports.frontdesk = router;