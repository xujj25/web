var User = require('../models/user');
var mongoose = require('mongoose');

var handleLoginPost = function(req, res, next) {
	console.log('in handle login post');

	var findUsername = function() {
		console.log('finding username ...');
		User.findOne({username: req.body.username}, function(err, doc) {
			console.log('finding username ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', doc);
			if (doc == null) {
				res.send('用户不存在！');
			} else {
				if (doc.password != req.body.password) {
					res.send('密码不正确！');
				} else {
					res.send('ok');
				}
			}
		});
	}
}

module.exports = handleLoginPost;