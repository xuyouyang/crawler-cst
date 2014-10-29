
/*
 * GET home page.
 */
var Student = require('../models/student.js');
var Post = require('../models/post.js');

module.exports = function(app){
	
	// 获取学生信息请求,可按专业、年级分类
	app.get('/allStudent', function (req, res) {
		Student.getAll(req.query.major, req.query.grade, function (err, students) {
			if (err) {
				res.send({
					err : 1,
					errMsg : err
					});
				}
			res.send({
				success : 1,
				students : students
			});
		});		
	});
	
	// 搜索学生信息请求(通过名字)
	app.get('searchStudent', function (req, res) {
		Student.searchOne(req.query.name, function (err, student) {
			if (err) {
				res.send({
					err : 1,
					errMsg : err
				});
			}
			res.send({
				success : 1,
				student : student
			});
		})
	});
	
	// 根据通知类型获取通知列表
	app.get('/post', function (req, res) {
		var type = req.query.type;
		Post.get(type, function (err, posts) {
			if (err) {
				res.send({
					err : 1,
					errMsg : err
				});
			}
			res.send({
				success : 1,
				posts : posts
			});
		});
	});
	
	app.get('searchPost', function (req, res) {
		
	});

	app.get('/index', function (req, res) {
		res.send({
			key: 'value'
		});
	});
};