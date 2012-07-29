
var Sprint = require('../models/sprint').Sprint;
var Task = require('../models/task').Task;


describe('just populate some data entry to db',function(){

	before(function(done){
		Sprint.find({name:'test Sprint'},function(error,sprints){
			if(error){
				console.log(error);
				return;
			}
			console.log(sprints);
			sprints.forEach(function(s){
				s.remove(done);
			})
		})
	})
	it('should just inster data to collections',function(){
		var mySprint = new Sprint({name:'test Sprint'
		                          ,begDate: new Date(2012,3,1)
															,endDate: new Date(2012,4,1)});

	  var task1 = new Task({desc:'make the ut framework'
		                     ,size:23
												 ,left:17
												 ,status:'ongoing'});
	  var task2 = new Task({desc:'make BDD framework'
		                     ,size:23
												 ,left:17
												 ,status:'ongoing'});
		var task3 = new Task({desc:'assist CI	work'
		                     ,size:8
												 ,left:8
												 ,status:'notstart'});
		var task4 = new Task({desc:'test new link supvsion image'
		                     ,size:13
												 ,left:0
												 ,status:'done'});

    mySprint.appendTask(task1);
		mySprint.appendTask(task2);
		mySprint.appendTask(task3);
		mySprint.appendTask(task4);

		mySprint.save(function(error){
			if(error) console.log(error);
		});
	
	})
});
