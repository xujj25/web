var Weibo = require('../models/weibo');


exports.findMatchWeibo = function(infoObj, callback) {
  Weibo.find(infoObj, callback);
};

exports.insertWeibo = function(weiboObj, callback) {
  (new Weibo(weiboObj)).save(callback);
};