var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var AppModel = mongoose.model('AppModel', {
	id: Number,
	name: String,
});



router.get('/', function(req, res, next) {
	var apphh = new AppModel({
		id: 1,
		name: 'admin',
	});
	// mongoose.connect('mongodb://localhost/runoob');
	apphh.save(function(err, product, numberAffected) {
		if (err) res.send(err.message);
		var htmlMessage = '<p>new data: ' + JSON.stringify(product) + '</p>';
		htmlMessage += ('<p>number affect: ' + numberAffected + '</p>');
		res.send(htmlMessage);
	})
});

module.exports = router;