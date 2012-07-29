
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var controllers = require('./controller');

var app = module.exports = express.createServer();

var Sprint = require('./models/sprint').Sprint;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler(
		{ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req,res){
	res.redirect('/sprints');
});

app.get('/sprint/:id',function(req,res){
	var sprintID = req.params.id;
	Sprint.findOne({_id:sprintID},function(err,sprint){
		if(err){
			res.redirect('/error');
		}else{
			if(sprint)
				res.render('sprint',{ title:'Sprint: '+ sprint.name
			                       ,sprint:sprint});
		  else
				res.redirect('/error');
		}
	});
});

app.get('/new',function(req,res){
	res.render('newsprint',{ title:'New Sprint'
													,sprint:Sprint.emptysprint});
});

app.post('/new',function(req,res){
	console.log(req.body);
	res.end('good')
});
app.get('/sprints',function(req,res){
	Sprint.find(function(error,sprints){
			if(error){
				res.redirect('/error');
			}else{
				res.render('sprints',{sprints:sprints
															,title:'sprints List'
				})
			}	
		});
});

app.post('/burn',function(req,res){
  console.log(req.body);
  var sprintID = req.body.sprintid;
  var taskID = req.body.taskid;
  var points = req.body.points;
  Sprint.findOne({_id:sprintID},function(error,sprint){
    sprint.burnTask(taskID,new Number(points));
    sprint.save(function(error){
      if(error){
        console.log(error);
        res.redirect('/error');
      }else{
        res.redirect('/sprint/'+sprintID);
      }
    })
  }) 
});
/*
app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", 
	app.address().port, app.settings.env);
});
*/
module.exports = app;
