
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' })
};

/*
exports.sprintsList = 
	require('../controller/sprintslist').showSprintsList;
exports.sprint = 
	require('../controller/sprint').showSprint;
*/
