
var should = require('should');
var Sprint = require('../models/sprint.js').Sprint;
var Task = require('../models/task.js').Task;

describe('sprint',function(){
	
	var sprint;
	
	beforeEach(function(){
		sprint = new Sprint({ name : "zealotsprint1206"
		                     ,begDate :new Date(2012,7,1)
		                     ,endDate :new Date(2012,8,1)});
	
	});
	
	afterEach(function(){
		delete sprint;
	});

	describe('New Sprint obj',function(){
		it('should new sprint with start date and end date',function(){

			sprint.should.not.be.null;
			sprint.name.should.be.equal('zealotsprint1206')	;
		});
	
	});
	describe('getLeftpoint',function(){
		it('should return sum of all the tasks size',function(){
			var task1 = new Task({ desc:'task1'
														,size: 13
														,left: 13})
	       ,task2 = new Task({desc:'task2'
														,size : 8
														,left : 8});
			sprint.appendTask(task1);
			sprint.appendTask(task2);
			sprint.getLeftpoint().should.equal(21);
		});
	});

	describe('getAllTasks',function(){
		it('should return all the tasks in sprint',function(){
			var task1 = new Task({ desc:'task1'
														,size: 13
														,left: 13})
	       ,task2 = new Task({desc:'task2'
														,size : 8
														,left : 8});
			
			sprint.appendTask(task1);
			sprint.appendTask(task2);

			sprint.tasks.should.have.length(2);
			sprint.tasks.should.includeEql(task1);
			sprint.tasks.should.includeEql(task2);
		});
	});

	describe('burn task',function(){
		it('should burn the point of task and add related burndown point',
			function(){
			
			var task1 = new Task({ desc:'task1'
														,size: 13
														,left: 13
														})
	       ,task2 = new Task({desc:'task2'
														,size : 8
														,left : 8
														});
			sprint.appendTask(task1);
			sprint.appendTask(task2);

			sprint.burnTask(task1._id,5);
			sprint.burnTask(task2._id,5);
			task1.left.should.equal(13-5);
			sprint.burndowns.should.not.be.empty;
			sprint.burndowns.should.have.length(2);
			sprint.burndowns[0].should.have.property('taskid',task1._id)
			sprint.burndowns[1].should.have.property('taskid',task2._id)
		});
	});

});
