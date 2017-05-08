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
        _id: '1_0_2870152_1171_1494230640',
        img_url: 'http://a1.huanqiu.cn/images/73fa315aeaa61eafe9990df120afa5c8.jpg',
        title: '许魏洲迷彩风街拍曝光  眼神清澈帅气养眼',
        src_site: '环球网'
      },
      {
        _id: '1_0_2870151_127_1494230220',
        img_url: 'http://a1.huanqiu.cn/images/276ff3e5b4352644c2dd208625054484.jpg',
        title: '德国汉诺威发现二战遗留炸弹 紧急疏散5万居民',
        src_site: '东方IC'
      }
    ]
  };
  res.send(news);
});

module.exports = router;
