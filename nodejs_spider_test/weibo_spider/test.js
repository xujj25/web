const Request = require('request');
const fs = require('fs');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
var decode = entities.decode;
const cheerio = require('cheerio');

var page = 1;
var weiboId = 4089311604948232;

var reqConfig = {
    // uri: 'http://m.weibo.cn/api/statuses/repostTimeline?id=' + weiboId + '&page=' + page,
    uri: 'http://m.weibo.cn/api/container/getIndex?containerid=100103type%253D60%2526q%253D%25E4%25BA%258E%25E6%25AC%25A2&title=%25E7%2583%25AD%25E9%2597%25A8-%25E4%25BA%258E%25E6%25AC%25A2&cardid=weibo_page&extparam=title%3D%E7%83%AD%E9%97%A8%26mid%3D%26q%3D%E4%BA%8E%E6%AC%A2&luicode=10000011&lfid=100103type%3D1%26q%3D%E4%BA%8E%E6%AC%A2&featurecode=20000320&type=all',
    headers: {
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36'
    }
};

var reqCallback = function(err, response, body) {
    if (err) {
        console.log('访问' + reqConfig.uri + '失败');
        console.log(err);
    } else {
        console.log('访问' + reqConfig.uri + '成功');
        // var resData = decoder.write(Buffer.from(body));
        body = JSON.parse(body);
        // console.log(body.cards["0"].card_group["0"].mblog.text);
        for (var i = 0; i < body.cards["0"].card_group.length; i++)
        {
            var blog_text = body.cards["0"].card_group[i].mblog.text;
            var $ = cheerio.load(blog_text);
            var arr = $('a').toArray();
            var j
            for (j = 0; j < arr.length; j++)
            {
                $(arr[j]).replaceWith($(arr[j]).text());
            }
            arr = $('.url-icon').remove();

            console.log(decode($.html()));
        }
    }
}

Request.get(reqConfig, reqCallback);