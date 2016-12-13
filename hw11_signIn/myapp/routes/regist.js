var express = require('express');
var router = express.Router();

/* GET regist page. */
router.get('/', function(req, res, next) {
  res.render('regist', { title: '注册' });
});

module.exports = router;
