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

    var data1 = '博主,粉丝量,时间,转发量,评论量,点赞数,正文,平台\n';
    var data2 = '博主,粉丝量,时间,转发量,评论量,点赞数,正文,平台\n';
    var topData = docs[0];
    for (var i = 0; i < docs.length; i++) {
      var dt = 
        (docs[i].user.screen_name + ',' +
         docs[i].user.followers_count + ',' +
         docs[i].created_at.getUTCFullYear() + '-' + (docs[i].created_at.getUTCMonth() + 1) + '-' + docs[i].created_at.getUTCDate() + ' ' +
            docs[i].created_at.getUTCHours() + ':' + docs[i].created_at.getUTCMinutes() + ',' +
         docs[i].reposts_count + ',' +
         docs[i].comments_count + ',' +
         docs[i].attitudes_count + ',' +
         docs[i].text + ',' +
         docs[i].source + '\n');
      if (topData.created_at < docs[i].created_at) {
        data1 += dt;
      } else {
        data2 += dt;
      }
    }

    fs.writeFile('./csv/' + keyword + '(1).csv', data1, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('写入完成');
      }
    });

    fs.writeFile('./csv/' + keyword + '(2).csv', data2, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('写入完成');
      }
    });
  });
}

module.exports = data_output_to_csv;
