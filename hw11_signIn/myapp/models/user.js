var mongoose = require('./connectDB');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	student_id: Number,
	phone_number: Number,
	email_address: String,
	password: String
});

module.exports = mongoose.model('User', UserSchema);