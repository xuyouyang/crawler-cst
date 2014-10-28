var Student = require('../models/student.js');
var xlsx = require('node-xlsx');

exports.run = function () {
	//ReadExcel(2014);
	//text();
};

function ReadExcel(grade) {  
	var obj = xlsx.parse(__dirname + '/2014.xlsx');
	console.log(obj[0].data.length);
	var i = 0;
	obj[0].data.forEach(function (e) {
		// 过滤掉第一个行
		var newStudent = new Student({
			student_id : e[0].trim(),
			name : e[1].trim(),
			sex : e[2],
			major : e[3].trim(),
			grade : grade
		});
		newStudent.save(function (err, student) {
			if (!err) {
				i++;
				console.log('成功添加' + i);
				console.log(student);
			}
		});
	});
}

function text() {
	var obj = xlsx.parse(__dirname + '/2014.xlsx');
	obj[0].data.forEach(function (e) {
		// 过滤掉第一个行
		Student.searchOne(e[1], function (err, student) {
			if (!err) {
				if (!student) {
					console.log(e[1]);
				}
			}
		})
	});
}