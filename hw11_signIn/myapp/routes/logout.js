var router = require('express').Router();
var logoutJump = require('../controllers/logoutJump');

router.get('/', function(req, res, next) {
	console.log('in logout route');
	logoutJump(req, res, next);
});

module.exports = router;