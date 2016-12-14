var login = function(req, res, next) {
	console.log('load login page');
	res.render('login', { title: '登录' });
	// console.log('show body json: ', req.body);
}

module.exports = login;