
/*
 * GET home page.
 */
var Student = require('../models/student.js');
var Post = require('../models/post.js');

exports.index = function(req, res){	
/*
	var newStudent = new Student ({
		student_id : 21450173,
		name: 'xu1',
		sex: 'm',
		major: '移动',
		grade: 2014	
	});
	newStudent.save(function (err, student) {
		if (err) {
			console.log(err);
		} else {
			console.log(student);	
		}
	});
*/

/*
	Student.getAll(function (err, student) {
	});
*/
/*
	var newPost1 = new Post ({
		title : '新闻1',
		link : 'link1',
		publish_time : '2014-12-12',
		type : 'news',
		top : 0  
	});
	var newPost2 = new Post ({
		title : '教务1',
		link : 'link2',
		publish_time : '2014-12-12',
		type : 'edu',
		top : 0  
	});
	var newPost3 = new Post ({
		title : '招聘1',
		link : 'link3',
		publish_time : '2014-12-12',
		type : 'job',
		top : 0  
	});
	newPost1.save(function (err, post) {
		if (err) {
			console.log(err);
		} else {
			console.log(post);	
		}
	});
	newPost2.save(function (err, post) {
		if (err) {
			console.log(err);
		} else {
			console.log(post);	
		}
	});
	newPost3.save(function (err, post) {
		if (err) {
			console.log(err);
		} else {
			console.log(post);	
		}
	});
*/
	Post.get('edu', function(err, post) {
		console.log(post);
	})
	res.render('index', { title: 'Express' });
};