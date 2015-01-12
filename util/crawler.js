/*
	爬虫模块
*/
var http = require("http");
var cheerio = require("cheerio");
var Post = require('../models/post.js');

exports.run = function () {
	console.log('crawler run');	
	crawler('job');
	crawler('news');
	crawler('edu');
	crawler('enroll');
	
//	console.log('crawlerUrl run');
//	crawlerUrl('http://www.cst.zju.edu.cn/index.php?c=Index&a=detail&catid=72&id=2429');
};

var crawler = function (type) {
	// 拼接url字符串
	var url = 'http://www.cst.zju.edu.cn/index.php?c=Index&a=tlist&catid=';
	switch (type) {
		case 'job': 
			url += 6;
			break;
		case 'edu':
			url += 23;
			break;
		case 'news':
			url += 72;
			break;
		case 'enroll':
			url += 16;
			break;
	}	
	url += '&p=1';
	// 请求网络，获取数据
	download (url , function (data) {
		// 如果连接成功
		if (data) {
			//console.log(data);
			var $ = cheerio.load(data);
			// 招聘信息的网址
			var links = [];
			$('div > .lm_new > ul > li').each(function (i, e) {
			    //console.log("http://www.cst.zju.edu.cn/" + $(e).find("span.lm_new_zk > a").attr("href"));
			    links[i] = "http://www.cst.zju.edu.cn/" + $(e).find("span.lm_new_zk > a").attr("href");
		    });	
		    // 招聘信息的标题
		    var titles = [];
		    $('div > .lm_new > ul > li').each(function (i, e) {
			    //console.log($(e).find("span.lm_new_zk > a > font").text());
			    titles[i] = $(e).find("span.lm_new_zk > a").text().trim();
		    });	    
		    // 招聘信息发布的时间
		    var publish_times = [];
		    $('div > .lm_new > ul > li').each(function (i, e) {
			    //console.log($(e).find("span.fr").html());
			    publish_times[i] = $(e).find("span.fr").html();
		    });
		    var posts = [];
		    for (var i = 0; i < 12; i++) {
			    var newPost = new Post({
			    	title : titles[i].toString(),
				    link : links[i].toString(),
				    publish_time : publish_times[i].toString(),
				    type : type,
				    top : 0
			    });
			    posts[i] = newPost;
		    }
		    // 添加记录
		    posts.forEach(function (newPost) {
		    	//console.log(post);
			    Post.getOne(newPost.title, newPost.publish_time, function (err, post) {
				    if (!err && !post) {
					    //console.log(post);
					    newPost.save(function (err, post) {
						    if (!err) {
							    console.log('添加新记录');
							    console.log(post);
						    }
					    });
				    }
			    });
		    }); 
		}
	});
};

// 通过URL爬取具体页面的内容
var crawlerUrl = function (url) {
	download (url , function (data) {
		// 如果连接成功
		if (data) { 
			var $ = cheerio.load(data);
			console.log($('div .detailed_wk').html());
		}
	});
};

// 加载网页
function download (url, callback) {
	http.get(url, function (res) {
		var data = "";
		res.on('data', function (chunk) {
			data += chunk;
		});
		res.on("end", function() {
			callback(data);
		});
	}).on("error", function() {
		callback(null);
	});
}
