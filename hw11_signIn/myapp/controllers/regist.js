var regist = function(req, res, next) {
	console.log('load regist page');
	res.render('regist', { title: '注册' });
	// console.log('show body json: ', req.body);
}

module.exports = regist;