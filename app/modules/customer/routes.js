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
	res.render('customer/landing')
  })

router.get('/login',(req, res) => {
  res.render('customer/login')
})

router.get('/customerProfile',(req, res) => {
  res.render('customer/custProfile')
})

// [LOGIN]
router.post("/customer/login",(req, res) => {
	const query = `
    SELECT customer_tbl.*, loyalty_tbl.* FROM customer_tbl
    JOIN loyalty_tbl ON customer_tbl.cust_id = loyalty_tbl.cust_id 
    WHERE customer_tbl.delete_stats=0 AND loyalty_tbl.member_username = "${req.body.username}"`

		db.query(query, (err, out) => {
 		if(!out[0])
			return res.redirect("/customer/login#notfound")
		else {
			if(out[0].member_password !== req.body.password)
				return res.redirect("/customer/login#incorrect")
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
  restype = req.query.reservetype
  const query = `SELECT customer_tbl.*, loyalty_tbl.* FROM customer_tbl
  JOIN loyalty_tbl ON customer_tbl.cust_id = loyalty_tbl.cust_id 
  WHERE customer_tbl.cust_id = ${req.session.user.cust_id}`
  db.query(query,(err,out)=>{
    res.render('customer/customerTime',{
      customers: out,
      date:req.query,
      restype
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

  router.get('/custHome',(req, res) => {
      res.render('customer/custHome')
    })
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
router.get('/bookreservation', mid.frontdesknauthed,(req, res) => {
  var dateHello = req.query.date
  dateRes= req.query.date
  var time = req.query.time
  room = req.query.room
  roomId = req.query.roomId
  var date_time = moment(dateHello+' '+time).format('MM-DD-YYYY HH:mm')
  console.log(dateHello+' '+time)
  console.log("RESERVATION DATE",dateRes)

  const query = `
  SELECT services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc FROM services_tbl 
  JOIN service_duration_tbl ON services_tbl.service_duration_id = service_duration_tbl.service_duration_id 
  JOIN service_type_tbl ON services_tbl.service_type_id = service_type_tbl.service_type_id 
  WHERE services_tbl.delete_stats=0 AND services_tbl.service_availability=0; 
  SELECT promo_bundle_tbl.*, services_tbl.*, service_in_promo_tbl.* FROM promo_bundle_tbl
  JOIN service_in_promo_tbl ON service_in_promo_tbl.promobundle_id = promo_bundle_tbl.promobundle_id
  JOIN services_tbl ON service_in_promo_tbl.service_id = services_tbl.service_id
  WHERE promo_bundle_tbl.delete_stats= 0 AND promo_bundle_tbl.promobundle_availability=0
  GROUP BY service_in_promo_tbl.promobundle_id;
  SELECT * FROM room_tbl where delete_stats=0 and room_availability= 0 and room_type_id=2;
  SELECT * FROM room_tbl where delete_stats=0 and room_availability= 0 and room_type_id=6;
  SELECT * FROM customer_tbl where delete_stats=0 and cust_id=${customerId};
  SELECT * FROM utilities_tbl;
  SELECT package_tbl.*, services_tbl.*, service_in_package_tbl.* FROM package_tbl
  JOIN service_in_package_tbl ON package_tbl.package_id = service_in_package_tbl.package_id
  JOIN services_tbl ON service_in_package_tbl.service_id = services_tbl.service_id
  WHERE package_tbl.delete_stats= 0 AND package_tbl.package_availability = 0
  GROUP BY service_in_package_tbl.package_id;
  SELECT * FROM giftcertificate_tbl WHERE release_stats = 2 OR release_stats=4`
  
  db.query(query,(err,out) =>{
    req.session.utilities = out[5]
    var services= out[0]
    var promos= out[1]
    var crooms= out[2]
    var prooms= out[3]
    var customers= out[4]
    var packages = out[6]
    var giftcerts = out[7]
    // console.log(req.session.utilities)
    // console.log(req.session.utilities[0].company_name)
    var date = moment(new Date()).format('MM-DD-YYYY')
      var firstShift_timeStart = date+" "+req.session.utilities[0].firstShift_timeStart
      var firstShift_timeEnd = date+" "+req.session.utilities[0].firstShift_timeEnd
      firstShift_timeStart = moment(firstShift_timeStart).format('MM-DD-YYYY HH:mm')
      firstShift_timeEnd = moment(firstShift_timeEnd).format('MM-DD-YYYY HH:mm')
      var secondShift_timeStart = date+" "+req.session.utilities[0].secondShift_timeStart
      var secondShift_timeEnd = date+" "+req.session.utilities[0].secondShift_timeEnd
      secondShift_timeStart = moment(secondShift_timeStart).format('MM-DD-YYYY HH:mm')
      secondShift_timeEnd = moment(secondShift_timeEnd).format('MM-DD-YYYY HH:mm')
      var date_timeNow = moment(new Date()).format('MM-DD-YYYY HH:mm ')
      var dateHello = req.query.date
    
      // console.log(secondShift_timeStart)
      // console.log(secondShift_timeEnd)
      console.log("TIME PICK "+date_time)
      console.log(secondShift_timeEnd)
      console.log(moment(date_time).isSameOrAfter(firstShift_timeStart))
      console.log(moment(date_time).isBefore(firstShift_timeEnd))
      console.log(moment(date_time).isSameOrBefore(secondShift_timeStart))
      console.log(moment(date_time).isSameOrAfter(secondShift_timeEnd))
      console.log('=======================================================')
      console.log(moment(date_time).isSameOrAfter(secondShift_timeStart))
      console.log(moment(date_time).isSameOrAfter(secondShift_timeEnd))
      console.log(moment(date_time).isSameOrAfter(firstShift_timeStart))
      console.log(moment(date_time).isSameOrBefore(firstShift_timeEnd))
      if(moment(date_time).isSameOrAfter(firstShift_timeStart) && moment(date_time).isBefore(firstShift_timeEnd) && moment(date_time).isSameOrBefore(secondShift_timeStart) && moment(date_time).isSameOrAfter(secondShift_timeEnd))
      {
        console.log('FIRST')
        const query=`SELECT * FROM therapist_tbl WHERE therapist_shift = 'FIRST'`
    
        db.query(query,(err,out)=>{
          res.render('customer/book',{
            date, time,room, roomId,
            reqSession: req.session,services,promos, crooms, prooms, customers,
            therapist: out, packages,
            datePick: dateHello, giftcerts, dateRes
          })
        })
      }
      else if(moment(date_time).isSameOrAfter(secondShift_timeStart) && moment(date_time).isSameOrAfter(secondShift_timeEnd) && moment(date_time).isSameOrAfter(firstShift_timeStart) && moment(date_time).isSameOrAfter(firstShift_timeEnd))
      {
        console.log('SECOND')
        const query=`SELECT * FROM therapist_tbl WHERE therapist_shift = 'SECOND'`
    
        db.query(query,(err,out)=>{
          res.render('customer/book',{
            date, time,room, roomId,
            reqSession: req.session,services,promos, crooms, prooms, customers,
            therapist: out,packages,
            datePick: dateHello, giftcerts, dateRes
          })
        })
      }
    })


  })


// [BOOK RESERVATION - CHECK ROOM DETAILS]
router.post('/CheckRoomDetails',(req,res)=>{
  if(req.body.room_id=='common')
  {
    const query = `SELECT * FROM room_tbl WHERE room_rate = 0 `

    db.query(query,(err,out)=>{
      res.send(out[0])
    })
  }
  else
  {
    const query = `SELECT * FROM room_tbl WHERE room_id =${req.body.room_id}`
  
    db.query(query,(err,out)=>{
      res.send(out[0])
    })

  }
}) 

router.post('/bookreservation/addReservation',(req,res)=>{
  console.log(req.body)
  
  const query= `INSERT INTO walkin_queue_tbl(cust_id, walkin_start_time, walkin_end_time, walkin_total_amount, walkin_total_points,walkin_date,walkin_payment_status,walkin_indicator)
  values("${req.body.cust_id}","${req.body.timeStart}","${req.body.EndTime}","${req.body.amount}","${req.body.finalPoints}","${datePicked}",2,0)`
  db.query(query,(err,out)=>{
    var walkinId=out.insertId;
    var restype = req.body.restype
    console.log('WALKIN ID',walkinId)
  console.log('RESTYPE',restype)
  if(restype=='single')
    {
      console.log('PASOK SA SINGLE')
      console.log(req.body.typeServ.length)
        for(var i=0;i<req.body.typeServ.length;i++)
        {
          if(req.body.typeServ[i] == 'service')
          {
            console.log('PUMASOK SA SERVICE')
            for(var x=0;x<req.body.serviceId.length;x++)
            {
              const query1= `INSERT INTO walkin_services_tbl(walkin_id,service_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) 
              VALUES("${walkinId}","${req.body.serviceId[x]}","${req.body.roomId}","${req.body.serviceQuantity[x]}","${req.body.serviceNewDuration[x]}",
                "${req.body.bed_quantity}","${req.body.serviceTotal[x]}")`
                db.query(query1,(err,out)=>{
                  console.log(query1)
                  if(err){
                    console.log(err)
                  }
              })

            }

          }

          if(req.body.typeServ[i] =='promo')
          {
            console.log('PUMASOK SA PROMO')
            for(var x=0;x<req.body.promoId.length;x++)
            {

              const query1= `INSERT INTO walkin_services_tbl(walkin_id,promobundle_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) 
              VALUES("${walkinId}","${req.body.promoId[x]}","${req.body.roomId}","${req.body.promoQuantity[x]}","${req.body.promoNewDuration[x]}",
                "${req.body.bed_quantity}","${req.body.promoTotal[x]}")`
                db.query(query1,(err,out)=>{
                  console.log(query1)
                  if(err){
                    console.log(err)
                  }
              })
            }

          }
          if(req.body.typeServ[i] == 'package')
          {
            console.log('PUMASOK SA PACKAGE')
            for(var x=0;x<req.body.serviceId.length;x++)
            {

              const query1= `INSERT INTO walkin_services_tbl(walkin_id,package_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) 
              VALUES("${walkinId}","${req.body.packageId[x]}","${req.body.roomId}","${req.body.packageQuantity[x]}","${req.body.packageNewDuration[x]}",
                "${req.body.bed_quantity}","${req.body.packageTotal[x]}")`
                db.query(query1,(err,out)=>{
                  console.log(query1)
                  if(err){
                    console.log(err)
                  }
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
          const query = `INSERT INTO therapist_in_service_tbl(therapist_id,walkin_id)
          VALUES("${req.body.therapist_id}","${walkinId}")`

          db.query(query,(err,out)=>{
            if(err)
            {
              res.send({alertDesc:notSuccess})
              console.log("ERROR IN INSERTING AT THERAPIST_IN_SERVICE_TBL")
              console.log(err)
            }
            else
            {
              res.send({alertDesc:alertSuccess})
            }
          })
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
                  for(var i=0;i<req.body.typeServ.length;i++)
                    {
                      if(req.body.typeServ == 'service')
                      { 
                        for(var x=0;x<req.body.serviceId.length;x++)
                        {
                          const query1= `INSERT INTO walkin_services_tbl(walkin_id,service_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) 
                          VALUES("${walkinId}","${req.body.serviceId[x]}","${out[o].room_id}","${req.body.serviceQuantity[x]}","${req.body.serviceNewDuration[x]}",
                            "${req.body.boys_quantity}","${req.body.serviceTotal[x]}")`
                            db.query(query1,(err,out)=>{
                              if(err){
                                console.log(err)
                              }
                          })
                        }

                      }

                      else if(req.body.typeServ =='promo')
                      {
                        for(var x=0;x<req.body.promoId.length;x++)
                        {
                          const query1= `INSERT INTO walkin_services_tbl(walkin_id,promobundle_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) 
                          VALUES("${walkinId}","${req.body.promoId[x]}","${out[o].room_id}","${req.body.promoQuantity[x]}","${req.body.promoNewDuration[x]}",
                            "${req.body.boys_quantity}","${req.body.promoTotal[x]}")`
                            db.query(query1,(err,out)=>{
                              if(err){
                                console.log(err)
                              }
                          })

                        }

                      }
                      else if(req.body.typeServ == 'package')
                      {
                        for(var x=0;x<req.body.packageId.length;x++)
                        {
                          const query1= `INSERT INTO walkin_services_tbl(walkin_id,package_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) 
                          VALUES("${walkinId}","${req.body.packageId[x]}","${out[o].room_id}","${req.body.packageQuantity[x]}","${req.body.packageNewDuration[x]}",
                            "${req.body.boys_quantity}","${req.body.packageTotal[x]}")`
                            db.query(query1,(err,out)=>{
                              if(err){
                                console.log(err)
                              }
                          })
                        }

                      }
                    }
                }

              else if(out[o].room_gender == 2) // GIRLS
                {
                  for(var i=0;i<req.body.typeServ.length;i++)
                    {
                      if(req.body.typeServ == 'service')
                      {
                            const query1= `INSERT INTO walkin_services_tbl(walkin_id,service_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) 
                            VALUES("${walkinId}","${req.body.serviceId[i]}","${out[o].room_id}","${req.body.serviceQuantity[i]}","${req.body.serviceNewDuration[i]}",
                              "${req.body.girtls_quantity}","${req.body.serviceTotal[i]}")`
                              db.query(query1,(err,out)=>{
                                if(err){
                                  console.log(err)
                                }
                            })

                      }

                      else if(req.body.typeServ =='promo')
                      {

                          const query1= `INSERT INTO walkin_services_tbl(walkin_id,promobundle_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) 
                          VALUES("${walkinId}","${req.body.promoId[i]}","${out[o].room_id}","${req.body.promoQuantity[i]}","${req.body.promoNewDuration[i]}",
                            "${req.body.girtls_quantity}","${req.body.promoTotal[i]}")`
                            db.query(query1,(err,out)=>{
                              if(err){
                                console.log(err)
                              }
                          })

                      }
                      else if(req.body.typeServ == 'package')
                      {

                          const query1= `INSERT INTO walkin_services_tbl(walkin_id,package_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price) 
                          VALUES("${walkinId}","${req.body.packageId[i]}","${out[o].room_id}","${req.body.packageQuantity[i]}","${req.body.packageNewDuration[i]}",
                            "${req.body.girtls_quantity}","${req.body.packageTotal[i]}")`
                            db.query(query1,(err,out)=>{
                              if(err){
                                console.log(err)
                              }
                          })

                      }
                    }
                }
          }     
          if(err)
            {
              res.send({alertDesc: notSuccess})
            }
            else
            {
              var therapist = req.body.therapist_id
              console.log('THERAPIST')
              console.log(therapist)
              for(var i=0;i<therapist.length;i++)
              {
                const query = `INSERT INTO therapist_in_service_tbl(therapist_id, walkin_id)
                VALUES("${therapist[i]}","${walkinId}")`

                db.query(query,(err,out)=>{
                  if(err)
                  {
                    console.log(err)
                    console.log('FROM MULTIPLE THERAPIST')
                  }
                  else
                  {

                  }
                })
              }
              res.send({alertDesc:alertSuccess})
            }
        })
      }
      else
      {
        const queryPrivate =`INSERT INTO walkin_services_tbl
        (walkin_id, service_id,room_id, service_total_quantity, service_total_duration, bed_occupied, service_total_price)
        VALUES ("${walkinId}", "${req.body.seriviceId}","${req.body.roomId}", "${req.body.serviceQuantity}","${req.body.serviceNewDuration}",
        "${req.body.boys_quantity}","${req.body.serviceTotal}")`

        db.query(queryPrivate, (err,out)=>{
          if(err)
            {
              res.send({alertDesc: notSuccess})
            }
            else
            {
              res.send({alertDesc:alertSuccess})
            }
        })
      }
  }
})
})






exports.customer = router;