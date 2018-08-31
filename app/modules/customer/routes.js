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

router.get('/selectDate',mid.guestistnauthed,(req,res)=>{

		customerId = req.query.id
		restype= req.query.reservetype
		male = req.query.male
		female = req.query.female
		const query = `SELECT customer_tbl.*, loyalty_tbl.*
		FROM customer_tbl
		JOIN loyalty_tbl ON customer_tbl.cust_id = loyalty_tbl.cust_id
		WHERE customer_tbl.cust_id= ${customerId}`
		db.query(query,(err,out) =>{
			res.render("customer/selectDate",{
				customers: out,
				customerId,
				restype, male,female
			})
		})
})

exports.customer = router;