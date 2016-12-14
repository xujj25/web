var express = require('express');
var router = express.Router();
var detailDealing = require('../controllers/detail');

router.post('/', function(req, res, next) {
  // res.render('detail', { title: '详情' });
  console.log('in handlePost route');
  detailDealing(req, res, next);
});

module.exports = router;
