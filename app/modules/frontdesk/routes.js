var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();

// ||================================================================||
// ||================================================================||  
// ||---------------------- F R O N T  D E S K ----------------------||
// ||================================================================||
// ||================================================================||

router.get('/adminFrontDesk', (req, res) => {
  res.render('frontdesk/adminFrontDesk')
})
// [LOGIN]
router.post("/adminFrontDesk",(req, res) => {
	const query = `
		select * from admin_tbl where admin_username = "${req.body.admin_username}" and admin_desc="front_desk"`

		db.query(query, (err, out) => {
		console.log(out[0])
 		if(!out[0])
			return res.redirect("/adminFrontDesk?notfound?")
		else {
			if(out[0].admin_password !== req.body.admin_password)
				return res.redirect("/adminFrontDesk?incorrect")
			else {
				delete out[0].admin_password
				req.session.user = out[0]	
				return res.redirect("/frontdeskHome")
			}
		}

	})
})


// ||================================================================||  
// ||---------------------- D A S H B O A R D -----------------------||
// ||================================================================||

// [DASHBOARD]
router.get('/admindashboard', (req, res) => {
  res.render('frontdesk/dashboard/admindashboard')
})


// ||====================================================================||  
// ||---------------------- M A I N T E N A N C E -----------------------||
// ||====================================================================||

// [AMENITY]
router.get('/adminAmenities', (req, res) => {
  res.render('frontdesk/maintenance/amenity/adminAmenities')
})



// [PROMO]
//          > R E A D
router.get('/adminPromos', (req, res) => {
  const query = ` select promo_bundle_tbl.*, service_in_promo_tbl.service_id, services_tbl.service_name from promo_bundle_tbl 
  join service_in_promo_tbl on promo_bundle_tbl.promobundle_id = service_in_promo_tbl.promobundle_id 
  join services_tbl on services_tbl.service_id = service_in_promo_tbl.service_id where promo_bundle_tbl.delete_stats=0 group by promo_bundle_tbl.promobundle_id ;
  select * from services_tbl where delete_stats=0 and service_availability=0`
  db.query(query,(err,out) =>{
    res.render('frontdesk/maintenance/promo/adminPromos',{
      promos: out[0],
      services: out[1]
    })
  })
})
//          > C R E A T E (ADD) 
router.post('/adminPromos',(req, res) => {
    var aydi;
    console.log(req.body.promos)
    const query = `
      insert into 
      promo_bundle_tbl(promobundle_name, promobundle_price,promobundle_validity, promobundle_availability, promobundle_duration, promobundle_amenity_usage, delete_stats)
      value("${req.body.name}","${req.body.price}","${req.body.valid}",0 ,"${req.body.duration}","${req.body.amenity}",0)`
      
      db.query(query, (err, out) => {
        console.log(query)
        console.log(out.insertId)
        aydi=out.insertId;
        for(var i=0;i<req.body.promos.length;i++)
        {
          db.query(`insert into service_in_promo_tbl(promobundle_id, service_id) value("${aydi}","${req.body.promos[i]}")`, (err,out)=>{
            console.log(req.body.promos[i])
          })
        }
      })
  })
//            > D E L E T E 
router.post('/adminPromos/delete', (req, res) => {
    console.log(req.body.id)
    const query = `
    UPDATE promo_bundle_tbl set delete_stats=1 where promobundle_id = ${req.body.id} `
      
    db.query(query,(err,out)=>{
      res.redirect('/adminPromos')
      console.log(query)
    })
  })
//          > U P D A T E
router.post('/adminPromos/update', (req, res) => {
  console.log(req.body)
  
  const query = `UPDATE promo_bundle_tbl set
  promobundle_name="${req.body.promobundle_name}",
  promobundle_price="${req.body.promobundle_price}",
  promobundle_validity="${req.body.promobundle_validity}",
  promobundle_availability="${req.body.promobundle_availability}",
  promobundle_duration="${req.body.promobundle_duration}",
  promobundle_amenity_usage="${req.body.promobundle_amenity_usage}"
  WHERE promobundle_id = ${req.body.id1};
  `
  db.query(query,(err,out) =>{
      res.redirect("/adminPromos")
    if(err) return console.log(err)
  })
})

router.post('/adminPromos/query',(req, res) => {
  const query = `select * from promo_bundle_tbl where promobundle_id=?`
  db.query(query,[req.body.id1],(err, out) => {
      return res.send(out[0])
    })
      // res.send(out[0])
      // console.log(out[0])
      // console.log(req.body.id1)
})

router.post('/adminPromos/query1',(req, res) => {
  var id2= req.body.id1
  const query = `SELECT services_tbl.service_name, service_in_promo_tbl.service_id 
  from services_tbl join service_in_promo_tbl on services_tbl.service_id = service_in_promo_tbl.service_id 
  where service_in_promo_tbl.promobundle_id =?`
  db.query(query,[req.body.id1],(err, out) => {
    var out1= out
    db.query(`select * from promo_bundle_tbl where promobundle_id= ${id2} and delete_stats= 0`,(err,out)=>{
      return res.send({out1:out1, out2:out[0], id2})
    })
  })
})

router.post('/adminPromos/query2',(req, res) => {
  console.log(req.body.id1)
  const query = `SELECT * FROM services_tbl WHERE delete_stats=0`
  db.query(query,[req.body.id1],(err, out) => {
    return res.send({out1:out})
  })
})

router.post('/adminTherapist/updateServicesInPromo',(req,res)=>{
  console.log(req.body.id1)
  const query =`DELETE from service_in_promo_tbl where promobundle_id=${req.body.id1}`

  db.query(query,(err,out)=>{
    aydi= req.body.id1;
    for(var i=0;i<req.body.nameOfservice.length;i++)
    {
      db.query(`INSERT INTO service_in_promo_tbl(service_id, promobundle_id)value("${req.body.nameOfservice[i]}","${aydi}")`,(err,out)=>{
        if(err) return console.log(err)
        console.log(query)
      })
      console.log(query)
    }
  })
})
  
// [ROOM]
//          > R E A D
router.get('/adminRooms', (req, res) => {
  const query = ` select room_tbl.*, room_type_tbl.room_type_desc from room_tbl join room_type_tbl 
  on room_tbl.room_type_id = room_type_tbl.room_type_id where room_tbl.delete_stats=0;
  select * from room_type_tbl where delete_stats=0`
  db.query(query,(err,out) =>{
    res.render('frontdesk/maintenance/room/adminRooms',{
      rooms: out[0],
      rtyps: out[1]
    })
    console.log(out)
  })
})
//          > C R E A T E (ADD)
router.post('/adminRooms',(req, res) => {
    const query = `
      insert into 
      room_tbl(room_name, room_type_id,room_rate,bed_qty, room_availability, delete_stats)
      value("${req.body.room_name}","${req.body.room_type}","${req.body.room_rate}","${req.body.bed_qty}",0,0)`
    db.query(query, (err, out) => {
      // res.redirect('/adminRooms')
      console.log(query)
    })
  })
//          > D E L E T E
router.post('/adminRooms/delete', (req, res) => {
    console.log(req.body.id)
    const query = `UPDATE room_tbl set delete_stats=1 where room_id = ${req.body.id}`
      
    db.query(query,(err,out)=>{
      res.redirect('/adminRooms')
    })
  })
//          > U P D A T E
router.post('/adminRooms/update', (req, res) => {

  const query = `UPDATE room_tbl set 
  room_name="${req.body.room_name}", bed_qty="${req.body.bed_qty}", room_availability="${req.body.room_availability}",room_type_id="${req.body.room_type}"
  WHERE room_id = ${req.body.id1}
  `
  db.query(query,(err,out) =>{
      if(err) return console.log(err)
      res.redirect("/adminRooms")
  })
})
  router.post('/adminRooms/query',(req, res) => {
    const query = `select room_tbl.*, room_type_tbl.room_type_desc from room_tbl join room_type_tbl 
    on room_tbl.room_type_id = room_type_tbl.room_type_id where room_id=?`
    db.query(query,[req.body.id1],(err, out) => {
        var out1 = out[0]
        db.query(`select * from room_type_tbl where delete_stats=0`,(err,out)=>{
          return res.send({out1:out1, out2:out})
        })
    })
  })
  router.post('/adminRooms/statusChange',(req, res) => {
    const query = `UPDATE room_tbl set room_availability= ${req.body.stats} where room_id= ${req.body.id1}`
    db.query(query,(err,out) =>{
      if(err) return console.log(err)
      res.redirect("/adminServices")
      console.log(query)
  })
  })
// UNDER OF ROOM
// ^ROOM TYPE
//          > R E A D
router.get('/adminRoomType', (req, res) => {
  const query = `
  select * from room_type_tbl where delete_stats=0`
  db.query(query,(err,out) =>{
    res.render('frontdesk/maintenance/room/adminRoomType',{
      rtyps: out
    })
    console.log(out)
  })
})
//          > C R E A T E (ADD)
router.post('/adminRoomType',(req, res) => {
    const query = `
      insert into 
      room_type_tbl(room_type_desc, delete_stats)
      value("${req.body.room_type_desc}",0)`
    db.query(query, (err, out) => {
      // res.redirect('/adminRooms')
      console.log(query)
    })
  })
//          > D E L E T E
router.post('/adminRoomType/delete', (req, res) => {
    console.log(req.body.id)
    const query = `UPDATE room_type_tbl set delete_stats=1 where room_type_id = ${req.body.id}`
      
    db.query(query,(err,out)=>{
      res.redirect('/adminRoomType')
    })
  })
//          > U P D A T E
router.post('/adminRoomType/update', (req, res) => {

  const query = `UPDATE room_type_tbl set 
  room_type_desc="${req.body.room_type_desc}"
  WHERE room_type_id = ${req.body.id1}
  `
  db.query(query,(err,out) =>{
      if(err) return console.log(err)
      res.redirect("/adminRoomType")
  })
})
  router.post('/adminRoomType/query',(req, res) => {
    const query = `select * from room_type_tbl where room_type_id=?`
    db.query(query,[req.body.id1],(err, out) => {
        res.send(out[0])
        console.log(out[0])
        console.log(req.body.id1)
    })
  })



// [SERVICE]
//          > R E A D
router.get('/adminServices', (req, res) => {
  const query = ` select services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc 
  from services_tbl join service_duration_tbl on services_tbl.service_duration_id = service_duration_tbl.service_duration_id
  join service_type_tbl on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats = 0;
  select * from service_type_tbl where delete_stats=0 and service_type_availability= 0;
  select * from service_duration_tbl where delete_stats=0`
  db.query(query,(err,out) =>{
    res.render('frontdesk/maintenance/service/adminServices',{
      services: out[0],
      typs: out[1],
      durations: out[2]
    })
    console.log(out)
  })
})
//          > C R E A T E (ADD)
router.post('/adminServices',(req, res) => {
    const query = `
      insert into 
      services_tbl(service_name, service_type_id, service_duration_id, service_price, service_availability, service_points, delete_stats)
      value("${req.body.name}","${req.body.type}","${req.body.duration}","${req.body.price}", 1,"${req.body.points}",0)`
    db.query(query, (err, out) => {
      res.redirect('/adminServices')
      console.log(query)
    })
  })
//          > D E L E T E
router.post('/adminServices/delete', (req, res) => {
    console.log(req.body.id)
    const query = `UPDATE services_tbl set delete_stats = 1 where service_id = ${req.body.id}`
      
    db.query(query,(err,out)=>{
      res.redirect('/adminServices')
    })
  })
//          > U P D A T E
router.post('/adminServices/update', (req, res) => {

  const query = `UPDATE services_tbl set
  service_name="${req.body.service_name}",
  service_duration_id="${req.body.service_duration}",
  service_price="${req.body.service_price}",
  service_type_id="${req.body.service_type}",
  service_points="${req.body.service_points}"
  WHERE service_id = ${req.body.id1}
  `
  db.query(query,(err,out) =>{
      if(err) return console.log(err)
      res.redirect("/adminServices")
})
})
router.post('/adminServices/query',(req, res) => {
  const query = `select services_tbl.*, service_duration_tbl.*, service_type_tbl.* from services_tbl join service_duration_tbl
  on services_tbl.service_duration_id = service_duration_tbl.service_duration_id join service_type_tbl 
  on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.service_id=?`
  db.query(query,[req.body.id1],(err, out) => {
    var out1 = out[0]
    db.query(`select * from service_type_tbl where delete_stats= 0`,(err,out)=>{
      var out2 = out
      db.query(`select * from service_duration_tbl where delete_stats= 0`,(err,out)=>{
      return res.send({out1:out1, out2:out2, out3:out})
    })
      // res.send(out[0])
      // console.log(out[0])
      // console.log(req.body.id1)
  })
})
})
router.post('/adminServices/statusChange',(req, res) => {
  const query = `UPDATE services_tbl set service_availability= ${req.body.stats} where service_id= ${req.body.id1}`
  db.query(query,(err,out) =>{
    if(err) return console.log(err)
    res.redirect("/adminServices")
    console.log(query)
})
})

// ^UNDER OF SERVICE
// [SERVICE TYPE]
//          > R E A D
router.get('/adminServiceType', (req, res) => {
  const query = ` select * from service_type_tbl where delete_stats= 0`
  db.query(query,(err,out) =>{
    res.render('frontdesk/maintenance/service/adminServiceType',{
      typs: out
    })
  })
})
//          > C R E A T E (ADD)
router.post('/adminServiceType',(req, res) => {
  const query = `
    insert into 
    service_type_tbl(service_type_desc, service_type_availability ,delete_stats)
    value("${req.body.service_type_desc}",0,0)`
  db.query(query, (err, out) => {
    console.log(query)
  })
})
//          > U P D A T E
router.post('/adminServiceType/update', (req, res) => {

  const query = `UPDATE service_type_tbl set service_type_desc = "${req.body.service_type_desc}"
  WHERE service_type_id = ${req.body.id1}
  `
  db.query(query,(err,out) =>{
      if(err) return console.log(err)
      res.redirect("/adminServiceType")
  })
})
router.post('/adminServiceType/query',(req, res) => {
  const query = `select * from service_type_tbl where service_type_id=?`
  db.query(query,[req.body.id1],(err, out) => {
      
      return res.send(out[0])
      console.log(out[0])
      console.log(req.body.id)
  })
})

router.post('/adminServiceType/statusChange',(req, res) => {
  const query = `UPDATE service_type_tbl set service_type_availability= ${req.body.stats} where service_type_id= ${req.body.id1}`
  db.query(query,(err,out) =>{
    if(err) return console.log(err)
    res.redirect("/adminServiceType")
    console.log(query)
})
})
//          > D E L E T E
router.post('/adminServiceType/delete', (req, res) => {
  console.log(req.body.id)
  const query = `UPDATE service_type_tbl set delete_stats = 1 where service_type_id = ${req.body.id}`
    
  db.query(query,(err,out)=>{
    res.redirect('/adminServiceType')
  })
})


// [SERVICE DURATION]
//          > R E A D
router.get('/adminServiceDuration', (req, res) => {
  const query = ` select * from service_duration_tbl where delete_stats = 0 `
  db.query(query,(err,out) =>{
    res.render('frontdesk/maintenance/service/adminServiceDuration',{
      durations: out
    })
  })
})
//          > C R E A T E (ADD)
router.post('/adminServiceDuration',(req, res) => {
  const query = `
    insert into 
    service_duration_tbl(service_duration_desc, delete_stats)
    value("${req.body.service_duration_desc}", 0)`
  db.query(query, (err, out) => {
    console.log(query)
  })
})
//          > U P D A T E
router.post('/adminServiceDuration/update', (req, res) => {

  const query = `UPDATE service_duration_tbl set service_duration_desc = "${req.body.service_duration_desc}"
  WHERE service_duration_id = ${req.body.id}
  `
  db.query(query,(err,out) =>{
      if(err) return console.log(err)
      res.redirect("/adminServiceType")
  })
})
router.post('/adminServiceDuration/query',(req, res) => {
  const query = `select * from service_duration_tbl where service_duration_id=?`
  db.query(query,[req.body.id],(err, out) => {
      
      return res.send(out[0])
      console.log(out[0])
      console.log(req.body.id)
  })
})
//          > D E L E T E
router.post('/adminServiceDuration/delete', (req, res) => {
  console.log(req.body.id)
  const query = `UPDATE service_duration_tbl set delete_stats = 1 where service_duration_id = ${req.body.id}`
    
  db.query(query,(err,out)=>{
    res.redirect('/adminServiceDuration')
  })
})






// [THERAPIST]
//          > R E A D 
router.get('/adminTherapist', (req, res) => {
  const query = ` select * from therapist_tbl where delete_stats= 0;
  select * from specialty_tbl where delete_stats= 0`
  db.query(query,(err,out) =>{
    res.render('frontdesk/maintenance/therapist/adminTherapist',{
      theras: out[0],
      specialtys: out[1]
    })
  })
})
//          > C R E A T E (ADD)
router.post('/adminTherapist',(req, res) => {
  var aydi;
  const query = `
    insert into 
    therapist_tbl
    (therapist_fname, 
      therapist_mname, 
      therapist_lname, 
      address_house_no, 
      address_street_name, 
      address_admin_district, 
      address_city, 
      therapist_contact_no, 
      therapist_age,
      therapist_gender, 
      therapist_availability,
      delete_stats)
      value
      ("${req.body.therapist_fname}", 
      "${req.body.therapist_mname}", 
      "${req.body.therapist_lname}", 
      "${req.body.address_house_no}", 
      "${req.body.address_street_name}", 
      "${req.body.address_admin_district}", 
      "${req.body.address_city}", 
      "${req.body.therapist_contact_no}", 
      "${req.body.therapist_age}", 
      "${req.body.therapist_gender}", 
      0,0)`
      db.query(query, (err, out) => {
        console.log(out.insertId)
        aydi=out.insertId;
        for(var i=0;i<req.body.therapist_specialty.length;i++){
          db.query(`insert into therapist_specialty_tbl(therapist_id, specialty_id) value("${aydi}","${req.body.therapist_specialty[i]}")`,(err,out)=>{
          })
        }

      })
    })
//          > D E L E T E
router.post('/adminTherapist/delete', (req, res) => {
  console.log(req.body.id)
  const query = `UPDATE therapist_tbl set delete_stats= 1 where therapist_id = ${req.body.id} `
  
  db.query(query,(err,out)=>{
    res.redirect('/adminTherapist')
  })
})


//          > U P D A T E
router.post('/adminTherapist/update', (req, res) => {
  
  console.log(req.body)
  console.log("Galing sa Web")
  const query = `UPDATE therapist_tbl set 
  therapist_fname="${req.body.therapist_fname}",
  therapist_mname="${req.body.therapist_mname}",
  therapist_lname="${req.body.therapist_lname}",
  address_house_no="${req.body.address_house_no}",
  address_street_name="${req.body.address_street_name}",
  address_admin_district="${req.body.address_admin_district}",
  address_city="${req.body.address_city}",
  therapist_age="${req.body.therapist_age}",
  therapist_gender="${req.body.therapist_gender}",
  therapist_contact_no="${req.body.therapist_contact_no}"
  WHERE therapist_id = ${req.body.id1};
  `
  db.query(query,(err,out) =>{
      if(err) return console.log(err)
      console.log(query)
      res.redirect("/adminTherapist")
    })
})

router.post('/adminTherapist/query',(req, res) => {
  const query = `select * from therapist_tbl where therapist_id=?`
  db.query(query,[req.body.id1],(err, out) => {
      return res.send(out[0])
    })
  })

router.post('/adminTherapist/query1',(req, res) => {
  var id2 = req.body.id1
  const query = `SELECT specialty_tbl.specialty_desc, therapist_specialty_tbl.specialty_id
  from specialty_tbl join therapist_specialty_tbl on specialty_tbl.specialty_id = therapist_specialty_tbl.specialty_id 
  where therapist_specialty_tbl.therapist_id =?`
  db.query(query,[req.body.id1],(err, out) => {
    var out1= out
    db.query(`select * from therapist_tbl where delete_stats= 0 and therapist_id= ${id2}`,(err,out)=>{
      return res.send({out1:out1, out2:out[0], id2})
      console.log(out[0])
    })
  })
})

router.post('/adminTherapist/query2',(req,res)=>{
  console.log(req.body.id1)
  const query =`SELECT * FROM specialty_tbl where delete_stats=0`
  db.query(query,[req.body.id1],(err, out) => {
    return res.send(out)
  })
})

router.post('/adminTherapist/updateTherapistSpecialty',(req,res)=>{
  console.log(req.body.id1)
  const query =`DELETE from therapist_specialty_tbl where therapist_id=${req.body.id1}`

  db.query(query,(err,out)=>{
    aydi= req.body.id1;
    for(var i=0;i<req.body.specialty.length;i++)
    {
      db.query(`INSERT INTO therapist_specialty_tbl(specialty_id, therapist_id)value("${req.body.specialty[i]}","${aydi}")`,(err,out)=>{
        if(err) return console.log(err)

      })
    }
  })
})

// ^UNDER OF THERAPIST
// [THERIST SPECIALTY]
//        > R E A D
router.get('/adminSpecialty', (req, res) => {
  const query = ` select * from specialty_tbl where delete_stats=0`
  db.query(query,(err,out) =>{
    res.render('frontdesk/maintenance/therapist/adminSpecialty',{
      specialtys: out
    })
    console.log(out)
  })
})
//          > C R E A T E (ADD)
router.post('/adminSpecialty',(req, res) => {
  const query = `
    insert into 
    specialty_tbl(specialty_desc)
    value("${req.body.specialty_desc}")`
  db.query(query, (err, out) => {
    console.log(query)
  })
})
//          > U P D A T E
router.post('/adminSpecialty/update', (req, res) => {

  const query = `UPDATE specialty_tbl set specialty_desc = "${req.body.specialty_desc}"
  WHERE specialty_id = ${req.body.id}
  `
  db.query(query,(err,out) =>{
      if(err) return console.log(err)
      res.redirect("/adminSpecialty")
  })
})
router.post('/adminSpecialty/query',(req, res) => {
  const query = `select * from specialty_tbl where specialty_id=?`
  db.query(query,[req.body.id1],(err, out) => {
      
      return res.send(out[0])
      console.log(out[0])
      console.log(req.body.id)
  })
})
//          > D E L E T E
router.post('/adminSpecialty/delete', (req, res) => {
  console.log(req.body.id)
  const query = `UPDATE specialty_tbl set delete_stats = 1 where specialty_id = ${req.body.id}`
    
  db.query(query,(err,out)=>{
    res.redirect('/adminSpecialty')
  })
})




router.get('/adminFreebies', (req, res) => {
  res.render('frontdesk/maintenance/freebies/adminFreebies')
})



// ||====================================================================||  
// ||---------------------- T R A N S A C T I O N -----------------------||
// ||====================================================================||

// [CUSTOMER]
//          > R E A D 
router.get('/adminCustomer', (req, res) => {
  const query = ` select * from customer_tbl where delete_stats=0`
  db.query(query,(err,out) =>{
      res.render('frontdesk/transaction/adminCustomer',{
        customers: out
      })
      console.log(out)
    })
  })
  //          > C R E A T E (ADD)
router.post('/adminCustomer',(req, res) => {
  console.log(req.body.newDate)
  console.log(req.body.year)
  console.log(req.body.month)
  console.log(req.body.date)
  
  const query = `
  insert into 
  customer_tbl(cust_fname,cust_mname, cust_lname, cust_birthMonth, cust_birthDate, cust_birthYear, address_house_no,address_street_name,address_admin_district,address_city, cust_contact_no, cust_gender, medical_history, delete_stats) 
  values("${req.body.firstname}","${req.body.middlename}","${req.body.lastname}", "${req.body.month}","${req.body.date}","${req.body.year}", 
  "${req.body.house_no}","${req.body.street_name}","${req.body.brgy_district}","${req.body.city}", "${req.body.contact_no}", "${req.body.gender}", "${req.body.medical_history}",0)
  `
  db.query(query, (err, out) => {
    console.log(query)
  })
})
//          > D E L E T E
router.post('/adminCustomer/delete', (req, res) => {
  console.log(req.body.id)
  const query = `UPDATE customer_tbl SET delete_stats= 1 where cust_id = ${req.body.id}`
  
  db.query(query,(err,out)=>{
    res.redirect('/adminCustomer')
  })
})
//          U P D A T E
router.post('/adminCustomer/update', (req, res) => {
  
  console.log(req.body);

  const query = `UPDATE customer_tbl set 
  cust_fname="${req.body.cust_fname}",
  cust_mname="${req.body.cust_mname}",
  cust_lname="${req.body.cust_lname}",
  address_house_no="${req.body.address_house_no}",
  address_street_name="${req.body.address_street_name}",
  address_admin_district="${req.body.address_admin_district}",
  address_city="${req.body.address_city}",
  cust_gender="${req.body.cust_gender}",
  cust_contact_no="${req.body.cust_contact_no}"
  WHERE cust_id = ${req.body.id1}
  `
  db.query(query,(err,out) =>{
    res.redirect("/adminCustomer")
    console.log(query)
    if(err) return console.log(err)
  })
})
router.post('/adminCustomer/query',(req, res) => {
  const query = `select * from customer_tbl where cust_id=?`
  db.query(query,[req.body.id1],(err, out) => {
    res.send(out[0])
    console.log(out[0])
    console.log(req.body.id1)
  })
})
router.post('/adminCustomer/medicalHistory',(req, res) => {
  const query = `select * from customer_tbl where cust_id=?`
  db.query(query,[req.body.id1],(err, out) => {
    res.send({out:out[0]})
    console.log(out[0])
    console.log(req.body.id1)
  })
})





router.get('/frontdeskHome', (req, res) => {
  res.render('frontdesk/transaction/frontdeskHome')
})
// [SEARCH]
router.post('/frontdeskHome/search', (req, res) => {
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

router.get('/adminQueue', (req, res) => {
  res.render('frontdesk/transaction/adminQueue')
})



















// ************************************************************************************************ ||
// - - - - - - - - - - - - - - - - - - R E S E R V A T I O N - - - - - - - - - - - - - - - - - - -  ||
// ================================================================================================ ||

router.get('/adminReservation',(req, res) => {
    res.render('frontdesk/transaction/adminReservation')
})

router.get('/reservation',(req, res) => {
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
      res.render('frontdesk/transaction/reservation',{
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



router.get('/adminQueue',(req, res) => {
    res.render('frontdesk/transaction/adminQueue')
})
// ********************************************************************************************************* ||
// - - - - - - - - - - - - - - - - - - B O O K  R E S E R V A T I O N - - - - - - - - - - - - - - - - - - -  ||
// ========================================================================================================= ||

    //READ
router.get('/bookReservation', (req, res) => {
  date = req.body.newDate
  const query = ` SELECT services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc from services_tbl join service_duration_tbl 
  on services_tbl.service_duration_id = service_duration_tbl.service_duration_id join service_type_tbl 
  on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats=0 and services_tbl.service_type_id= 1;
  SELECT services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc from services_tbl join service_duration_tbl 
  on services_tbl.service_duration_id = service_duration_tbl.service_duration_id join service_type_tbl 
  on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats=0 and services_tbl.service_type_id= 2;
  SELECT services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc from services_tbl join service_duration_tbl 
  on services_tbl.service_duration_id = service_duration_tbl.service_duration_id join service_type_tbl 
  on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats=0 and services_tbl.service_type_id= 3;
  SELECT * FROM promo_bundle_tbl where delete_stats = 0;
  SELECT * FROM room_tbl where delete_stats=0`
  db.query(query,(err,out) =>{
      res.render('frontdesk/transaction/bookReservation',{
        bmsgs: out[0],
        bscrubs: out[1],
        addonss: out[2],
        promos: out[3],
        rooms: out[4],
        date
      })
      console.log(out)
      console.log(date)
    })
  })





router.get('/selectDate',(req,res)=>{
  res.render('frontdesk/transaction/selectDate')
})


router.get('/selectDate/:cust_id',(req, res) => {
  customerId = req.params.cust_id
  console.log(customerId)
  const query = `SELECT * FROM customer_tbl where cust_id= ${req.params.cust_id}`
  db.query(query,(err,out) =>{
		res.render("frontdesk/transaction/selectDate",{
      customers: out,
      customerId
		})
	})
})

router.get('/bookService',(req, res) => {
  res.render('frontdesk/transaction/bookService')
})

router.get('/adminWalkin',(req, res) => {
  res.render('frontdesk/transaction/adminWalkin') 
})

router.post('/adminAme', (req, res) => {
    console.log('hello')
})

exports.maintenance = router