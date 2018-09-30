var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();
var mid = require("../../middlewares")
var moment = require ('moment')


// [FRONT DESK - LOGIN PAGE] 
router.get('/frontdesk', (req, res) => {
  const query =`SELECT * FROM utilities_tbl`
  
  db.query(query,(err,out)=>{
    req.session.utilities= out[0]
    res.render('frontdesk/frontdesk',{
      reqSession: req.session
    })
  })
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
// [FRONTDESK-HOME]
router.get('/frontdesk/home',mid.frontdesknauthed,(req,res)=>{
  const query = ` select * from customer_tbl where delete_stats=0;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out) =>{
    req.session.utilites = out[1]
      res.render('frontdesk/registration',{
        customers: out[0],
        reqSession: req.session
      })
    })
  })


  
router.post('/Customer/viewCustomerDetails',(req,res)=>{
  const query = `SELECT * FROM customer_tbl WHERE cust_id = ${req.body.customer_id}`

  db.query(query,(err,out)=>{
    console.log(out)
    res.send(out)
  })
})
router.post('/Customer/viewCustomerLoyaltyDetails',(req,res)=>{
  const query = `SELECT customer_tbl.* ,loyalty_tbl.* FROM customer_tbl 
  JOIN loyalty_tbl ON customer_tbl.cust_id = loyalty_tbl.cust_id WHERE customer_tbl.cust_id = ${req.body.customer_id}`

  db.query(query,(err,out)=>{
    console.log(query)
    console.log(out)
    res.send(out)
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
  var alertSuccess =0
  var notSuccess=1
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
            const query1 =`insert into loyalty_tbl(cust_id,member_username, member_password, member_points, membership_validity,paid_status) 
            value("${cust_id}","${req.body.username}","${req.body.password}",0,"${req.body.membershipDate}",0)`
            db.query(query1, (err,out)=>{
              console.log(query1)
              console.log(err)
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



// // [RESERVATION]
// router.get('/reservation',mid.frontdesknauthed,(req, res) => {
//   date = req.query.date 
//   console.log(date)
//   console.log('ID NI CUSTOMER')
//   console.log(customerId)
//   const query = `
//   SELECT services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc from services_tbl join service_duration_tbl 
//   on services_tbl.service_duration_id = service_duration_tbl.service_duration_id join service_type_tbl 
//   on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats=0 and services_tbl.service_availability=0; 
//   SELECT * FROM promo_bundle_tbl where delete_stats = 0;
//   SELECT * FROM room_tbl where delete_stats=0 and room_availability= 0 and room_type_id=2;
//   SELECT * FROM room_tbl where delete_stats=0 and room_availability= 0 and room_type_id=6;
//   SELECT * FROM therapist_tbl where delete_stats=0 and therapist_availability= 0;
//   SELECT * FROM customer_tbl where delete_stats=0 and cust_id=${customerId}`
  
//   db.query(query,(err,out) =>{
//       res.render('frontdesk/reservation',{
//         services: out[0],
//         promos: out[1],
//         crooms: out[2],
//         prooms: out[3],
//         therapists: out[4],
//         customers: out[5],
//         date
//       })
//     })
//   })


router.post('/selectTime/query',(req, res) => {
  const query = `select * from room_tbl where delete_stats=0 and room_availability=0`
  db.query(query,(err, out) => {
    res.send(out)
    console.log(out)
    console.log('OUT FROM QUERY^')
  })
})

router.post('/selectTime/queryRoom',(req,res)=>{
  const query = `SELECT * FROM room_tbl where delete_stats = 0 AND room_availability=0`

  db.query(query,(err,out)=>{
    res.send(out)
    console.log(out)
    console.log('OUT FROM QUERY ROOM ^')
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
    console.log(out)
    console.log('OUT^')
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
    console.log(query)
    console.log('QUERY FROM MULTIPLE')
    console.log('==============================================')
    console.log(out)
    console.log('OUT FROM MULTIPLE^')
    res.send(out)
  })
})
router.post('/selectTime/addResource', mid.frontdesknauthed,(req,res)=>{
  var dateNow = moment().format('MM-DD-YYYY')
  console.log(dateNow)
  const query =`SELECT SUM(bed_occupied) AS occupied, walkin_queue_tbl.*, walkin_services_tbl.*, room_tbl.* , room_type_tbl.* from walkin_queue_tbl 
  join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id
  join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id
  join room_type_tbl on room_tbl.room_type_id = room_type_tbl.room_type_id 
  where walkin_queue_tbl.walkin_date = '${req.body.datePick}' AND room_tbl.room_id=?
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
  const query = `SELECT * FROM customer_tbl where cust_id= ${customerId};
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out) =>{
    req.session.utilities = out[1]
		res.render("frontdesk/selectDate",{
      customers: out[0],
      customerId,
      restype, male,female,
      reqSession: req.session
		})
	})
})

// [BOOK RESERVATION - CHOOSE SERVICES]
router.get('/bookreservation', mid.frontdesknauthed,(req, res) => {
  var dateHello = req.query.date
  var time = req.query.time
  room = req.query.room
  roomId = req.query.roomId
  var date_time = moment(dateHello+' '+time).format('MM-DD-YYYY HH:mm')
  console.log(dateHello+' '+time)

  const query = `
  SELECT services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc , freebies_tbl.* FROM services_tbl 
  JOIN service_duration_tbl ON services_tbl.service_duration_id = service_duration_tbl.service_duration_id 
  JOIN service_type_tbl ON services_tbl.service_type_id = service_type_tbl.service_type_id 
  JOIN freebies_tbl ON services_tbl.service_id = freebies_tbl.service_id
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
  GROUP BY service_in_package_tbl.package_id`
  
  db.query(query,(err,out) =>{
    req.session.utilities = out[5]
    var services= out[0]
    var promos= out[1]
    var crooms= out[2]
    var prooms= out[3]
    var customers= out[4]
    var packages = out[6]
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
        const query=`SELECT therapist_tbl.*, therapist_attendance_tbl.* 
        FROM therapist_tbl JOIN therapist_attendance_tbl
        ON therapist_tbl.therapist_id = therapist_attendance_tbl.therapist_id
        WHERE therapist_attendance_tbl.availability =1 AND therapist_tbl.therapist_shift='First'
        ORDER BY therapist_attendance_tbl.therapist_datetime_in ASC`
    
        db.query(query,(err,out)=>{
          res.render('frontdesk/fdBookReservation',{
            date, time,room, roomId,
            reqSession: req.session,services,promos, crooms, prooms, customers,
            therapist: out, packages
          })
        })
      }
      else if(moment(date_time).isSameOrAfter(secondShift_timeStart) && moment(date_time).isSameOrAfter(secondShift_timeEnd) && moment(date_time).isSameOrAfter(firstShift_timeStart) && moment(date_time).isSameOrAfter(firstShift_timeEnd))
      {
        console.log('SECOND')
        const query=`SELECT therapist_tbl.*, therapist_attendance_tbl.* 
        FROM therapist_tbl JOIN therapist_attendance_tbl
        ON therapist_tbl.therapist_id = therapist_attendance_tbl.therapist_id
        WHERE therapist_attendance_tbl.availability =1 AND therapist_tbl.therapist_shift='Second'
        ORDER BY therapist_attendance_tbl.therapist_datetime_in ASC`
    
        db.query(query,(err,out)=>{
          res.render('frontdesk/fdBookReservation',{
            date, time,room, roomId,
            reqSession: req.session,services,promos, crooms, prooms, customers,
            therapist: out,packages
          })
        })
      }
    })


    })

// [BOOK RESERVATION - CHECK CUSTOMER DETAILS]
router.post('/CheckCustomer/Details',(req,res)=>{
  const customerQuery =`SELECT * FROM customer_tbl WHERE cust_id = ${req.body.cust_id}`

  db.query(customerQuery,(err,out)=>{
    console.log(out)
    console.log(out[0].cust_type == 0)
    if(out[0].cust_type == 0 )
    {
      res.send(out)
    }
    else
    {
      const query = `SELECT customer_tbl.* , loyalty_tbl.* FROM customer_tbl
      JOIN loyalty_tbl ON customer_tbl.cust_id = loyalty_tbl.cust_id 
      WHERE customer_tbl.cust_id = ${req.body.cust_id}`

      db.query(query,(err,out)=>{
        res.send(out)
      })
    }


  })
})

// [BOOK RESERVATION - ADD RESERVATION]
router.post('/bookreservation/addReservation',(req,res)=>{
  var walkinId;
  console.log(req.body)
  const query= `INSERT INTO walkin_queue_tbl(cust_id, walkin_start_time, walkin_end_time, walkin_total_amount, walkin_total_points,walkin_date,walkin_payment_status,walkin_indicator)
  values("${req.body.customerId}","${req.body.timeStart}","${req.body.timeEnd}","${req.body.finalTotal}","${req.body.finalPoints}","${req.body.date}",0,0)`
  db.query(query,(err,out)=>{
    var notSuccess=0;
    var querySuccess= 1
    walkinId=out.insertId;
    if(restype=='single')
      {
        for(var i=0;i<req.body.serviceId.length;i++)
          {
            const query1= `insert into walkin_services_tbl(walkin_id,service_id,room_id,service_total_quantity,service_total_duration,bed_occupied,service_total_price,therapist_id) 
            values("${walkinId}","${req.body.serviceId[i]}","${req.body.roomId}","${req.body.serviceQuantity[i]}","${req.body.serviceNewDuration[i]}",
              "${req.body.bed_quantity}","${req.body.serviceTotal[i]}","${req.body.therapist_id}")`
              db.query(query1,(err,out)=>{
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
          const queryThera=`UPDATE therapist_attendance_tbl SET `
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

router.get('/selectTime',mid.frontdesknauthed,(req,res)=>{
  const query =`SELECT * FROM utilities_tbl`

  db.query(query,(err,out)=>{
    req.session.utilities= out[0]
    res.render('frontdesk/selectTime',{
      reqSession: req.session,
      date:req.query

  })
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
  join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id WHERE room_tbl.room_type_id= '2' AND walkin_queue_tbl.walkin_payment_status=0 group by walkin_services_tbl.walkin_id;
  SELECT walkin_queue_tbl.*, walkin_services_tbl.*, customer_tbl.*, services_tbl.*, room_tbl.*
  from walkin_queue_tbl 
  join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
  join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
  join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
  join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id WHERE room_tbl.room_type_id != '2' AND walkin_queue_tbl.walkin_payment_status=0 group by walkin_services_tbl.walkin_id;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out)=>{
    req.session.utilites = out[2]
    res.render('frontdesk/fdReservation',{
      walkins: out[0],
      reservs: out[1],
      reqSession: req.session
    })
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

router.post('/fdReservation/CancelReservation',(req,res)=>{
  var alertSuccess = 0
  var notSuccess = 1
  const query = `DELETE FROM walkin_services_tbl WHERE walkin_id=?`

  db.query(query,[req.body.id],(err,out)=>{
    const query1 = `DELETE FROM walkin_queue_tbl where walkin_id=?`
  
    db.query(query1,[req.body.id],(err,out)=>{
      if(err)
      {
        res.send({alertSuccess:notSuccess})
        console.log(err)
      }
      else
      {
        res.send({alertSuccess:alertSuccess})
      }
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
  WHERE walkin_queue_tbl.walkin_payment_status = 0 AND walkin_queue_tbl.walkin_indicator = 2 
  GROUP BY walkin_services_tbl.walkin_id;
  SELECT walkin_queue_tbl.*, walkin_services_tbl.*,customer_tbl.*, services_tbl.service_name, room_tbl.room_name
  FROM walkin_queue_tbl 
  JOIN walkin_services_tbl ON walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id
  JOIN customer_tbl ON customer_tbl.cust_id = walkin_queue_tbl.cust_id
  JOIN services_tbl ON services_tbl.service_id = walkin_services_tbl.service_id
  JOIN room_tbl ON room_tbl.room_id = walkin_services_tbl.room_id
  WHERE walkin_queue_tbl.walkin_payment_status = 1 AND walkin_queue_tbl.walkin_indicator = 2 
  GROUP BY walkin_services_tbl.walkin_id;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out)=>{
    req.session.utilites = out[2]
    res.render('frontdesk/payment',{
      notpaids : out[0],
      paids: out[1],
      reqSession: req.session
    })
  })
})
router.post('/payment/query/CheckoutDets',mid.frontdesknauthed, (req, res) => {
  const query = `SELECT walkin_queue_tbl.*, walkin_services_tbl.*, 
  customer_tbl.cust_fname, customer_tbl.cust_lname, customer_tbl.cust_mname, 
  services_tbl.service_name, services_tbl.service_price, 
  room_tbl.room_name, room_tbl.room_rate, freebies_tbl.*
    from walkin_queue_tbl 
    join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
    join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
    join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
    JOIN freebies_tbl ON services_tbl.service_id = freebies_tbl.service_id
    join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id where walkin_services_tbl.walkin_id=?`
  
  db.query(query,[req.body.id],(err,out)=>{
    var out1= out;
    const custQuery =`SELECT walkin_queue_tbl.* , customer_tbl.* FROM walkin_queue_tbl
    JOIN customer_tbl ON customer_tbl.cust_id = walkin_queue_tbl.cust_id WHERE walkin_queue_tbl.walkin_id=?`
    
    db.query(custQuery,[req.body.id],(err,out)=>{
      // console.log(out[0].cust_type)
      if(out[0].cust_type==0)
      {
        const query1 = `SELECT walkin_queue_tbl.*, customer_tbl.* from walkin_queue_tbl 
        join customer_tbl on walkin_queue_tbl.cust_id = customer_tbl.cust_id 
        where walkin_queue_tbl.walkin_id =?`
        db.query(query1,[req.body.id],(err,out)=>{
          console.log(query1)
          return res.send({out1:out1, out2:out[0]})
        }) 
      }
      else if(out[0].cust_type==1)
      {
        console.log("ID: "+req.body.id)
        const query1 = `SELECT walkin_queue_tbl.*, customer_tbl.*,loyalty_tbl.* from walkin_queue_tbl 
        join customer_tbl on walkin_queue_tbl.cust_id = customer_tbl.cust_id 
        join loyalty_tbl on loyalty_tbl.cust_id = customer_tbl.cust_id
        where walkin_queue_tbl.walkin_id =?`
        db.query(query1,[req.body.id],(err,out)=>{
          return res.send({out1:out1, out2:out[0]})
      })
      console.log('PASOK DITO')
      console.log(out)
    }  
  })
})
})




router.post('/payment/query/CheckSummary',mid.frontdesknauthed, (req, res) => {
  const query = `SELECT walkin_queue_tbl.*, walkin_services_tbl.*, 
  customer_tbl.cust_fname, customer_tbl.cust_lname, customer_tbl.cust_mname, 
  services_tbl.service_name, services_tbl.service_price, 
  room_tbl.room_name, room_tbl.room_rate, freebies_tbl.*
    from walkin_queue_tbl 
    join walkin_services_tbl on walkin_queue_tbl.walkin_id = walkin_services_tbl.walkin_id 
    join customer_tbl on customer_tbl.cust_id = walkin_queue_tbl.cust_id 
    join services_tbl on services_tbl.service_id = walkin_services_tbl.service_id
    JOIN freebies_tbl ON services_tbl.service_id = freebies_tbl.service_id
    join room_tbl on room_tbl.room_id = walkin_services_tbl.room_id where walkin_services_tbl.walkin_id=?`
  
  db.query(query,[req.body.id],(err,out)=>{
    var out1= out;
    const custQuery =`SELECT walkin_queue_tbl.* , customer_tbl.* FROM walkin_queue_tbl
    JOIN customer_tbl ON customer_tbl.cust_id = walkin_queue_tbl.cust_id WHERE walkin_queue_tbl.walkin_id=?`
    
    db.query(custQuery,[req.body.id],(err,out)=>{
      // console.log(out[0].cust_type)
      if(out[0].cust_type==0)
      {
        // const queryAmount = `SELECT services_availed_tbl.* , payment_tbl.*, walkin_queue_tbl.* FROM
        // services_availed_tbl
        // JOIN payment_tbl ON services_availed_tbl.service_availed_id = payment_tbl.services_availed_id
        // JOIN walkin_queue_tbl ON walkin_queue_tbl.walkin_id = services_availed_tbl.transaction_id
        // WHERE walkin_queue_tbl.walkin_id=?`
        const query1 = `SELECT walkin_queue_tbl.*, customer_tbl.* from walkin_queue_tbl 
        join customer_tbl on walkin_queue_tbl.cust_id = customer_tbl.cust_id 
        where walkin_queue_tbl.walkin_id =?`
        db.query(query1,[req.body.id],(err,out)=>{
          var out2 = out[0]
           const queryAmount = `SELECT services_availed_tbl.* , payment_tbl.*, walkin_queue_tbl.* FROM
           services_availed_tbl
           JOIN payment_tbl ON services_availed_tbl.service_availed_id = payment_tbl.services_availed_id
           JOIN walkin_queue_tbl ON walkin_queue_tbl.walkin_id = services_availed_tbl.transaction_id
           WHERE walkin_queue_tbl.walkin_id=?`

           db.query(queryAmount,[req.body.id],(err,out)=>{
              return res.send({out1:out1, out2:out2, out3:out[0]})

           })
        }) 
      }
      else if(out[0].cust_type==1)
      {
        console.log("ID: "+req.body.id)
        const query1 = `SELECT walkin_queue_tbl.*, customer_tbl.*,loyalty_tbl.* from walkin_queue_tbl 
        join customer_tbl on walkin_queue_tbl.cust_id = customer_tbl.cust_id 
        join loyalty_tbl on loyalty_tbl.cust_id = customer_tbl.cust_id
        where walkin_queue_tbl.walkin_id =?`
        db.query(query1,[req.body.id],(err,out)=>{
          var out2 = out[0]
          const queryAmount = `SELECT services_availed_tbl.* , payment_tbl.*, walkin_queue_tbl.* FROM
          services_availed_tbl
          JOIN payment_tbl ON services_availed_tbl.service_availed_id = payment_tbl.services_availed_id
          JOIN walkin_queue_tbl ON walkin_queue_tbl.walkin_id = services_availed_tbl.transaction_id
          WHERE walkin_queue_tbl.walkin_id=?`

          db.query(queryAmount,[req.body.id],(err,out)=>{
            console.log('OUT2')
            console.log(out2)
            console.log('OUT3')
            console.log(out)
            return res.send({out1:out1, out2:out2, out3:out[0]})

          })
      })
    }  
  })
})

  // const queryAmount = `SELECT services_availed_tbl.* , payment_tbl.*, walkin_queue_tbl.* FROM
  // services_availed_tbl
  // JOIN payment_tbl ON services_availed_tbl.service_availed_id = payment_tbl.services_availed_id
  // JOIN walkin_queue_tbl ON walkin_queue_tbl.walkin_id = services_availed_tbl.transaction_id
  // WHERE walkin_queue_tbl.walkin_id=?`

  // db.query(queryAmount,[req.body.id],(err,out)=>{
  //   res.send({out3:out[0]})
  // })
})





router.post('/payment/register',(req,res)=>{
  const query = `SELECT * FROM loyalty_tbl where member_username = "${req.body.username}"`
  
  db.query(query,(err,out)=>{
    console.log(out)
    if(out== undefined || out == 0)
      {
        console.log('WALA PA')
        var alertSuccess =0
        var notSuccess =1
        var valid = moment(new Date).add(1,'year').format('MM-DD-YYYY')
        const query1=`INSERT INTO loyalty_tbl (cust_id, member_username, member_password, member_points, valid_until, paid_status)
        values("${req.body.id}","${req.body.username}","${req.body.password}", 0, "${valid}",0)`

        db.query(query1,(err,out)=>{
          const query2 = `UPDATE customer_tbl SET cust_type =1 WHERE cust_id =${req.body.id}`

          db.query(query2,(err,out)=>{
              if(err)
              {
                res.send({alertDesc:notSuccess})
              }
              else
              {
                res.send({alertDesc:alertSuccess})
              }

          })
        })

      }
    else if(out != undefined)
      {
        var Exist = 3
        res.send({alertDesc:Exist})
      }  
  })
})

router.post('/payment/Finish',(req,res)=>{

  var date= moment(new Date()).format('MMMM DD YYYY')
  const queryServAv = `SELECT * FROM services_availed_tbl where transaction_id = ${req.body.id}`
  db.query(queryServAv,(err,out)=>{
  console.log(out)
  const query = `INSERT INTO payment_tbl (services_availed_id, payment_type,payment_date,amount)
  values("${out[0].service_availed_id}","Cash","${date}","${req.body.amount}")`
  db.query(query,(err,out)=>{
    console.log(query)
    console.log(err)
  })
  })

    console.log("cust_id: "+req.body.cust_id)

    const query1=`SELECT * FROM loyalty_tbl where cust_id= ${req.body.cust_id}`

    db.query(query1,(err,out)=>{
      console.log(query1)
      console.log("OUT")
      console.log(out)
      if(out.paid_status==0)
        {
          
          const queryPaid = `UPDATE loyalty_tbl SET paid_status=1 WHERE cust_id=${req.body.cust_id};
          UPDATE walkin_queue_tbl SET walkin_payment_status =1 where walkin_id=${req.body.id}`

          db.query(queryPaid,(err,out)=>{
            if(err)
              {
                console.log(err)
                var notSuccess=1
                res.send({alertDesc:notSuccess})
              }
            else
              {
                var alertSuccess=0
                res.send({alertDesc:alertSuccess})
              }
          })
        }
        else if(out== undefined || out==0)
        {
          const queryPaid = `
          UPDATE walkin_queue_tbl SET walkin_payment_status =1 where walkin_id=${req.body.id}`

          db.query(queryPaid,(err,out)=>{
            if(err)
              {
                console.log(err)
                var notSuccess=1
                res.send({alertDesc:notSuccess})
              }
            else
              {
                var alertSuccess=0
                res.send({alertDesc:alertSuccess})
              }
          })
        }
        
    })
  })

// [THERAPIST ATTENDANCE]
router.get('/therapist', (req, res) => {
  const query = `SELECT * FROM utilities_tbl;
  SELECT therapist_tbl.*, therapist_attendance_tbl.* 
  FROM therapist_tbl JOIN therapist_attendance_tbl 
  ON therapist_tbl.therapist_id = therapist_attendance_tbl.therapist_id
  WHERE therapist_tbl.therapist_availability =0 AND therapist_tbl.delete_stats=0 
  ORDER BY therapist_shift ASC`

  db.query(query,(err,out)=>{
    req.session.utilites = out[0]
    res.render('frontdesk/therapist',{
      reqSession: req.session,
      therapist: out[1]
    })
  })
})

router.post('/therapist/Present',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1

  const query=`UPDATE therapist_attendance_tbl SET therapist_datetime_in="${req.body.datetime_in}",
  doneService_count=0, availability=1 WHERE therapist_id="${req.body.therapist_id}"`

  db.query(query,(err,out)=>{
    if(err)
    {
      res.send({alertDesc:notSuccess})
      console.log(err)
    }
    else
    {
      res.send({alertDesc:alertSuccess})
    }
  })
})  

router.post('/therapist/BreakTime',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1

  const query=`UPDATE therapist_attendance_tbl SET availability =3 WHERE therapist_id="${req.body.therapist_id}"`
  db.query(query,(err,out)=>{
    if(err)
    {
      res.send({alertDesc:notSuccess})
      console.log(err)
    }
    else
    {
      res.send({alertDesc:alertSuccess})
    }
  })
})
  
router.post('/therapist/DoneBreakTime',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1

  const query=`UPDATE therapist_attendance_tbl SET availability =1 WHERE therapist_id="${req.body.therapist_id}"`
  db.query(query,(err,out)=>{
    if(err)
    {
      res.send({alertDesc:notSuccess})
      console.log(err)
    }
    else
    {
      res.send({alertDesc:alertSuccess})
    }
  })
})

router.post('/therapist/Absent',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1

  const query=`UPDATE therapist_attendance_tbl SET availability =2 WHERE therapist_id="${req.body.therapist_id}"`
  db.query(query,(err,out)=>{
    if(err)
    {
      res.send({alertDesc:notSuccess})
      console.log(err)
    }
    else
    {
      res.send({alertDesc:alertSuccess})
    }
  })
})

// [DELETE COMMON CUSTOMER]
router.post('/DeleteCustomer',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1
  var IncorrectPassword=2

  const query=`SELECT * FROM admin_tbl WHERE admin_id=1 AND admin_password = "${req.body.admin_password}"`
  
  db.query(query,(err,out)=>{
    console.log(query)
    if(out == undefined || out == 0 )
    {
      res.send({alertDesc:IncorrectPassword})
    }
    else
    {
      const query1 = `UPDATE customer_tbl set delete_stats=1 WHERE cust_id = "${req.body.cust_id}"`

      db.query(query1,(err,out)=>{
        if(err)
        {
          console.log(err)
          res.send({alertDesc:notSuccess})
        }
        else
        {
          res.send({alertDesc:alertSuccess})
        }
      })
    }
  })
})
// // DELETE LOYALTY CUSTOMER
// router.post('/DeleteLoyaltyCustomer',(req,res)=>{
//   var alertSuccess=0
//   var notSuccess=1
//   var IncorrectPassword=2

//   const query=`SELECT * FROM admin_tbl WHERE admin_id=1 AND admin_password = "${req.body.admin_password}"`
  
//   db.query(query,(err,out)=>{
//     console.log(query)
//     if(out == undefined || out == 0 )
//     {
//       res.send({alertDesc:IncorrectPassword})
//     }
//     else
//     {
//       const query1 = `UPDATE customer_tbl set delete_stats=1 WHERE cust_id = "${req.body.cust_id}"`

//       db.query(query1,(err,out)=>{
//         if(err)
//         {
//           console.log(err)
//           res.send({alertDesc:notSuccess})
//         }
//         else
//         {
//           res.send({alertDesc:alertSuccess})
//         }
//       })
//     }
//   })
// })
exports.frontdesk = router;