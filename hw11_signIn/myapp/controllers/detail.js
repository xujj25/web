var User = require('../models/user');

var detail = function(req, res, next) {
	User.findOne(req.query, function(err, doc) {
		if (err) {
			console.log(err.message);
			res.send('err');
		}
		if (doc != null) {
			doc.title = '详情';
			res.render('detail', doc);
		}
	});
}

module.exports = detail;