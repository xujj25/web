const fs = require('fs');
const weiboDao = require('./dao/weibo_dao');

var data_output_to_csv = function(keyword) {
  weiboDao.findMatchWeibo({
      topic: keyword
    }, function(err, docs) {
    if (err) {
      console.log(err);
    }
    docs.sort(function(a, b) {
      return a.reposts_count < b.reposts_count ? 1 : -1;
    });

    var data = '博主,粉丝量,时间,转发量,评论量,点赞数,正文,平台\n';
    for (var i = 0; i < docs.length; i++) {
      data += 
        (docs[i].user.screen_name + ',' +
         docs[i].user.followers_count + ',' +
         docs[i].created_at + ',' +
         docs[i].reposts_count + ',' +
         docs[i].comments_count + ',' +
         docs[i].attitudes_count + ',' +
         docs[i].text + ',' +
         docs[i].source + '\n');
    }

    fs.writeFile(keyword + '.csv', data, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('写入完成');
      }
    });
  });
}

module.exports = data_output_to_csv;
