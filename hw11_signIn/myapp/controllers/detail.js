var findUserInDb = require('../models/user_methods').findUser;

var detail = function(req, res, next) {
	findUserInDb({username: req.cookies.user.username}, function(err, doc) {
		if (err) {
			console.log(err.message);
			res.send('err');
		}
		if (doc != null) {
			if (req.cookies.user.illegal_query === true) {
				doc.info = '只能够访问自己的数据！';
				res.cookie('user',
					{
						username: req.cookies.user.username,
						illegal_query: false,
					},
					{
						maxAge: 600000,
						httpOnly: true,
					});
			} else {
				doc.info = '';
			}
			doc.title = '详情';
			res.render('detail', doc);
		}
	});
}

module.exports = detail;