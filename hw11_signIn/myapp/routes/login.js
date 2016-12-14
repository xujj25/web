var express = require('express');
var router = express.Router();
var loginDealing = require('../controllers/login');

/* GET login page. */
router.get('/', function(req, res, next) {
  // res.render('login', { title: '登录' });
  loginDealing(req, res, next);
});

module.exports = router;
