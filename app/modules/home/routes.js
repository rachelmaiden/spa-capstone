var express = require('express')
var router = express.Router()
var db = require('../../lib/database')();



router.get('/admindashboard', (req, res) => {
    res.render('home/views/admindashboard')
})

router.get('/adminAmenities', (req, res) => {
    res.render('home/views/adminAmenities')
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
        customer_tbl(cust_firstname,cust_middlename, cust_lastname, house_no,street_name,brgy_district,city, contact_no, cust_email, age) 
        values("${req.body.firstname}","${req.body.middlename}","${req.body.lastname}", 
          "${req.body.house_no}","${req.body.street_name}","${req.body.brgy_district}","${req.body.city}", "${req.body.contact_no}","${req.body.email}","${req.body.age}")
            `
      db.query(query, (err, out) => {
        // res.redirect('/adminCustomer')
        console.log(query)
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
      cust_firstname="${req.body.cust_firstname}",
      cust_middlename="${req.body.cust_middlename}",
      cust_lastname="${req.body.cust_lastname}",
      house_no="${req.body.house_no}",
      street_name="${req.body.street_name}",
      brgy_district="${req.body.brgy_district}",
      city="${req.body.city}",
      age="${req.body.age}",
      contact_no="${req.body.contact_no}",
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
        const query = ` select * from promo_bundle_tbl;
        select * from services_tbl `
        db.query(query,(err,out) =>{
          res.render('home/views/adminPromos',{
            promos: out[0],
            services: out[1]
          })
          console.log(out[0])
          console.log(out[1])
        })
    })
    // ===============================================
    // CREATE(ADD)
    router.post('/adminPromos',(req, res) => {
        const query = `
          insert into 
          promo_bundle_tbl(promobundle_name, services_included, duration, promobundle_price,promobundle_valid)
          value("${req.body.name}","${req.body.promos}","${req.body.duration}","${req.body.price}","${req.body.valid}")`
        db.query(query, (err, out) => {
          // res.redirect('/adminPromos')
          console.log(query)
        })
      })
    // ===============================================
    // DELETE
    router.post('/adminPromos/delete', (req, res) => {
        console.log(req.body.id)
        const query = `delete from promo_bundle_tbl where promobundle_id = ${req.body.id}`
          
        db.query(query,(err,out)=>{
          res.redirect('/adminPromos')
        })
      })
    // ===============================================
    // UPDATE
    router.post('/adminPromos/update', (req, res) => {

      const query = `UPDATE promo_bundle_tbl set
      promobundle_name="${req.body.promobundle_name}",
      services_included="${req.body.services_included}",
      duration="${req.body.duration}",
      promobundle_price="${req.body.promobundle_price}",
      promobundle_status="${req.body.promobundle_status}",
      promobundle_valid="${req.body.promobundle_valid}"
      WHERE promobundle_id = ${req.body.id1}
      `
      db.query(query,(err,out) =>{
          if(err) return console.log(err)
          res.redirect("/adminPromos")
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
        const query = ` select services_tbl.*, service_type.* from services_tbl, service_type 
        where 
        services_tbl.service_type = service_type.service_type_id;
        select * from service_type`
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
          services_tbl(service_name, service_type, service_duration, service_price)
          value("${req.body.name}","${req.body.type}","${req.body.duration}","${req.body.price}")`
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
        therapist_tbl(first_name,middle_name,last_name,age,house_no,street_name,brgy_district,city,contact_no,email,specialty)
        value("${req.body.firstname}","${req.body.middlename}","${req.body.lastname}","${req.body.age}","${req.body.house_no}",
      "${req.body.street_name}","${req.body.brgy_district}","${req.body.city}","${req.body.contact_no}","${req.body.email}","${req.body.specialty}")`
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
      first_name="${req.body.first_name}",
      middle_name="${req.body.middle_name}",
      last_name="${req.body.last_name}",
      house_no="${req.body.house_no}",
      street_name="${req.body.street_name}",
      brgy_district="${req.body.brgy_district}",
      city="${req.body.city}",
      age="${req.body.age}",
      contact_no="${req.body.contact_no}",
      email="${req.body.email}"
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