var app = require('../app');
var sinon = require('sinon');

var _sprint = require('../models/sprint').Sprint;

describe('deskscrum',function(){
	
	var orgFind;
	beforeEach(function(done){
		orgFind = _sprint.find;
		_sprint.find = function(cb){
				cb(null,[	
									 { name:'sprint1'
									  ,begDate: new Date(2012,1,2)
									  ,endDate: new Date(2012,2,1)}
									,{ name: 'sprint2'
									  ,begDate: new Date(2012,3,1)
										,endDate: new Date(2012,3,31)
										}]);

			};
		app.listen(8000,done);
	});

	afterEach(function(){
		_sprint.find = orgFind;
	});
	
	describe('GET /',function(){
		it('should redirect to /sprints',function(done){
			app.request()
				.get('/')
				.end(function(res){
					res.should.have.status(302);
					res.headers.location.should.match(/\/sprints$/);
					done();
				});
		});
	});

	describe('Get /sprints',function(done){
		it('should return all the sprints in DB',function(done){
			app.request()
				.get('/sprints')
				.end(function(res){
					res.should.status(200);
					var body = res.body.toString();
					body.should.include('sprint1');
					body.should.include('sprint2');
					done();
				});
		});
	});

	describe('GET /new ',function(done){
		it('should give out empty input boxes for sprint',function(done){
			app.request()
				.get('/new')
				.end(function(res){
				res.should.status(200);
				done();
			});
		})
	});


});
