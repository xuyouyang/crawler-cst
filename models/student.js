var mongodb = require('mongodb').Db;
var settings = require('../settings');

function Student(student) {
	this.student_id = student.student_id;// 学号
	this.name = student.name;// 姓名
	this.sex = student.sex;// 性别
	this.major = student.major;// 专业方向
	this.grade = student.grade;// 第几级的学生
}

module.exports = Student;

// 存储学生信息
Student.prototype.save = function (callback) {
	// 要存入数据库的学生文档
	var student = {
		student_id : this.student_id,
		name       : this.name,
		sex        : this.sex,
		major      : this.major,
		grade      : this.grade
	};
	// 打开数据库
	mongodb.connect(settings.url, function (err, db) {
		if (err) {
			return callback(err);//错误，返回err信息
		}
		// 读取student集合
		db.collection('student', function (err, collection) {
			if (err) {
				db.close();
				return callback(err);//错误，返回err信息
			}
			// 将student数据插入集合
			collection.insert(student, {
				safe: true
			}, function (err, student) {
				db.close();
				if (err) {
					return callback(err);
				}
				return callback(null, student[0]);//成功！err 为 null，并返回存储后的用户文档
			});
		});
	});
};


// 获取全部学生信息,按学号升序排序
Student.getAll = function (callback) {
	// 打开数据库
	mongodb.connect(settings.url, function (err, db) {
		if (err) {
			//console.log('err1' + err);
			return callback(err);
		}
		db.collection('student', function (err, collection) {
			if (err) {
				db.close();
				//console.log('err2' + err);
				return callback(err);
			}
			collection.find({}).sort({
				student_id: 1
			}).toArray(function (err, student) {
				db.close();
				if (err) {
					//console.log('err3' + err);
					return callback(err);
				}
				//console.log(student);
				return callback(null, student);
			});
		});
	});
};

// 根据姓名获取某个学生信息
Student.getOne = function (name, callback) {
	// 打开数据库
	
};