
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = require('./task').TaskSchema;
var BurndownSchema = require('./burndown').BurndownSchema;
var Burndown = require('./burndown').Burndown;

var SprintSchema = new Schema({
	 name : {type :String, unique:true}
	,begDate : Date
	,endDate : Date
	,tasks   : [TaskSchema]
	,burndowns:[BurndownSchema]
});


SprintSchema.methods.appendTask= function(t){
	this.tasks.push(t);
}

SprintSchema.methods.getLeftpoint= function(){
	var point = 0;
	
	this.tasks.forEach(function(task,idx){
			point += task.left;
		});
	
	return point;
}

SprintSchema.methods.burnTask=function(id,point){
	var task;
  
  for(var idx in this.tasks){
		if(this.tasks[idx]._id==id){
			task = this.tasks[idx];
			break;
		}
	}
	
  console.log('my task',task)	;
  if(task){
    if(point >= task.left) point = task.left;
    
    task.burn(point);
    this.burndowns.push(new Burndown({taskid:id,point:point}));
  }

}

SprintSchema.methods.getAllBurndowns= function(){
	return this.burndowns

}

var _Sprint = mongoose.model('Sprint',SprintSchema);
_Sprint.emptySprint = {  name:''
												,begDate:''
												,endDate:''
												,tasks:[{desc:'',size:0,left:0}]}

exports.Sprint = _Sprint;
mongoose.connect('mongoodb://127.0.0.1/desk');
