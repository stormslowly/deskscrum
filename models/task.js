
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = require('./user').UserSchema

var TaskSchema = new Schema({
	 desc  : { type : String , require: true}
	,owner : { type : Schema.ObjectId, ref : 'UserSchema'}
	,size  : { type : Number ,require: true}
	,left  : { type : Number ,require : true} 
	,status: { type : String , enum: ['notstart','ongoing','done'] , default: 'notstart'}
});

TaskSchema.methods.burn = function(point){
	
	if(this.status === 'notstart')
		this.status = 'ongoing';
	
	if( point >= this.left){
		this.left = 0;
		this.status= 'done';
	}else{
		this.left = this.left - point;
	}
};

TaskSchema.methods.setStatus = function(newStatus,cb){
	this.status = newStatus;
	if(this.stutus==='done')
		this.left = 0;
};

var _Task = mongoose.model('Task',TaskSchema);

exports.Task = _Task;
exports.TaskSchema = TaskSchema;



