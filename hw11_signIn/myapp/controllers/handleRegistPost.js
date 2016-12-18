var User = require('../models/user');
var mongoose = require('mongoose');
var hashTool = require('../my_tools/hash');

var handleRegistPost = function(req, res, next) {
	console.log('in handle regist post');
	// console.log(req.body.username);

	// async query, use callback to query several parameters
	var findName = function() {
		User.findOne({username: req.body.username}, function(err, doc) {
			console.log('finding username ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', doc);
			if (doc == null) {
				findId();
			} else {
				res.send('username');
			}
		});
	}

	var findId = function() {
		User.findOne({student_id: req.body.student_id}, function(err, doc) {
			console.log('finding student_id ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', doc);
			if (doc == null) {
				findPhone();
			} else {
				res.send('student_id');
			}
		});
	}

	var findPhone = function() {
		User.findOne({phone_number: req.body.phone_number}, function(err, doc) {
			console.log('finding phone_number ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', doc);
			if (doc == null) {
				findEmail();
			} else {
				res.send('phone_number');
			}
		});
	}

	var findEmail = function() {
		User.findOne({email_address: req.body.email_address}, function(err, doc) {
			console.log('finding email_address ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', doc);
			if (doc == null) {
				insert();
			} else {
				res.send('email_address');
			}
		});
	}

	var insert = function() {
		var pwdHash = hashTool(req.body.password);
		var newUser = new User({
			username: req.body.username,
			student_id: req.body.student_id,
			phone_number: req.body.phone_number,
			email_address: req.body.email_address,
			password: pwdHash,
		});
		// console.log('new User: ', newUser);
		newUser.save(function(err, product, num) {
			if (err) {
				console.log('insert err: ', err);
				res.send('err');
			}
			res.cookie('user',
				{
					username: newUser.username
				},
				{
					maxAge: 600000,
					httpOnly: true,
				});
			res.send('yes');
		})
	}

	findName();
}

module.exports = handleRegistPost;