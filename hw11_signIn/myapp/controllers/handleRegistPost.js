var User = require('../models/user');
var mongoose = require('mongoose');

var handleRegistPost = function(req, res, next) {
	console.log('in handle regist post');
	// console.log(req.body.username);

	// async query, use callback to query several parameters
	var findName = function() {
		User.findOne({username: req.body.username}, function(err, docs) {
			console.log('finding username ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', docs);
			if (docs == null) {
				findId();
			} else {
				res.send('username');
			}
		});
	}

	var findId = function() {
		User.findOne({student_id: req.body.student_id}, function(err, docs) {
			console.log('finding student_id ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', docs);
			if (docs == null) {
				findPhone();
			} else {
				res.send('student_id');
			}
		});
	}

	var findPhone = function() {
		User.findOne({phone_number: req.body.phone_number}, function(err, docs) {
			console.log('finding phone_number ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', docs);
			if (docs == null) {
				findEmail();
			} else {
				res.send('phone_number');
			}
		});
	}

	var findEmail = function() {
		User.findOne({email_address: req.body.email_address}, function(err, docs) {
			console.log('finding email_address ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', docs);
			if (docs == null) {
				insert();
			} else {
				res.send('email_address');
			}
		});
	}

	var insert = function() {
		var newUser = new User({
			username: req.body.username,
			student_id: req.body.student_id,
			phone_number: req.body.phone_number,
			email_address: req.body.email_address,
			password: req.body.password,
		});
		// console.log('new User: ', newUser);
		newUser.save(function(err, product, num) {
			if (err) {
				console.log('insert err: ', err);
				res.send('err');
			}
			res.send('yes');
		})
	}

	findName();
}

module.exports = handleRegistPost;