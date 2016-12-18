var userMethods = require('../models/user_methods');
var findUserInDb = userMethods.findUser;
var insertIntoDb = userMethods.insertUser;
var hashTool = require('../my_tools/hash');

var handleRegistPost = function(req, res, next) {
	console.log('in handle regist post');
	// console.log(req.body.username);

	// async query, use callback to query several parameters
	var findName = function() {
		findUserInDb({username: req.body.username}, function(err, doc) {
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
		findUserInDb({student_id: req.body.student_id}, function(err, doc) {
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
		findUserInDb({phone_number: req.body.phone_number}, function(err, doc) {
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
		findUserInDb({email_address: req.body.email_address}, function(err, doc) {
			console.log('finding email_address ...');
			if (err) {
				console.log(err.message);
				res.send('err');
			}
			console.log('show data', doc);
			if (doc == null) {
				insertOne();
			} else {
				res.send('email_address');
			}
		});
	}

	var insertOne = function() {
		var pwdHash = hashTool(req.body.password);
		var newUser = {
			username: req.body.username,
			student_id: req.body.student_id,
			phone_number: req.body.phone_number,
			email_address: req.body.email_address,
			password: pwdHash,
		};
		insertIntoDb(newUser, function(err, product, num) {
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