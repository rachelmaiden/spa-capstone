var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();




router.get('/adminAmenities', (req, res) => {
  res.render('home/views/adminAmenities')
})

router.get('/adminServiceType', (req, res) => {
  res.render('home/views/adminServiceType')
})
router.get('/adminServiceDuration', (req, res) => {
  res.render('home/views/adminServiceDuration')
})

router.get('/adminRoomType', (req, res) => {
  res.render('home/views/adminRoomType')
})

router.get('/adminSpecialty', (req, res) => {
  res.render('home/views/adminSpecialty')
})



router.get('/adminQueue', (req, res) => {
  res.render('home/views/adminQueue')
})



router.get('/adminQueue', (req, res) => {
  res.render('home/views/adminQueue')
})

router.get('/bookService', (req, res) => {
  const query = ` select * from services_tbl where service_type ='1';
  select * from services_tbl where service_type ='2';
  select * from services_tbl where service_type ='3'`
  db.query(query,(err,out) =>{
    res.render('home/views/bookService',{
      bodys: out[0],
      scrubs: out[1],
      adds: out[2]
    })
    console.log(out)
  })
})
// ****************************************************************************************************************************************************************************************** ||
// ****************************************************************************************************************************************************************************************** ||
// ****************************************************************************************************************************************************************************************** ||
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  F R O N T  D E S K - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -||
// ========================================================================================================================================================================================== ||
// ========================================================================================================================================================================================== ||
// ========================================================================================================================================================================================== ||
router.get('/adminFrontDesk', (req, res) => {
  res.render('home/views/adminFrontDesk')
})

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
				return res.redirect("/admindashboard")
			}
		}

	})
})

router.get('/admindashboard', (req, res) => {
    res.render('home/views/admindashboard')
})




// ****************************************************************************************** ||
// - - - - - - - - - - - - - - - - - - C U S T O M E R - - - - - - - - - - - - - - - - - - -  ||
// ========================================================================================== ||





// ****************************************************************************************** ||
// - - - - - - - - - - - - - - - - - - C U S T O M E R - - - - - - - - - - - - - - - - - - -  ||
// ========================================================================================== ||

    // READ 
    router.get('/adminCustomer', (req, res) => {
        const query = ` select * from customer_tbl`
        db.query(query,(err,out) =>{
          res.render('home/views/adminCustomer',{
            customers: out
          })
          console.log(out)
        })
    })
    // ===============================================
    // CREATE(ADD)
    router.post('/adminCustomer',(req, res) => {
      const query = `
        insert into 
        customer_tbl(cust_fname,cust_mname, cust_lname, address_house_no,address_street_name,address_admin_district,address_city, cust_contact_no, cust_email, cust_age, cust_gender) 
        values("${req.body.firstname}","${req.body.middlename}","${req.body.lastname}", 
          "${req.body.house_no}","${req.body.street_name}","${req.body.brgy_district}","${req.body.city}", "${req.body.contact_no}","${req.body.email}","${req.body.age}", "Male")
            `
      db.query(query, (err, out) => {
        // res.redirect('/adminCustomer')
        console.log(query)
        console.log(out.insertId)
      })
    })
    // ===============================================
    // DELETE
    router.post('/adminCustomer/delete', (req, res) => {
        console.log(req.body.id)
        const query = `delete from customer_tbl where cust_id = ${req.body.id}`
          
        db.query(query,(err,out)=>{
          res.redirect('/adminCustomer')
        })
      })
    // ===============================================
    // UPDATE
    router.post('/adminCustomer/update', (req, res) => {

      const query = `UPDATE customer_tbl set 
      cust_fname="${req.body.cust_fname}",
      cust_mname="${req.body.cust_mname}",
      cust_lname="${req.body.cust_lname}",
      address_house_no="${req.body.address_house_no}",
      address_street_name="${req.body.address_street_name}",
      address_admin_district="${req.body.address_admin_district}",
      address_city="${req.body.address_city}",
      cust_age="${req.body.cust_age}",
      cust_contact_no="${req.body.cust_contact_no}",
      cust_email="${req.body.cust_email}"
      WHERE cust_id = ${req.body.id1}
      `
      db.query(query,(err,out) =>{
        res.redirect("/adminCustomer")
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









// ************************************************************************************************* ||
// - - - - - - - - - - - - - - - - - - P R O M O  B U N D L E - - - - - - - - - - - - - - - - - - -  ||
// ================================================================================================= ||

    //READ
    router.get('/adminPromos', (req, res) => {
        const query = ` select promo_bundle_tbl.*, service_in_promo_tbl.service_id, services_tbl.service_name from promo_bundle_tbl 
        join service_in_promo_tbl on promo_bundle_tbl.promobundle_id = service_in_promo_tbl.promobundle_id 
        join services_tbl on services_tbl.service_id = service_in_promo_tbl.service_id group by promo_bundle_tbl.promobundle_id;
        select * from services_tbl `
        db.query(query,(err,out) =>{
          res.render('home/views/adminPromos',{
            promos: out[0],
            services: out[1]
          })
        })
    })
    // ===============================================
    // CREATE(ADD)
    router.post('/adminPromos',(req, res) => {
        var aydi;
        console.log(req.body.promos)
        const query = `
          insert into 
          promo_bundle_tbl(promobundle_name, promobundle_price,promobundle_validity, promobundle_availability, promobundle_duration, promobundle_amenity_usage)
          value("${req.body.name}","${req.body.price}","${req.body.valid}",0 ,"${req.body.duration}","${req.body.amenity}")`
          
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
    // ===============================================
    // DELETE
    router.post('/adminPromos/delete', (req, res) => {
        console.log(req.body.id)
        const query = `delete from service_in_promo_tbl where promobundle_id= ${req.body.id};
        delete from promo_bundle_tbl where promobundle_id = ${req.body.id} `
          
        db.query(query,(err,out)=>{
          res.redirect('/adminPromos')
          console.log(query)
        })
      })
    // ===============================================
    // UPDATE
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
      delete from service_in_promo_tbl where promobundle_id= ${req.body.id1}
      `
      db.query(query,(err,out) =>{
        console.log(req.body.services_included)
        console.log(query)
        aydi=req.body.id1;
        console.log("DITO ID"),console.log(aydi)
        for(var i=0;i<req.body.services_included.length;i++)
        {
          db.query(`insert into service_in_promo_tbl(promobundle_id, service_id) value("${aydi}","${req.body.services_included[i]}")`, (err,out)=>{
            console.log(req.body.services_included[i])
            console.log("QUERY1")
            console.log(query)
            if(err) return console.log(err)
          })
        }
          res.redirect("/adminPromos")
        if(err) return console.log(err)
  })
    })
    router.post('/adminPromos/query',(req, res) => {
      const query = `select * from promo_bundle_tbl where promobundle_id=?`
      db.query(query,[req.body.id1],(err, out) => {
        var out1 = out[0]
        db.query(`select * from services_tbl`,(err,out)=>{
          return res.send({out1:out1, out2:out})
        })
          // res.send(out[0])
          // console.log(out[0])
          // console.log(req.body.id1)
      })
    }) 
    router.post('/adminPromos/query1',(req, res) => {
      const query = `SELECT services_tbl.service_name, service_in_promo_tbl.service_id 
      from services_tbl join service_in_promo_tbl on services_tbl.service_id = service_in_promo_tbl.service_id 
      where service_in_promo_tbl.promobundle_id =?`
      db.query(query,[req.body.id1],(err, out) => {
        return res.send({out1:out})
        console.log(out1)
      })
    })

    



// *********************************************************************************************** ||
// - - - - - - - - - - - - - - - - - - - - - - R O O M - - - - - - - - - - - - - - - - - - - - - - ||
// =============================================================================================== ||

    //READ
    router.get('/adminRooms', (req, res) => {
        const query = ` select * from room_tbl `
        db.query(query,(err,out) =>{
          res.render('home/views/adminRooms',{
            rooms: out
          })
          console.log(out)
        })
    })
    // ===============================================
    // CREATE(ADD)
    router.post('/adminRooms',(req, res) => {
        const query = `
          insert into 
          room_tbl(room_name, room_type,bed_qty)
          value("${req.body.name}","${req.body.type}","${req.body.quantity}")`
        db.query(query, (err, out) => {
          // res.redirect('/adminRooms')
          console.log(query)
        })
      })
    // ===============================================
    // DELETE
    router.post('/adminRooms/delete', (req, res) => {
        console.log(req.body.id)
        const query = `delete from room_tbl where room_id = ${req.body.id}`
          
        db.query(query,(err,out)=>{
          res.redirect('/adminRooms')
        })
      })
        // ===============================================
    // UPDATE
    router.post('/adminRooms/update', (req, res) => {

      const query = `UPDATE room_tbl set 
      room_name="${req.body.room_name}",
      bed_qty="${req.body.bed_qty}",
      room_availability="${req.body.room_availability}",
      room_type="${req.body.room_type}"
      WHERE room_id = ${req.body.id1}
      `
      db.query(query,(err,out) =>{
          if(err) return console.log(err)
          res.redirect("/adminRooms")
    })
  })
    router.post('/adminRooms/query',(req, res) => {
      const query = `select * from room_tbl where room_id=?`
      db.query(query,[req.body.id1],(err, out) => {
          res.send(out[0])
          console.log(out[0])
          console.log(req.body.id1)
      })
    })







// ****************************************************************************************** ||
// - - - - - - - - - - - - - - - - - - S E R V I C E S - - - - - - - - - - - - - - - - - - -  ||
// ========================================================================================== ||

    //READ
    router.get('/adminServices', (req, res) => {
        const query = ` select services_tbl.*, service_type_tbl.* from services_tbl, service_type_tbl 
        where 
        services_tbl.service_type_id = service_type_tbl.service_type_id;
        select * from service_type_tbl`
        db.query(query,(err,out) =>{
          res.render('home/views/adminServices',{
            services: out[0],
            typs: out[1]
          })
          console.log(out)
        })
    })
    // ===============================================
    // CREATE(ADD)
    router.post('/adminServices',(req, res) => {
        const query = `
          insert into 
          services_tbl(service_name, service_type_id, service_duration, service_price, service_availability)
          value("${req.body.name}","${req.body.type}","${req.body.duration}","${req.body.price}", 0)`
        db.query(query, (err, out) => {
          // res.redirect('/adminServices')
          console.log(query)
        })
      })
    // ===============================================
    // DELETE
    router.post('/adminServices/delete', (req, res) => {
        console.log(req.body.id)
        const query = `delete from services_tbl where service_id = ${req.body.id}`
          
        db.query(query,(err,out)=>{
          res.redirect('/adminServices')
        })
      })
    // ===============================================
    // UPDATE
    router.post('/adminServices/update', (req, res) => {

      const query = `UPDATE services_tbl set
      service_name="${req.body.service_name}",
      service_duration="${req.body.service_duration}",
      service_price="${req.body.service_price}",
      service_availability="${req.body.service_availability}"
      WHERE service_id = ${req.body.id1}
      `
      db.query(query,(err,out) =>{
          if(err) return console.log(err)
          res.redirect("/adminServices")
    })
  })
    router.post('/adminServices/query',(req, res) => {
      const query = `select * from services_tbl where service_id=?`
      db.query(query,[req.body.id1],(err, out) => {
          
          return res.send(out[0])
          console.log(out[0])
          console.log(req.body.id1)
      })
    })





// ********************************************************************************************** ||
// - - - - - - - - - - - - - - - - - - T H E R A P I S T - - - - - - - - - - - - - - - - - - - -  ||
// ============================================================================================== ||

    //READ
    router.get('/adminTherapist', (req, res) => {
      const query = ` select * from therapist_tbl`
      db.query(query,(err,out) =>{
        res.render('home/views/adminTherapist',{
          theras: out
        })
        console.log(out)
      })
    })
    // ===============================================
    // CREATE(ADD)
    router.post('/adminTherapist',(req, res) => {
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
        therapist_email, 
        therapist_specialty, 
        therapist_availability)
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
        "Male", 
        "${req.body.therapist_email}", 
        "${req.body.therapist_specialty}", 
        0)`
      db.query(query, (err, out) => {
        // res.redirect('/adminTherapist')
        console.log(query)
      })
    })
    // ===============================================
    // DELETE
    router.post('/adminTherapist/delete', (req, res) => {
      console.log(req.body.id)
      const query = `delete from therapist_tbl where therapist_id = ${req.body.id}`
        
      db.query(query,(err,out)=>{
        res.redirect('/adminTherapist')
      })
    })
    // ===============================================
    // UPDATE
    router.post('/adminTherapist/update', (req, res) => {

      const query = `UPDATE therapist_tbl set 
      therapist_fname="${req.body.therapist_fname}",
      therapist_mname="${req.body.therapist_lname}",
      therapist_lname="${req.body.therapist_mname}",
      address_house_no="${req.body.address_house_no}",
      address_street_name="${req.body.address_street_name}",
      address_admin_district="${req.body.address_admin_district}",
      address_city="${req.body.address_city}",
      therapist_age="${req.body.therapist_age}",
      therapist_contact_no="${req.body.therapist_contact_no}",
      therapist_email="${req.body.therapist_email}"
      WHERE therapist_id = ${req.body.id1}
      `
      db.query(query,(err,out) =>{
          if(err) return console.log(err)
          res.redirect("/adminCustomer")
    })
  })
    router.post('/adminTherapist/query',(req, res) => {
      const query = `select * from therapist_tbl where therapist_id=?`
      db.query(query,[req.body.id1],(err, out) => {
          res.send(out[0])
          console.log(out[0])
          console.log(req.body.id1)
      })
    })




// ************************************************************************************************ ||
// - - - - - - - - - - - - - - - - - - R E S E R V A T I O N - - - - - - - - - - - - - - - - - - -  ||
// ================================================================================================ ||

router.get('/adminReservation',(req, res) => {
    res.render('home/views/adminReservation')
})

router.get('/adminQueue',(req, res) => {
    res.render('home/views/adminQueue')
})
// ********************************************************************************************************* ||
// - - - - - - - - - - - - - - - - - - B O O K  R E S E R V A T I O N - - - - - - - - - - - - - - - - - - -  ||
// ========================================================================================================= ||

    //READ
    router.get('/bookReservation', (req, res) => {
      const query = ` select * from services_tbl where service_type ='1';
      select * from services_tbl where service_type ='2';
      select * from services_tbl where service_type ='3'`
      db.query(query,(err,out) =>{
        res.render('home/views/bookReservation',{
          bodys: out[0],
          scrubs: out[1],
          adds: out[2]
        })
        console.log(out)
      })
    })

router.get('/selectDate',(req, res) => {
    res.render('home/views/selectDate')
})

router.post('/adminAme', (req, res) => {
    console.log('hello')
})

exports.index = router