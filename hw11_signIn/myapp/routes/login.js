var express = require('express');
var router = express.Router();
var loginPage = require('../controllers/login');
var detailPage = require('../controllers/detail');

/* GET login page. */
router.get('/', function(req, res, next) {
  // res.render('login', { title: '登录' });
  console.log('login query: ', req.query);
  if (req.query == null)
  	loginPage(req, res, next);
  else
  	detailPage(req, res, next);
});

module.exports = router;
