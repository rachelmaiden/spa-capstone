var express = require('express')
var router = express.Router();

router.get('/home', (req, res) => {
    res.render('therapist/landing', {user: {username: 'gramarlacsina'}})
})

exports.therapist = router;