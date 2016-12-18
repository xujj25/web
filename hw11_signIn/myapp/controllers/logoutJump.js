var logoutJump = function(req, res, next) {
	res.clearCookie('user');
	res.redirect('/');
}

module.exports = logoutJump;