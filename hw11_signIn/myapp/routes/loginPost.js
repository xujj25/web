var express = require('express');
var router = express.Router();
var handleLoginPost = require('../controllers/handleLoginPost');

router.post('/', function(req, res, next) {
  handleLoginPost(req, res, next);
});

module.exports = router;
