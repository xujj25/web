var detail = function(req, res, next) {
	// res.render('detail', { title: '详情' });
	// console.log('hhhhhh');
	console.log('show body json: ', req.body);
	console.log('handle post');
	res.send('receive');
}

module.exports = detail;