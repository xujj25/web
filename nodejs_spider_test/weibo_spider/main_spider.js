const urlencode = require('urlencode');
const Request = require('request');
const cheerio = require('cheerio');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
var weiboDao = require('./dao/weibo_dao');


var main_spider = function(keywordRaw) {
  var keywordEncoder = function(kw) { // 关键词编码器
    return urlencode(kw);
  };

  var keyword = keywordEncoder(keywordRaw); // 应用编码器对关键词进行编码

  var getUrl = function(kw, pg) {
    return 'http://m.weibo.cn/container/getIndex?type=all&queryVal=' + kw + 
            '&luicode=10000011&lfid=100103type%3D1%26q%3D' + kw +
            '&title=%E7%83%AD%E9%97%A8-' + kw +
            'extparam:title%3D%E7%83%AD%E9%97%A8%26mid%3D%26q%3D' + kw +
            '&cardid=weibo_page&containerid=100103type%3D1%26q%3D' + kw + 
            '&featurecode=20000320&page=' + pg;
  };

  var mblogTextProcessor = function(blog_text) {
    var $ = cheerio.load(blog_text);
    var arr = $('a').toArray();
    var j
    for (j = 0; j < arr.length; j++)
    {
        $(arr[j]).replaceWith($(arr[j]).text());
    }
    arr = $('.url-icon').remove();

    return entities.decode($.html());
  };

  var strToDate = function(str) {
    return (str.length < 16) ? new Date('2017-' + str) : new Date(str);
  };

  var mblogProcessor = function(mblog, kw) {
    console.log('正在处理微博内容。。。');
    weiboDao.findMatchWeibo({
      id: mblog.id
    }, function(err, docs) {
      if (err) {
        console.log(err);
      } else if (docs.length > 0) {
        console.log(mblog.id + '微博已存在');
      } else {
        var weiboObj = {
          topic: keywordRaw,
          id: mblog.id,
          user: {
            id: mblog.user.id,
            screen_name: mblog.user.screen_name,
            followers_count: mblog.user.followers_count
          },
          text: mblogTextProcessor(mblog.text),
          attitudes_count: mblog.attitudes_count,
          reposts_count: mblog.reposts_count,
          comments_count: mblog.comments_count,
          source: mblog.source,
          created_at: strToDate(mblog.created_at)
        };
        console.log(weiboObj);
        weiboDao.insertWeibo(weiboObj, function(err, product, num) {
          if (err) {
            console.log(err);
          } else {
            console.log('将微博' + weiboObj.id + '插入数据库');
          }
        });
      }
    });
  }

  var reqCallback = function(err, response, body) {
    if (err) {
      console.log(err);
    } else {
      var jsonObj = JSON.parse(body);
      if (jsonObj.cards === undefined) {
        console.log('爬虫受限制');
      } else {
        console.log('爬虫获取成功');
        var i, j;
        for (i = 0; i < jsonObj.cards.length; i++) {
          for (j = 0; j < jsonObj.cards[i].card_group.length; j++) {
            if (jsonObj.cards[i].card_group[j].mblog != undefined) {
              console.log(i + ', ' + j);
              mblogProcessor(jsonObj.cards[i].card_group[j].mblog, keyword);
            }
          }
        }
      }
    }
  }

  var spider = function(url) {
    Request.get({
      uri: url,
      headers: {
          'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
      }
    }, reqCallback);
  }

  var page = 0;
  var finishFlag = false;
  var waitingTime = 5000;
  var timerseed = setInterval(function() {
      spider(getUrl(keyword, page));
      page++;
      if (page == 1000) {
        console.log('\n完成当前关键词爬取\n');
        clearInterval(timerseed);
      } else {
        console.log('\n爬取进行至第' + page + '页\n');
      }
    }, waitingTime);
}

module.exports = main_spider;