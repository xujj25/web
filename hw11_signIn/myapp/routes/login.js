var express = require('express');
var router = express.Router();
var loginPage = require('../controllers/login');
var detailPage = require('../controllers/detail');

/* GET login page. */
router.get('/', function(req, res, next) {
	console.log('user cookie: ', req.cookies.user);
	console.log('username query: ', req.query.username);
	if (req.query.username === undefined) {
		if (req.cookies.user !== undefined)
			res.redirect('?username=' + req.cookies.user.username);
		else
			loginPage(req, res, next);
	} else {
		detailPage(req, res, next);
	}
});

module.exports = router;
