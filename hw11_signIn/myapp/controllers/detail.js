var findUserInDb = require('../models/user_methods').findUser;

var detail = function(req, res, next, flag) {
	findUserInDb(req.cookies.user, function(err, doc) {
		if (err) {
			console.log(err.message);
			res.send('err');
		}
		if (doc != null) {
			doc.info = (flag ? '' : '只能够访问自己的数据！');
			doc.title = '详情';
			res.render('detail', doc);
		}
	});
}

module.exports = detail;