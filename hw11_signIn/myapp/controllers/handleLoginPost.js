var findUserInDb = require('../models/user_methods').findUser;
var hashTool = require('../my_tools/hash');

var handleLoginPost = function(req, res, next) {
	console.log('in handle login post');

	var findUsername = function() {
		console.log('finding username ...');
		findUserInDb({username: req.body.username}, function(err, doc) {
			console.log('finding username ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', doc);
			if (doc == null) {
				res.send('用户不存在！');
			} else {
				if (doc.password != hashTool(req.body.password)) {
					res.send('密码不正确！');
				} else {
					res.cookie('user',
						{
							username: doc.username
						},
						{
							maxAge: 600000,
							httpOnly: true,
						});
					res.send('ok');
				}
			}
		});
	}

	findUsername();
}

module.exports = handleLoginPost;