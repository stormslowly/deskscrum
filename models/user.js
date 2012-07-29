
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	 name : String
	,password:String
});

var User = mongoose.model('User',UserSchema);
exports.UserSchema = UserSchema;
exports.User = User;//Model('User',UserSchema);



