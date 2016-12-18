var express = require('express');
var router = express.Router();
var loginPage = require('../controllers/login');
var detailPage = require('../controllers/detail');

/* GET login page. */
router.get('/', function(req, res, next) {
	console.log('user cookie: ', req.cookies.user);
	console.log('username query: ', req.query.username);
	// if (req.query.username === undefined) {
	// 	if (req.cookies.user !== undefined)
	// 		res.redirect('?username=' + req.cookies.user.username);
	// 	else
	// 		loginPage(req, res, next);
	// } else {
	// 	detailPage(req, res, next);
	// }
	if (req.cookies.user === undefined) {
		loginPage(req, res, next);
	} else {
		if (req.query.username !== undefined &&
			req.query.username !== req.cookies.user.username) {
			detailPage(req, res, next, false);
		} else {
			detailPage(req, res, next, true);
		}
	}
});

module.exports = router;
