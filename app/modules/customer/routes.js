var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();
var mid = require("../../middlewares")
var moment = require ('moment')


router.get('/sample',(req, res) => {
  res.render('customer/sample')
})

// LANDING PAGE
router.get('/customer',(req, res) => {
  res.render('customer/login')
})


// router.get('/custHome',mid.guestistnauthed,(req, res) => {
// 	const query =`SELECT customer_tbl.*, loyalty_tbl.* 
// 	FROM customer_tbl
// 	JOIN loyalty_tbl ON customer_tbl.cust_id = loyalty_tbl.cust_id
// 	WHERE customer_tbl.cust_id = ${req.session.user.cust_id}`
	
// 	db.query(query, (err,out)=>{
// 		res.render('customer/custHome',{
// 				customers: out,
// 				id: req.session.user.cust_id
// 		})
// 	})
//   })


// [LOGIN]
router.post("/customer/login",(req, res) => {
	const query = `
		select * from loyalty_tbl where member_username = "${req.body.username}"`

		db.query(query, (err, out) => {
 		if(!out[0])
			return res.redirect("/customer/customer#notfound")
		else {
			if(out[0].member_password !== req.body.password)
				return res.redirect("/customer/customer#incorrect")
			else {
				delete out[0].member_password
				req.session.user = out[0]	
				return res.redirect("/customer/home")
			}
		}

  })
})
// [LOG OUT]
router.post("/customer/logout", (req, res) => {
  req.session.destroy(err => {
    if(err) console.err
    res.redirect("/customer")
  })
})
// CUSTOMER HOMEPAGE
router.get('/home',mid.guestistnauthed,(req,res)=>{
	const query = `SELECT customer_tbl.*, loyalty_tbl.*
	FROM customer_tbl
	JOIN loyalty_tbl ON customer_tbl.cust_id = loyalty_tbl.cust_id
	WHERE customer_tbl.cust_id=${req.session.user.cust_id}`

	db.query(query,(err,out)=>{
		res.render('customer/home',{
			customers: out,
			id: req.session.user.cust_id
		})
	})
})
// SELECT DATE
router.get('/selectDate',mid.guestistnauthed,(req,res)=>{
    customerId = req.query.id
    date = req.query.date
		restype= req.query.reservetype
		male = req.query.male
    female = req.query.female
    console.log(date)
		const query = `SELECT customer_tbl.*, loyalty_tbl.*
		FROM customer_tbl
		JOIN loyalty_tbl ON customer_tbl.cust_id = loyalty_tbl.cust_id
		WHERE customer_tbl.cust_id= ${customerId}`
		db.query(query,(err,out) =>{
			res.render("customer/selectDate",{
				customers: out,
				customerId,
				restype, male,female,date
			})
		})
})

// SELECT TIME
router.get('/customerTime',mid.guestistnauthed,(req,res)=>{
  const query = `SELECT customer_tbl.*, loyalty_tbl.* FROM customer_tbl
  JOIN loyalty_tbl ON customer_tbl.cust_id = loyalty_tbl.cust_id 
  WHERE customer_tbl.cust_id = ${req.session.user.cust_id}`
  db.query(query,(err,out)=>{
    res.render('customer/customerTime',{
      customers: out,
      date:req.query
  })
  console.log(out)
  })
})
router.post('/customerTime/query',(req, res) => {
  const query = `select * from room_tbl where delete_stats=0 and room_availability=0`
  db.query(query,(err, out) => {
    res.send(out)
  })
})

router.post('/customerTime/queryRoom',(req,res)=>{
  const query = `SELECT * FROM room_tbl where delete_stats = 0 AND room_availability=0`

  db.query(query,(err,out)=>{
    res.send(out)
  })
})

router.post('/customerTime/queryCommon',(req, res) => {
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
router.post('/customerTime/addResource/Multiple', mid.guestistnauthed,(err,res)=>{
  var date = req.query.date
  console.log(date)
  const query =`SELECT SUM(bed_occupied) AS occupied, walkin_queue_tbl.*, walkin_services_tbl.*, room_tbl.* , room_type_tbl.room_type_desc from walkin_queue_tbl 
  join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id
  join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id
  join room_type_tbl on room_tbl.room_type_id = room_type_tbl.room_type_id 
  where walkin_queue_tbl.walkin_date = '${date}' 
  group by walkin_queue_tbl.walkin_start_time , room_tbl.room_name
  ORDER BY walkin_queue_tbl.walkin_start_time`

  db.query(query,(err,out)=>{
    res.send(out)
  })
})
router.post('/customerTime/addResource', mid.guestistnauthed,(req,res)=>{
  console.log(req.body.date)
  console.log('ID: '+req.body.id)
  const query =`SELECT  SUM(bed_occupied) AS occupied, walkin_queue_tbl.*, walkin_services_tbl.*, room_tbl.* , room_type_tbl.* from walkin_queue_tbl 
  join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id
  join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id
  join room_type_tbl on room_tbl.room_type_id = room_type_tbl.room_type_id 
  where walkin_queue_tbl.walkin_date = '${req.body.datePick}' AND room_tbl.room_id=?
  group by walkin_queue_tbl.walkin_start_time , room_tbl.room_name
  ORDER BY walkin_queue_tbl.walkin_start_time `

  db.query(query,[req.body.id],(err,out)=>{
    res.send(out)
    console.log(query)
  })
})



// BOOK RESERVATION
router.get('/bookreservation',mid.guestistnauthed, (req, res) => {
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
      res.render('customer/book',{
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
    if(restype=='single')
      {
        for(var i=0;i<req.body.serviceId.length;i++)
          {
            const query1= `insert into walkin_services_tbl(walkin_id,service_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) 
            values("${walkinId}","${req.body.serviceId[i]}","${req.body.roomId}","${req.body.serviceQuantity[i]}","${req.body.serviceNewDuration[i]}",
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
      }
    else if(restype=='multiple'){
      if(req.body.roomId == 'common')
      {
        const queryRoom = `SELECT * FROM room_tbl WHERE room_rate= 0` 
        db.query(queryRoom,(err,out)=>{
          for(var o= 0; o<out.length;o++)
            {
              if(out[o].room_gender == 1) // BOYS
                  {
                    for(var i=0; i<req.body.serviceId.length;i++)
                      {
                        const queryBoys = `INSERT INTO walkin_services_tbl
                        (walkin_id, service_id,room_id, service_total_quantity, service_total_duration, bed_occupied, service_total_price)
                        VALUES ("${walkinId}", "${req.body.serviceId[i]}","${out[o].room_id}", "${req.body.serviceQuantity[i]}","${req.body.serviceNewDuration[i]}",
                        "${req.body.boys_quantity}","${req.body.serviceTotal[i]}")`
  
                        db.query(queryBoys, (err,out)=>{
                          console.log(queryBoys)
                        })
                      }
                  }
  
                else if(out[o].room_gender == 2) // GIRLS
                  {
                    for(var i=0; i<req.body.serviceId.length;i++)
                      {
                        const queryGirls = `INSERT INTO walkin_services_tbl
                        (walkin_id, service_id,room_id, service_total_quantity, service_total_duration, bed_occupied, service_total_price)
                        VALUES ("${walkinId}", "${req.body.serviceId[i]}","${out[o].room_id}", "${req.body.serviceQuantity[i]}","${req.body.serviceNewDuration[i]}",
                        "${req.body.girls_quantity}","${req.body.serviceTotal[i]}")`
  
                        db.query(queryGirls, (err,out)=>{
                          console.log(queryGirls)
                          
                        })
                      }
                  }
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
        }
        else
        {
          const queryPrivate =`INSERT INTO walkin_services_tbl
          (walkin_id, service_id,room_id, service_total_quantity, service_total_duration, bed_occupied, service_total_price)
          VALUES ("${walkinId}", "${req.body.seriviceId[i]}","${req.body.roomId}", "${req.body.serviceQuantity[i]}","${req.body.serviceNewDuration[i]}",
          "${req.body.boys_quantity}","${req.body.serviceTotal[i]}")`

          db.query(queryPrivate, (err,out)=>{
            if(err)
              {
                res.send({alertDesc: notSuccess})
              }
              else
              {
                res.send({alertDesc:querySuccess})
              }
          })
        }
    }
  })
})






exports.customer = router;