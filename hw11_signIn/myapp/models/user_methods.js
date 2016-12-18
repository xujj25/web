var User = require('./user');

exports.findUser = function(infoObj, callback) {
	User.findOne(infoObj, callback);
};

exports.insertUser = function(userObj, callback) {
	var newUser = new User(userObj);
	newUser.save(callback);
};