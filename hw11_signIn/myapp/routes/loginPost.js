var express = require('express');
var router = express.Router();
var handleLoginPost = require('../controllers/handleLoginPost');

router.post('/', function(req, res, next) {
  // res.render('detail', { title: '详情' });
  // console.log('in handlePost route');
  handleLoginPost(req, res, next);
});

module.exports = router;
