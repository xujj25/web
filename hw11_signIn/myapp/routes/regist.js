var express = require('express');
var router = express.Router();
var registPage = require('../controllers/regist');

/* GET regist page. */
router.get('/', function(req, res, next) {
  // res.render('regist', { title: '注册' });
  registPage(req, res, next);
});

module.exports = router;
