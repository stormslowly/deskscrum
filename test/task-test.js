var should = require('should');
var sinon  = require('sinon');
const Task = require('../models/task').Task;

describe('task',function(){

	var task;
  var stub_save;	
	beforeEach(function(){
		task = new Task({desc: 'sprint2012',size: 10,left:9});
		stub_save = sinon.spy(task,'save');
	});

	afterEach(function(){
		task.save.restore();
		task = null;
	});

	describe("new obj",function(){
		it('should return a valid object',function(){
			
			task.should.not.be.null;
			task.size.should.be.equal(10);
			task.left.should.be.equal(9);
			task.status.should.be.equal('notstart');
		});
	});

	describe("burn method",function(){
		it('should minus the left by point',function(){
			task.burn(2);
			task.left.should.be.equal(7);
			task.status.should.be.equal('ongoing');

		});

		it('should change task status to done when no left point',function(){
			task.burn(10);
			task.left.should.be.equal(0);
			task.status.should.be.equal("done");
		});

	});

});
