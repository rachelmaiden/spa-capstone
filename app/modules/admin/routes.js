var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();
var mid = require("../../middlewares")
var moment = require ('moment')
var multer = require('multer')
const path = require('path');


// [ADMIN - LOGIN PAGE] 
router.get('/admin', (req, res) => {
  const query = `SELECT * FROM utilities_tbl`

  db.query(query,(err,out)=>{
    req.session.utilities = out[0]
    res.render('admin/admin',{
      reqSession: req.session
    })
  })
})

// [LOGIN]
router.post("/admin/login",(req, res) => {
	const query = `
		select * from admin_tbl where admin_username = "${req.body.admin_username}" and admin_desc="front_desk"`

		db.query(query, (err, out) => {
 		if(!out[0])
			return res.redirect("/admin/admin#notfound")
		else {
			if(out[0].admin_password !== req.body.admin_password)
				return res.redirect("/admin/admin#incorrect")
			else {
				delete out[0].admin_password
				req.session.user = out[0]	
				return res.redirect("/admin/admindashboard")
			}
		}

  })
})
// [LOG OUT]
router.post("/admin/logout", (req, res) => {
  req.session.destroy(err => {
    if(err) console.err
    res.redirect("/admin/admin")
  })
})

// ||================================================================||  
// ||---------------------- D A S H B O A R D -----------------------||
// ||================================================================||

// [DASHBOARD]
router.get('/admindashboard',mid.adminnauthed,(req, res) => {

  const query =`SELECT * FROM utilities_tbl;
  SELECT COUNT(*) as total_therapist FROM therapist_tbl WHERE delete_stats =0 AND therapist_availability =0`

  db.query(query,(err,out)=>{
    req.session.utilities = out[0]
    res.render('admin/dashboard/admindashboard',{
      reqSession: req.session,
      therapist_counts: out[1]
    })
  })
})



// ||====================================================================||  
// ||---------------------- M A I N T E N A N C E -----------------------||
// ||====================================================================||

// [GC]
router.get('/giftcertificate', (req, res) => {
  const query =`SELECT * FROM utilities_tbl;
  SELECT * FROM giftcertificate_tbl ORDER BY gc_name`

  db.query(query,(err,out)=>{
    req.session.utilities = out[0]
    res.render('admin/maintenance/giftcertificate/gc',{
      reqSession: req.session,
      giftcerts: out[1]
    })
  })
})

// [GIFT CERTIFICATE - ADD]
router.post('/AddGiftCertificate',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1
  var gcExist =2

  var gc_quantity = req.body.gc_quantity
  
  const query = `SELECT * FROM giftcertificate_tbl WHERE gc_name = "${req.body.gc_name}" AND gc_price="${req.body.gc_price}" AND gc_value="${req.body.gc_value}"`

  db.query(query,(err,out)=>{
    if(out==undefined || out==0)
    {
      for(var i=0;i<gc_quantity;i++)
      {
        let refCode = Math.random().toString(36).substring(7);
        const query = `INSERT INTO giftcertificate_tbl(gc_name,gc_value,gc_price,gc_refCode,release_stats)
        VALUES("${req.body.gc_name}","${req.body.gc_value}","${req.body.gc_price}","${refCode}",0)`
    
        db.query(query,(err,out)=>{

        })
      }
        res.send({alertDesc:alertSuccess})
    }
    else
    {
      res.send({alertDesc:gcExist})
    }
  })
})

// [GIFT CERTIFICATE - DELETE]
router.post('/DeleteGiftCertificate',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1

  const query =`DELETE FROM giftcertificate_tbl WHERE gc_id = ${req.body.gc_id}`
  
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

// [GIFT CERTIFICATE - RELEASE]
router.post('/ReleaseGiftCertificate',(req,res)=>{
  var alertSuccess =0
  var notSuccess =1

  const query = `UPDATE giftcertificate_tbl SET release_stats= 1 WHERE gc_id = ${req.body.gc_id}`

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


// =========================================================================================================================================================================
// [PACKAGE]
//          > R E A D
router.get('/adminPackages',mid.adminnauthed,(req, res) => {
  const query =`SELECT * FROM services_tbl
  JOIN service_duration_tbl ON services_tbl.service_duration_id = service_duration_tbl.service_duration_id 
  WHERE services_tbl.delete_stats=0 AND services_tbl.service_availability=0;
  SELECT package_tbl.*, services_tbl.* FROM package_tbl 
  JOIN service_in_package_tbl ON service_in_package_tbl.package_id = package_tbl.package_id
  JOIN services_tbl ON services_tbl.service_id = service_in_package_tbl.service_id WHERE package_tbl.delete_stats=0
  GROUP BY package_tbl.package_id;
  SELECT * FROM utilities_tbl;
  SELECT * FROM room_tbl WHERE delete_stats=0 AND room_availability=0 AND room_rate != 0`

  db.query(query, (err,out)=>{
    req.session.utilities = out[2]
    res.render('admin/maintenance/package/adminPackages',{
      services: out[0],
      packages: out[1],
      rooms: out[3],
      reqSession: req.session
    })
  })
})
//          > C R E A T E
router.post('/adminPackages',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1
  var PackageExist=2

  const query =`SELECT * FROM package_tbl WHERE package_name ="${req.body.package_name}" 
  AND package_price='${req.body.package_price}' 
  AND package_duration ='${req.body.package_duration}' 
  AND package_maxPerson = '${req.body.package_maxPerson}'`

  db.query(query,(err,out)=>{
    console.log(query)
    if(out == undefined || out ==0 )
    {
      const query =`INSERT INTO package_tbl(package_name,package_price,package_duration,package_points,package_maxPerson,package_equivalentPoints,package_availability,delete_stats,package_roomIncluded)
      VALUE("${req.body.package_name}","${req.body.package_price}","${req.body.package_duration}","${req.body.package_points}",${req.body.package_maxPerson},"${req.body.package_equivalentPoints}",0,0,"${req.body.room_included}")`
    
      db.query(query, (err,out)=>{
        aydi= out.insertId;
        if(err)
        {
          res.send({alertDesc:notSuccess})
          console.log(err)
        }
        else
        {
          for(var i=0; i<req.body.services_included.length;i++)
          {
            const query1 = `INSERT INTO service_in_package_tbl(package_id,service_id)
            VALUE("${aydi}","${req.body.services_included[i]}")`
      
            db.query(query1,(err,out)=>{
      
            })
          }
              res.send({alertDesc:alertSuccess})
        }
      })

    }
    else
    {
      res.send({alertDesc:PackageExist})
    }
  })
})
//      > VIEW Services Included in Package
router.post('/adminPackages/viewServicesIncluded',(req, res) => {
  var id= req.body.id
  const query = `SELECT services_tbl.service_name, service_in_package_tbl.service_id 
  from services_tbl join service_in_package_tbl on services_tbl.service_id = service_in_package_tbl.service_id 
  where service_in_package_tbl.package_id=?`
  db.query(query,[req.body.id],(err, out) => {
    var out1= out
    db.query(`select * from package_tbl where package_id= ${id} and delete_stats= 0`,(err,out)=>{
      return res.send({out1:out1, out2:out[0], id})
    })
  })
})

//      > UPDATE Availability of the Package
router.post('/adminPackages/statusChange',(req, res) => {
  var alertSuccess = 0
  var notSuccess =1
  
  const query = `UPDATE package_tbl set package_availability= ${req.body.stats} where package_id= ${req.body.id}`
  db.query(query,(err,out) =>{
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

//      > UPDATE Services included in Package
router.post('/adminPackage/viewServices',(req, res) => {
  const query = `SELECT * FROM services_tbl WHERE delete_stats=0`
  db.query(query,(err, out) => {
    return res.send({out1:out})
  })
})
router.post('/adminPackages/updateServicesIncluded',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1

  const query =`DELETE from service_in_package_tbl where package_id=${req.body.id}`

  db.query(query,(err,out)=>{
    aydi= req.body.id;
    for(var i=0;i<req.body.nameOfservice.length;i++)
    {
      db.query(`INSERT INTO service_in_package_tbl(service_id, package_id)value("${req.body.nameOfservice[i]}","${aydi}")`,(err,out)=>{
      })
    }
    if (err)
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

//          > UPDATE Package Information
router.post('/adminPackages/viewPackageInformation',(req, res) => {
  const query = `SELECT * FROM package_tbl WHERE package_id=?`
  db.query(query,[req.body.id],(err, out) => {
      res.send(out[0])
    })
})
router.post('/adminPackages/updatePackageInformation', (req, res) => {
  var alertSuccess=0
  var notSuccess=1
  console.log(req.body)
  
  const query = `UPDATE package_tbl SET
  package_name="${req.body.package_name}",
  package_price="${req.body.package_price}"
  WHERE package_id="${req.body.id}"
  `
  db.query(query,(err,out) =>{
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

router.post('/adminPackages/deletePackage',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1

  const query= `UPDATE package_tbl SET delete_stats=1 WHERE package_id=?`

  db.query(query,[req.body.id],(err,out)=>{
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

// =========================================================================================================================================================================

// [PROMO]
//          > R E A D
router.get('/adminPromos',mid.adminnauthed,(req, res) => {
  const query = ` SELECT * FROM promo_bundle_tbl 
  JOIN service_in_promo_tbl ON promo_bundle_tbl.promobundle_id = service_in_promo_tbl.promobundle_id
  JOIN services_tbl ON services_tbl.service_id = service_in_promo_tbl.service_id WHERE promo_bundle_tbl.delete_stats=0 group by promo_bundle_tbl.promobundle_id ;
  SELECT * FROM services_tbl
  JOIN service_duration_tbl ON services_tbl.service_duration_id = service_duration_tbl.service_duration_id 
  WHERE services_tbl.delete_stats=0 AND services_tbl.service_availability=0;
  SELECT * FROM utilities_tbl;
  SELECT * FROM room_tbl WHERE delete_stats=0 AND room_availability =0 AND room_rate != 0`
  db.query(query,(err,out) =>{
    req.session.utilities = out[2]
    for(var i=0;i<out[0].length;i++)
    {
      out[0][i].promobundle_valid_from = moment(out[0][i].promobundle_valid_from).format('MMMM DD, YYYY')
      out[0][i].promobundle_valid_until = moment(out[0][i].promobundle_valid_until).format('MMMM DD, YYYY')
    }
    res.render('admin/maintenance/promo/adminPromos',{
      promos: out[0],
      services: out[1],
      rooms: out[3],
      reqSession: req.session
    })
  })
})
//          > C R E A T E (ADD) 
router.post('/adminPromos',(req, res) => {
    var alertSuccess=0
    var notSuccess=1
    var PromoExist=2

    var promobundle_valid_from = moment(req.body.promobundle_valid_from).format('YYYYMMDD')
    var promobundle_valid_until= moment(req.body.promobundle_valid_until).format('YYYYMMDD')
    var aydi;

    const query = `SELECT * FROM promo_bundle_tbl WHERE promobundle_name = "${req.body.promobundle_name}"
    AND promobundle_price = "${req.body.promobundle_price}"
    AND promobundle_duration= "${req.body.promobundle_duration}"
    AND promobundle_maxPerson ="${req.body.promobundle_maxPerson}"
    AND promobundle_valid_from = "${promobundle_valid_from}"
    AND promobundle_valid_until = "${promobundle_valid_until}"`

    db.query(query,(err,out)=>{
      if(out==undefined || out==0)
      {
        const query = `
          insert into 
          promo_bundle_tbl(promobundle_name, promobundle_price,promobundle_valid_from,promobundle_valid_until, promobundle_duration,promobundle_points,promobundle_equivalentPoints,promobundle_availability, promobundle_maxPerson, delete_stats, promobundle_roomIncluded)
          value("${req.body.promobundle_name}","${req.body.promobundle_price}","${promobundle_valid_from}","${promobundle_valid_until}","${req.body.promobundle_duration}","${req.body.promobundle_points}","${req.body.promobundle_equivalentPoints}",0,"${req.body.promobundle_maxPerson}",0,${req.body.promobundle_roomIncluded})`
          
          db.query(query, (err, out) => {
            console.log(query)
            aydi=out.insertId;
            if(err)
            {
              res.send({alertDesc:notSuccess})
              console.log(err)
            }
            else
            {
              for(var i=0;i<req.body.services_included.length;i++)
              {
                db.query(`insert into service_in_promo_tbl(promobundle_id, service_id) value("${aydi}","${req.body.services_included[i]}")`, (err,out)=>{
      
                })
              }
              res.send({alertDesc:alertSuccess})
              
            }
          })

      }
      else
      {
        res.send({alertDesc:PromoExist})
      }
    })
  })
//            > D E L E T E 
router.post('/adminPromos/delete', (req, res) => {
    var alertSuccess =0
    var notSuccess =1

    const query = `
    UPDATE promo_bundle_tbl set delete_stats=1 where promobundle_id = ${req.body.id} `
      
    db.query(query,(err,out)=>{
      if (err)
      {
        res.send({alertDesc:notSuccess})
      }
      else
      {
        res.send({alertDesc:alertSuccess})
      }
    })
  })
//          > U P D A T E
router.post('/adminPromos/update', (req, res) => {
  var alertSuccess=0
  var notSuccess=0
  
  const query = `UPDATE promo_bundle_tbl set
  promobundle_name="${req.body.promobundle_name}",
  promobundle_price="${req.body.promobundle_price}",
  promobundle_valid_from="${req.body.promobundle_valid_from}",
  promobundle_valid_until="${req.body.promobundle_valid_until}"
  WHERE promobundle_id = ${req.body.id};
  `
  db.query(query,(err,out) =>{
    if (err)
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

router.post('/adminPromos/updateServicesInPromo',(req,res)=>{
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

router.post('/adminPromos/statusChange',(req, res) => {
  var alertSuccess=0
  var notSuccess=1
  const query = `UPDATE promo_bundle_tbl set promobundle_availability= ${req.body.stats} where promobundle_id= ${req.body.id}`
  db.query(query,(err,out) =>{
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

// =========================================================================================================================================================================
// [ROOM]
//          > R E A D
router.get('/adminRooms',mid.adminnauthed,(req, res) => {
  const query = ` select room_tbl.*, room_type_tbl.room_type_desc from room_tbl join room_type_tbl 
  on room_tbl.room_type_id = room_type_tbl.room_type_id where room_tbl.delete_stats=0;
  select * from room_type_tbl where delete_stats=0;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out) =>{
    req.session.utilities = out[2]
    res.render('admin/maintenance/room/adminRooms',{
      rooms: out[0],
      rtyps: out[1],
      reqSession: req.session
    })
    console.log(out)
  })
})
//          > C R E A T E (ADD)
router.post('/adminRooms',(req, res) => {
  var alertSuccess=0
  var notSuccess =1
  var valExisting=2

  const query=`SELECT * FROM room_tbl WHERE room_name = "${req.body.room_name}" AND room_type_id ="${req.body.room_type_id}" AND delete_stats=0`

  db.query(query,(err,out)=>{
    if (out == undefined || out ==0)
    {
      const query = `
          INSERT INTO
          room_tbl(room_name, room_type_id,room_rate,bed_qty, room_availability, room_gender, delete_stats)
          VALUE("${req.body.room_name}","${req.body.room_type_id}","${req.body.room_rate}","${req.body.bed_qty}",0,"${req.body.room_gender}",0)`
        db.query(query, (err, out) => {
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
    }
    else if(out =! undefined)
    {
      res.send({alertDesc:valExisting})
    }
  })
  })
//          > D E L E T E
router.post('/adminRooms/delete', (req, res) => {
    var alertSuccess =0
    var notSuccess =1 
    const query = `UPDATE room_tbl set delete_stats=1 where room_id = ${req.body.id}`
      
    db.query(query,(err,out)=>{
      if (err)
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
//          > U P D A T E
router.post('/adminRooms/update', (req, res) => {
  var alertSuccess=0
  var notSuccess=1
  const query = `UPDATE room_tbl SET
  room_name="${req.body.room_name}", bed_qty="${req.body.bed_qty}", room_rate="${req.body.room_rate}", room_gender="${req.body.room_gender}"
  WHERE room_id = ${req.body.id}
  `
  db.query(query,(err,out) =>{
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
  router.post('/adminRooms/query',(req, res) => {

    const query = `select room_tbl.*, room_type_tbl.room_type_desc from room_tbl join room_type_tbl 
    on room_tbl.room_type_id = room_type_tbl.room_type_id where room_id=?`
    db.query(query,[req.body.id1],(err, out) => {
      res.send(out[0])
    })
  })
  router.post('/adminRooms/statusChange',(req, res) => {
    var alertSuccess=0
    var notSuccess=1
    const query = `UPDATE room_tbl set room_availability= ${req.body.stats} where room_id= ${req.body.id}`
    db.query(query,(err,out) =>{
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
// UNDER OF ROOM
// ^ROOM TYPE
//          > R E A D
router.get('/adminRoomType', mid.adminnauthed,(req, res) => {
  const query = `
  select * from room_type_tbl where delete_stats=0;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out) =>{
    req.session.utilities = out[1]
    res.render('admin/maintenance/room/adminRoomType',{
      rtyps: out[0],
      reqSession: req.session
    })
    console.log(out)
  })
})
//          > C R E A T E (ADD)
router.post('/adminRoomType',(req, res) => {
  var alertSuccess=0
  var notSuccess=1
  var valExisting=2

  const query =`SELECT * FROM room_type_tbl WHERE room_type_desc="${req.body.room_type_desc}" AND delete_stats=0`
  
  db.query(query,(err,out)=>{
    if (out== undefined || out==0)
    {
      const query1 = `
        INSERT INTO room_type_tbl(room_type_desc, delete_stats)
        VALUE("${req.body.room_type_desc}",0)`
      db.query(query1, (err, out) => {
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
    }
    else if(out =! undefined)
    {
      res.send({alertDesc:valExisting})
    }
  })
  
  })
//          > D E L E T E
router.post('/adminRoomType/delete', (req, res) => {
    var alertSuccess=0
    var notSuccess=1
    const query = `UPDATE room_type_tbl set delete_stats=1 where room_type_id = ${req.body.id}`
      
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
//          > U P D A T E
router.post('/adminRoomType/update', (req, res) => {
  var alertSuccess =0
  var notSuccess= 1

  const query = `UPDATE room_type_tbl set 
  room_type_desc="${req.body.room_type_desc}"
  WHERE room_type_id = ${req.body.id}
  `
  db.query(query,(err,out) =>{
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
  router.post('/adminRoomType/query',(req, res) => {
    const query = `select * from room_type_tbl where room_type_id=?`
    db.query(query,[req.body.id1],(err, out) => {
        res.send(out[0])

    })
  })

// =========================================================================================================================================================================

// [SERVICE]
//          > R E A D
router.get('/adminServices',mid.adminnauthed,(req, res) => {
  const query = ` select services_tbl.*, service_duration_tbl.service_duration_desc, service_type_tbl.service_type_desc 
  from services_tbl join service_duration_tbl on services_tbl.service_duration_id = service_duration_tbl.service_duration_id
  join service_type_tbl on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats = 0;
  select * from service_type_tbl where delete_stats=0 and service_type_availability= 0;
  select * from service_duration_tbl where delete_stats=0 and service_duration_availability=0;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out) =>{
    req.session.utilities = out[3]
    res.render('admin/maintenance/service/adminServices',{
      services: out[0],
      typs: out[1],
      durations: out[2],
      reqSession: req.session
    })
  })
})
//          > C R E A T E (ADD)
router.post('/adminServices',(req, res) => {
  console.log(req.body)
  var alertSuccess =0
  var notSuccess =1
  var ServiceExisted=2 

  const query = `SELECT * FROM services_tbl WHERE service_name ="${req.body.service_name}" AND service_type_id ="${req.body.service_type}" AND service_duration_id = "${req.body.service_duration}"` 
  
  db.query(query,(err,out)=>{
    if(out == undefined || out == 0)
    {
      const query = `
          insert into 
          services_tbl(service_name, service_type_id, service_duration_id, service_price, service_availability, service_points,service_equivalentPoints, delete_stats)
          value("${req.body.service_name}","${req.body.service_type}","${req.body.service_duration}","${req.body.service_price}", 0,"${req.body.service_points}","${req.body.equivalent_points}",0)`
        db.query(query, (err, out) => {
          var service_id = out.insertId
          if(err)
          {
            res.send({alertDesc:notSuccess})
            console.log('ERROR IN SERVICES')
            console.log(err)
          }
          else
          {
            res.send({alertDesc:alertSuccess})
          }
        })
    }
    else
    {
      res.send({alertDesc:ServiceExisted})
    }
  })
  
  })
//          > D E L E T E
router.post('/adminServices/delete', (req, res) => {
    console.log(req.body.id)
    var alertSuccess=0
    var notSuccess =1
    const query = `UPDATE services_tbl set delete_stats = 1 where service_id = ${req.body.id}`
      
    db.query(query,(err,out)=>{
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
//          > U P D A T E
router.post('/adminServices/update', (req, res) => {
  var alertSuccess =0
  var notSuccess =1
  const query = `UPDATE services_tbl set
  service_name="${req.body.service_name}",
  service_price="${req.body.service_price}",
  service_points="${req.body.service_points}",
  service_equivalentPoints = "${req.body.service_equivalentPoints}"
  WHERE service_id = ${req.body.id1}
  `
  db.query(query,(err,out) =>{
    console.log(query)
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
  var alertSuccess = 0
  var notSuccess =1
  
  const query = `UPDATE services_tbl set service_availability= ${req.body.stats} where service_id= ${req.body.id1}`
  db.query(query,(err,out) =>{
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

// ^UNDER OF SERVICE
// [SERVICE TYPE]
//          > R E A D
router.get('/adminServiceType', mid.adminnauthed,(req, res) => {
  const query = ` select * from service_type_tbl where delete_stats= 0;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out) =>{
    req.session.utilities = out[1]
    res.render('admin/maintenance/service/adminServiceType',{
      typs: out[0],
      reqSession: req.session
    })
  })
})
//          > C R E A T E (ADD)
router.post('/adminServiceType',(req, res) => {
  var alertSuccess=0
  var notSuccess=1
  var valExisting=2

  const query =`SELECT * FROM service_type_tbl WHERE service_type_desc="${req.body.service_type_desc}" AND delete_stats=0`

  db.query(query,(err,out)=>{
    if(out==undefined || out==0)
    {
      const query1 = `
        insert into 
        service_type_tbl(service_type_desc, service_type_availability ,delete_stats)
        value("${req.body.service_type_desc}",0,0)`
      db.query(query1, (err, out) => {
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
    }
    else if(out =! undefined)
    {
      res.send({alertDesc:valExisting})
    }
  })
})
//          > U P D A T E
router.post('/adminServiceType/update', (req, res) => {
  var alertSuccess =0
  var notSuccess =1

  const query = `UPDATE service_type_tbl set service_type_desc = "${req.body.service_type_desc}"
  WHERE service_type_id = ${req.body.id1}
  `
  db.query(query,(err,out) =>{
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
router.post('/adminServiceType/query',(req, res) => {
  const query = `select * from service_type_tbl where service_type_id=?`
  db.query(query,[req.body.id1],(err, out) => {
      
      return res.send(out[0])
      console.log(out[0])
      console.log(req.body.id)
  })
})

router.post('/adminServiceType/statusChange',(req, res) => {
  var alertSuccess =0
  var notSuccess =1
  
  const query = `UPDATE service_type_tbl set service_type_availability= ${req.body.stats} where service_type_id= ${req.body.id1}`
  db.query(query,(err,out) =>{
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
//          > D E L E T E
router.post('/adminServiceType/delete', (req, res) => {
  var alertSuccess=0
  var notSuccess=1

  const query = `UPDATE service_type_tbl set delete_stats = 1 where service_type_id = ${req.body.id}`
    
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


// [SERVICE DURATION]
//          > R E A D
router.get('/adminServiceDuration', mid.adminnauthed,(req, res) => {
  const query = ` select * from service_duration_tbl where delete_stats = 0;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out) =>{
    req.session.utilities = out[1]
    res.render('admin/maintenance/service/adminServiceDuration',{
      durations: out[0],
      reqSession: req.session
    })
  })
})
//          > C R E A T E (ADD)
router.post('/adminServiceDuration',(req, res) => {
  var alertSuccess=0
  var notSuccess=1
  var valExisting=2

  const query =`SELECT * FROM service_duration_tbl WHERE service_duration_desc="${req.body.service_duration_desc}" AND delete_stats=0`
  
  db.query(query,(err,out)=>{
    if(out == undefined || out==0)
    {
      const query = `
        insert into 
        service_duration_tbl(service_duration_desc, delete_stats, service_duration_availability)
        value("${req.body.service_duration_desc}", 0, 0)`
      db.query(query, (err, out) => {
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
    }
    else if(out =! undefined)
    {
      res.send({alertDesc:valExisting})
    }
  })
  
})
//          > U P D A T E
router.post('/adminServiceDuration/update', (req, res) => {
  var alertSuccess=0
  var notSuccess=1

  const query = `UPDATE service_duration_tbl set service_duration_desc = "${req.body.service_duration_desc}"
  WHERE service_duration_id = ${req.body.id}
  `
  db.query(query,(err,out) =>{
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
router.post('/adminServiceDuration/query',(req, res) => {
  const query = `select * from service_duration_tbl where service_duration_id=?`
  db.query(query,[req.body.id],(err, out) => {
      
      return res.send(out[0])
      console.log(out[0])
      console.log(req.body.id)
  })
})
router.post('/adminServiceDuration/statusChange',(req, res) => {
  var alertSuccess =0
  var notSuccess =1
  
  const query = `UPDATE service_duration_tbl set service_duration_availability= ${req.body.stats} where service_duration_id= ${req.body.id1}`
  db.query(query,(err,out) =>{
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
//          > D E L E T E
router.post('/adminServiceDuration/delete', (req, res) => {
  var alertSuccess=0
  var notSuccess=1
  const query = `UPDATE service_duration_tbl set delete_stats = 1 where service_duration_id = ${req.body.id}`
    
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



// =========================================================================================================================================================================


// [THERAPIST]
//          > R E A D 
router.get('/adminTherapist',mid.adminnauthed,(req, res) => {
  const query = ` select * from therapist_tbl where delete_stats= 0;
  select * from specialty_tbl where delete_stats= 0;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out) =>{
    req.session.utilities = out[2]
    for(var i=0;i<out[0].length;i++)
    {
      out[0][i].therapist_birthYear = moment().diff(out[0][i].therapist_birthYear,'years')
    }
    res.render('admin/maintenance/therapist/adminTherapist',{
      theras: out[0],
      specialtys: out[1],
      reqSession: req.session
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
    therapist_address, 
    therapist_contact_no, 
    therapist_gender,
    therapist_birthMonth,
    therapist_birthDate,
    therapist_birthYear, 
    therapist_shift,
    therapist_licenseExpiration,
    therapist_availability,
    delete_stats)
    value
    ("${req.body.therapist_fname}", 
    "${req.body.therapist_mname}", 
    "${req.body.therapist_lname}", 
    "${req.body.therapist_address}", 
    "${req.body.therapist_contact_no}",  
    "${req.body.therapist_gender}", 
    "${req.body.month}",
    "${req.body.date}",
    "${req.body.year}",
    "${req.body.therapist_shift}",
    "${req.body.therapist_licenseExpiration}",
    0,0)`
    db.query(query, (err, out) => {
      var alertSuccess = 1 ;
      var notSuccess= 0;
        console.log(query)
        console.log(out.insertId)
        aydi=out.insertId;
        for(var i=0;i<req.body.therapist_specialty.length;i++){
          const query1= `insert into therapist_specialty_tbl(therapist_id, specialty_id) value("${aydi}","${req.body.therapist_specialty[i]}")`
          db.query(query1,(err,out)=>{
            
          })
        }
        if(err)
        {
          res.send({alertDesc:notSuccess})
          console.log(err)
        }
        else
        {
          res.send({alertDesc:alertSuccess})
        }

        const query3 =`INSERT INTO therapist_attendance_tbl(therapist_id,availability)
        VALUE(${aydi},0)`

        db.query(query3,(err,out)=>{
        })
      })
    })
//          > D E L E T E
router.post('/adminTherapist/delete', (req, res) => {
  var alertSuccess=0
  var notSuccess=1

  const query = `UPDATE therapist_tbl set delete_stats= 1 where therapist_id = ${req.body.id} `
  
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


//          > U P D A T E
router.post('/adminTherapist/update', (req, res) => {
  var alertSuccess=0
  var notSuccess=1
  const query = `UPDATE therapist_tbl set 
  therapist_fname="${req.body.therapist_fname}",
  therapist_mname="${req.body.therapist_mname}",
  therapist_lname="${req.body.therapist_lname}",
  therapist_address= "${req.body.therapist_address}",
  therapist_birthMonth = "${req.body.month}",
  therapist_birthDate= "${req.body.date}",
  therapist_birthYear= "${req.body.year}",
  therapist_gender="${req.body.therapist_gender}",
  therapist_contact_no="${req.body.therapist_contact_no}"
  WHERE therapist_id = ${req.body.id1};
  `
  db.query(query,(err,out) =>{
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
  var alertSuccess=0
  var notSuccess=1

  const query =`DELETE from therapist_specialty_tbl where therapist_id=${req.body.id1}`

  db.query(query,(err,out)=>{
    aydi= req.body.id1;
    for(var i=0;i<req.body.specialty.length;i++)
    {
      db.query(`INSERT INTO therapist_specialty_tbl(specialty_id, therapist_id)value("${req.body.specialty[i]}","${aydi}")`,(err,out)=>{
        
      })
    }
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


router.post('/adminTherapist/statusChange',(req,res)=>{
  var alertSuccess =0
  var notSuccess =1

  const query = `UPDATE therapist_tbl SET therapist_availability = ${req.body.stats} 
  where therapist_id= ${req.body.id}`

  db.query(query, (err,out)=>{
    if (err)
    {
      res.send({alertDesc:notSuccess})
      console.log(err)
    }
    else
    {
      res.send({alertDesc:alertSuccess})
      console.log(query)
    }
  })
})

router.post('/adminTherapist/viewTherapistDetails',(req,res)=>{
  const query = `SELECT * FROM therapist_tbl WHERE therapist_id = ?`

  db.query(query,[req.body.therapist_id],(err,out)=>{
    res.send(out)
  })
})

router.post('/adminTherapist/Age',(req,res)=>{
  const query =`SELECT * FROM therapist_tbl WHERE delete_stats=0`

  db.query(query,(err,out)=>{
    res.send(out)
  })
})
// ^UNDER OF THERAPIST
// [THERAPIST SPECIALTY]
//        > R E A D
router.get('/adminSpecialty',mid.adminnauthed,(req, res) => {
  const query = ` select * from specialty_tbl where delete_stats=0;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out) =>{
    req.session.utilities = out[1]
    res.render('admin/maintenance/therapist/adminSpecialty',{
      specialtys: out[0],
      reqSession: req.session
    })
    console.log(out)
  })
})
//          > C R E A T E (ADD)
router.post('/adminSpecialty/Add',(req, res) => {
  var alertSuccess=0
  var notSuccess=1
  var valExisting=2

  const query =`SELECT * FROM specialty_tbl WHERE specialty_desc="${req.body.specialty_desc}" AND delete_stats=0`
  
  db.query(query,(err,out)=>{
    if(out == undefined || out ==0)
    {
      const query = `
        insert into 
        specialty_tbl(specialty_desc, delete_stats)
        value("${req.body.specialty_desc}",0)`
      db.query(query, (err, out) => {
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
    }
    else if(out =! undefined)
    {
      res.send({alertDesc:valExisting})
    }
  })
})
//          > U P D A T E
router.post('/adminSpecialty/update', (req, res) => {
  var alertSuccess=0
  var notSuccess=1

  const query = `UPDATE specialty_tbl set specialty_desc = "${req.body.specialty_desc}"
  WHERE specialty_id = ${req.body.id}
  `
  db.query(query,(err,out) =>{
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
router.post('/adminSpecialty/query',(req, res) => {
  const query = `select * from specialty_tbl where specialty_id=?`
  db.query(query,[req.body.id1],(err, out) => {
      
      return res.send(out[0])
  })
})
//          > D E L E T E
router.post('/adminSpecialty/delete', (req, res) => {
  var alertSuccess =0
  var notSuccess =1
  const query = `UPDATE specialty_tbl set delete_stats = 1 where specialty_id = ${req.body.id}`
    
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




// ||====================================================================||  
// ||---------------------- T R A N S A C T I O N -----------------------||
// ||====================================================================||

// [CUSTOMER]
//          > R E A D 
router.get('/adminCustomer', mid.adminnauthed,(req, res) => {
  const query = ` select * from customer_tbl where delete_stats=0;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out) =>{
    req.session.utilities = out[1]
      res.render('admin/transaction/adminCustomer',{
        customers: out[0],
        reqSession: req.session
      })
    })
  })
  //          > C R E A T E (ADD)
router.post('/adminCustomer',(req, res) => {
  const query= `select * from customer_tbl where cust_fname= "${req.body.firstname}" and cust_lname= "${req.body.lastname}" 
  and cust_birthMonth= "${req.body.month}" and cust_birthDate= "${req.body.date}" and cust_birthYear= "${req.body.year}"`
  
  db.query(query, (err, out) => {
    if(out== undefined)
    {
    const query = `
    insert into 
    customer_tbl(cust_fname,cust_mname, cust_lname, cust_birthMonth, cust_birthDate, cust_birthYear, address_house_no,address_street_name,address_admin_district,address_city, cust_contact_no, cust_gender, medical_history, delete_stats) 
    values("${req.body.firstname}","${req.body.middlename}","${req.body.lastname}", "${req.body.month}","${req.body.date}","${req.body.year}", 
    "${req.body.house_no}","${req.body.street_name}","${req.body.brgy_district}","${req.body.city}", "${req.body.contact_no}", "${req.body.gender}", "${req.body.medical_history}",0)
    `

    db.query(query, (err, out) => {
      res.redirect('/adminCustomer')
    })
    }
    else if(out != undefined)
    {
      db.query(query, (err, out) => {
        res.redirect("/adminCustomer?customeralreadyexist")
      })
    }
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
// [FREEBIES]
router.get('/adminFreebies',mid.adminnauthed, (req, res) => {
  const query =`SELECT * FROM services_tbl where delete_stats=0;
  SELECT services_tbl.*, freebies_tbl.* FROM services_tbl
  JOIN freebies_tbl ON services_tbl.service_id = freebies_tbl.service_id 
  WHERE freebies_tbl.delete_stats=0;
  SELECT package_tbl.*, freebies_package_tbl.* FROM package_tbl
  JOIN freebies_package_tbl ON package_tbl.package_id = freebies_package_tbl.package_id
  WHERE freebies_package_tbl.delete_stats=0;
  SELECT promo_bundle_tbl.*, freebies_promo_tbl.* FROM promo_bundle_tbl
  JOIN freebies_promo_tbl ON promo_bundle_tbl.promobundle_id = freebies_promo_tbl.promobundle_id
  WHERE freebies_promo_tbl.delete_stats=0;
  SELECT * FROM utilities_tbl`
  db.query(query,(err,out)=>{
    req.session.utilities =out[4]
  res.render('admin/maintenance/freebies/adminFreebies',{
    services: out[0],
    freebies: out[1],
    packages: out[2],
    promos: out[3],
    reqSession: req.session
  })
  console.log(req.session)
  })
})
router.post('/adminFreebies/addFreebies',(req, res)=>{
  var alertSuccess =0
  var notSuccess = 1
  var valExisting =2
  const query = `SELECT freebies_tbl.* , services_tbl.* from freebies_tbl
  join services_tbl ON freebies_tbl.service_id = services_tbl.service_id where freebies_tbl.service_id=? and freebies_tbl.delete_stats=0`

  db.query(query,[req.body.service],(err,out)=>{
    if(out== undefined || out ==0)
    {
      const query =`INSERT INTO freebies_tbl (service_id, equivalent_points,freebies_availability,delete_stats) values("${req.body.service}","${req.body.points}",0,0)`
      db.query(query,(err,out)=>{
        if (err)
        {
          res.send({alertDesc:notSuccess})
        }
        else
        {
          res.send({alertDesc:alertSuccess})
        }
      })
    }
    else if(out != undefined )
    {
      res.send({alertDesc:valExisting})
    }
  })
})
// STATUS CHANGE FOR FREEBIES - SERVICES
router.post('/adminFreebies/statusChange',(req, res) => {
  var alertSuccess =0
  var notSuccess =1
  const query = `UPDATE freebies_tbl set freebies_availability= ${req.body.stats} where freebies_id= ${req.body.id1}`
  db.query(query,(err,out) =>{
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
// STATUS CHANGE FOR FREEBIES - PACKAGES
router.post('/adminFreebies/statusChangePackages',(req, res) => {
  var alertSuccess =0
  var notSuccess =1
  const query = `UPDATE freebies_package_tbl set freebies_package_availability= ${req.body.stats} where freebies_package_id= ${req.body.id1}`
  db.query(query,(err,out) =>{
    console.log(query)
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

// STATUS CHANGE FOR FREEBIES - PROMOS
router.post('/adminFreebies/statusChangePromos',(req, res) => {
  var alertSuccess =0
  var notSuccess =1
  const query = `UPDATE freebies_promo_tbl set freebies_promo_availability= ${req.body.stats} where promobundle_id= ${req.body.id1}`
  db.query(query,(err,out) =>{
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
router.post('/adminFreebies/query',(req, res) => {
  console.log('ID'+req.body.id)
  const query =`
  SELECT services_tbl.*, freebies_tbl.* FROM services_tbl
  JOIN freebies_tbl ON services_tbl.service_id = freebies_tbl.service_id where freebies_tbl.freebies_id=?`

  db.query(query,[req.body.id],(err,out)=>{
    console.log(query)
    res.send(out)
  })
})
router.post('/adminFreebies/update',(req, res) => {
  var alertSuccess =0
  var notSuccess = 1
  const query =`UPDATE freebies_tbl SET equivalent_points= "${req.body.points}" where freebies_id=?`

  db.query(query,[req.body.id],(err,out)=>{
    console.log(query)
    if(err)
    {
      res.send({alertDesc:notSuccess})
    }
    else{
      res.send({alertDesc:alertSuccess})
    }
  })
})

router.post('/adminFreebies/Delete',(req, res)=>{
  var alertSuccess =0
  var notSuccess =1

  const query =`UPDATE freebies_tbl SET delete_stats=1 where freebies_id =?`

  db.query(query,[req.body.id],(err,out)=>{
    if(err)
    {
      res.send({alertDesc:notSuccess})
      console.log(err)
    }
    else
    {
      res.send({alertDesc:alertSuccess})
      console.log(query)
    }
  })
})












// ********************************************************************************************************* ||
// - - - - - - - - - - - - - - - - - - U T I L I T I E S - - - - - - - - - - - - - - - - - - -  ||
// ========================================================================================================= ||

// [UTILITIES]
//        > R E A D
  router.get('/utilities',mid.adminnauthed,(req, res) => {
    const query =`SELECT * FROM utilities_tbl`

    db.query(query,(err,out)=>{
      req.session.utilities = out[0]
      res.render('admin/utilities/utilities',{
        results: out,
        reqSession: req.session
      })
    })
  })

  // FILE UPLOAD using MULTER (IMAGE)
  var storage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, './public/upload')
    },
    filename: function (req, file, cb){
      cb(null, 'company_logo'+ '-'+Date.now()+path.extname(file.originalname))
    }
  })
  
  var upload = multer({ storage: storage})

router.post('/utilities/updateLogo',upload.single('company_logo'),(req,res)=>{
  var alertSuccess=0
  var notSuccess=1
  var company_logo = req.file.filename;
  const query= `UPDATE utilities_tbl SET company_logo = "${company_logo}"`

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
//        > CREATE or UPDATE
// router.post('/utilities',upload.single('company_logo'),(req,res)=>{
  router.post('/utilities',(req,res)=>{
  var alertSuccess=0
  var notSuccess=1
  // var company_logo = req.file.filename;
  const query =`UPDATE utilities_tbl SET
  company_name="${req.body.company_name}",
  opening_time="${req.body.opening_time}",
  closing_time="${req.body.closing_time}",
  max_guest="${req.body.max_guest}",
  membership_validity="${req.body.membership_validity}",
  membership_fee="${req.body.membership_fee}",
  entrance_fee="${req.body.entrance_fee}",
  reservation_forfeitTime="${req.body.reservation_forfeitTime}",
  firstShift_timeStart="${req.body.firstShift_timeStart}",
  firstShift_timeEnd="${req.body.firstShift_timeEnd}",
  secondShift_timeStart="${req.body.secondShift_timeStart}",
  secondShift_timeEnd="${req.body.secondShift_timeEnd}",
  reservation_timeAllowance="${req.body.reservation_timeAllowance}",
  therapist_commission="${req.body.therapist_commission}",
  amenity_cancellation='${req.body.amenity_cancellation}'
  WHERE utilities_id="${req.body.utilities_id}"
  `

  db.query(query,(err,out)=>{
    console.log(query)
    if (err)
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


// ********************************************************************************************************* ||
// - - - - - - - - - - - - - - - - - - C O M M I S S I O N - - - - -  - - - - - - - - - - - - - - - - - - -  ||
// ========================================================================================================= ||

router.get('/commission',mid.adminnauthed, (req, res) => {
  const query = `SELECT * FROM utilities_tbl`

  db.query(query,(err,out)=>{
    req.session.utilities = out
    res.render('admin/commission/comm',{
      reqSession : req.session
    })
  })
})


//QUERIES

router.get('/customerList',(req, res) => {
  const query = `SELECT * FROM customer_tbl WHERE delete_stats = 0;
  SELECT * FROM utilities_tbl`

  db.query(query,(err,out)=>{
    req.session.utilities = out[1]
    for(var i=0;i<out[0].length;i++)
    {
      out[0][i].cust_birthYear = moment().diff(out[0][i].cust_birthYear,'years')
    }
    res.render('admin/queries/customerList',{
      customers: out[0],
      reqSession: req.session
    })
  })
})

router.get('/loyaltyMembers',(req, res) => {
  const query = `SELECT * FROM customer_tbl 
  JOIN loyalty_tbl ON customer_tbl.cust_id = loyalty_tbl.cust_id
  WHERE customer_tbl.delete_stats= 0;
  SELECT * FROM utilities_tbl`

  db.query(query,(err,out)=>{
    req.session.utilities = out[1]
    res.render('admin/queries/loyaltyMembers',{
      loyaltys: out[0],
      reqSession: req.session
    })
  })
})

router.get('/servicesList',(req, res) => {
  const query =`select *
  from services_tbl join service_duration_tbl on services_tbl.service_duration_id = service_duration_tbl.service_duration_id
  join service_type_tbl on services_tbl.service_type_id = service_type_tbl.service_type_id where services_tbl.delete_stats = 0;
  SELECT * FROM utilities_tbl`

  db.query(query,(err,out)=>{
    req.session.utilities = out[1]
    res.render('admin/queries/servicesList',{
      services: out[0],
      reqSession: req.session
    })
  })
})

router.get('/packagesList',(req, res) => {
  res.render('admin/queries/packagesList')
})

router.get('/promoList',(req, res) => {
  res.render('admin/queries/promoList')
})

router.get('/therapistList',(req, res) => {
  res.render('admin/queries/therapistList')
})

router.get('/roomList',(req, res) => {
  res.render('admin/queries/roomList')
})

router.get('/freebiesList',(req, res) => {
  res.render('admin/queries/freebiesList')
})




//REPORTS
router.get('/servicesReport',(req, res) => {
  res.render('admin/reports/servicesReport')
})

router.post('/ChangeReport',(req,res)=>{
  if(req.body.report_type == 'loyalty')
  {
    const query =`SELECT *,SUM(payment_amount) As Total  FROM payment_loyalty_trans_tbl 
    GROUP BY payment_date`
  
    db.query(query,(err,out)=>{
      res.send(out)
    })
  }
  else if(req.body.report_type == 'amenity')
  {
    const query =`SELECT *,SUM(total_fee) As Total, date_only AS payment_date FROM amenities_reservation_tbl WHERE paid_status = 1 
    GROUP BY date_only
    `
  
    db.query(query,(err,out)=>{
      res.send(out)
    })
  }
  else if(req.body.report_type == 'reservation')
  {
    
  }
})

router.get('/packagesReport',(req, res) => {
  res.render('admin/reports/packagesReport')
})

// router.get('/promosReport',(req, res) => {
//   res.render('admin/reports/promosReport')
// })

// router.get('/roomsReport',(req, res) => {
//   res.render('admin/reports/roomsReport')
// })

// router.get('/freebiesReport',(req, res) => {
//   res.render('admin/reports/freebiesReport')
// })

// router.get('/gcReports',(req, res) => {
//   res.render('admin/reports/gcReports')
// })

exports.admin = router