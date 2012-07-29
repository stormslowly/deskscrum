
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BurndownSchema = new Schema({
	 Date : {type:Date,default:new Date()}
	,taskid :{type:Schema.ObjectId}
	,point: {type:Number}
});

var _Burndown = mongoose.model('Burndown',BurndownSchema);

exports.BurndownSchema = BurndownSchema;
exports.Burndown = _Burndown;
