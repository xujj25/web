var express = require('express');
var router = express.Router();
var loginPage = require('../controllers/login');
var detailPage = require('../controllers/detail');
var detailRedirect = require('../controllers/detailRedirect');

/* GET login page. */
router.get('/', function(req, res, next) {
	console.log('user cookie: ', req.cookies.user);
	console.log('username query: ', req.query.username);
	if (req.cookies.user === undefined) {
		loginPage(req, res, next);
	} else {
		if (req.query.username !== undefined &&
			req.query.username !== req.cookies.user.username) {
			detailRedirect(req, res, next);
		} else {
			detailPage(req, res, next);
		}
	}
});

module.exports = router;
