var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	student_id: Number,
	phone_number: Number,
	email_address: String,
	password: String
});

exports.User = mongoose.model('User', UserSchema);