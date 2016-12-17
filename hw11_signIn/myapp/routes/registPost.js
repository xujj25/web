var express = require('express');
var router = express.Router();
var handleRegistPost = require('../controllers/handleRegistPost');

router.post('/', function(req, res, next) {
  // res.render('detail', { title: '详情' });
  console.log('in registPost route');
  handleRegistPost(req, res, next);
});

module.exports = router;
