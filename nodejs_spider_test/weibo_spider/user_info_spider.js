const Request = require('request');
const fs = require('fs');
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
var decode = entities.decode;

var reqConfig = {
    uri: 'https://m.weibo.cn/api/container/getIndex?type=uid&value=1198392970',
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
        console.log(body);
    }
}

Request.get(reqConfig, reqCallback);