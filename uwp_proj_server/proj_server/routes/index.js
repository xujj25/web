var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('ok');
});

/* GET users listing. */
router.get('/news', function(req, res, next) {
  var news = {
    is_success: 1,
    err_msg: '',
    news: [
      {
        _id: 12345678,
        img_url: 'http://cn.bing.com',
        title: 'hello',
        src_site: 'http://cn.bing.com'
      },
      {
        _id: 987654321,
        img_url: 'http://cn.bing.com',
        title: 'world',
        src_site: 'http://cn.bing.com'
      }
    ]
  };
  res.send(news);
});

module.exports = router;
