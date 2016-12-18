var detailRedirect = function(req, res, next) {
	console.log('in detailRedirect');
	res.cookie('user',
		{
			username: req.cookies.user.username,
			illegal_query: true
		},
		{
			maxAge: 600000,
			httpOnly: true,
		});
	res.redirect('?username=' + req.cookies.user.username);
}

module.exports = detailRedirect;