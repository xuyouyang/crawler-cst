var mongodb = require('mongodb').Db;
var settings = require('../settings');

function Post(post) {
	this.title = post.title;// 通知标题
	this.link = post.link;// 通知链接
	this.publish_time = post.publish_time;// 通知发布时间
	this.type = post.type;// 通知类型：news, edu, job
	this.top = post.top;// 通知是否为置顶
}

module.exports = Post;

// 存储通知信息
Post.prototype.save = function(callback) {
	// 要存入数据库的通知文档
	var post = {
		title        : this.title,
		link         : this.link,
		publish_time : this.publish_time,
		type         : this.type,
		top          : this.top
	};
	// 打开数据库
	mongodb.connect(settings.url, function (err, db) {
		if (err) {
			return callback(err);
		}
		// 读取post集合
		db.collection('post', function (err, collection) {
			if (err) {
				db.close();
				return callback(err);
			}
			collection.insert(post, {
				safe: true
			}, function (err, post) {
				db.close();
				if (err) {
					return callback(err);
				}
				return callback(null, post[0]);
			});
		});
	});
};

// 根据通知类型获取通知
Post.get = function(type, callback) {
	// 打开数据库
	mongodb.connect(settings.url, function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('post', function (err, collection) {
			if (err) {
				db.close();
				return callback(err);
			}
			collection.find({
				type: type	
			}).sort({
				publish_time: -1
			}).toArray(function (err, post) {
				db.close();
				if (err) {
					return callback(err);
				}
				return callback(null, post);
			});
		});
	});	
};

// 根据通知的标题和时间获取一条通知
Post.getOne = function (title, publish_time, callback) {
	mongodb.connect(settings.url, function (err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('post', function (err, collection) {
			if (err) {
				db.close();
				return callback(err);
			}
			collection.find({
				title: title,
				publish_time: publish_time
			}).toArray(function (err, post) {
				db.close();
				if (err) {
					return callback(err);
				}
				return callback(err, post[0]);
			});
		});
	});
};




















