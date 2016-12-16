var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// var AppModel = mongoose.model('AppModel', {
// 	id: Number,
// 	name: String,
// });


router.get('/', function(req, res, next) {
	// mongoose.connect('mongodb://localhost/day1215', function(err) {
	// 	if (err) res.send(err.message);
	// 	res.send("connect yes!");
	// });
	AppModel.find({
		id: 1
	}, function(err, docs) {
		if (err) res.send(err.message);
		res.send(JSON.stringify(docs));
	});
});

module.exports = router;