/*
	爬虫模块
*/
var http = require("http");
var cheerio = require("cheerio");
var Post = require('../models/post.js');

exports.run = function () {
	console.log('crawler run');	
	getJob();
	get
};

// 招聘信息模块
var getJob = function () {
	console.log()
	var url = "http://www.cst.zju.edu.cn/index.php?c=Index&a=tlist&catid=6&p=1";
	download (url, function (data) {
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
		    
		    for (var i = 0; i < 12; i++) {
		    	(function (i) {
				    //console.log(links[i]);
				    //console.log(titles[i]);
				    //console.log(publish_times[i]);
				    Post.getOne(titles[i], publish_times[i], function (err, post) {
					    if (err) {
						    console.log(err);
					    } else {
					    	console.log('已存在');
					    	// 如果这条记录不存在，则添加
					    	console.log(post);
						    if (post == null) {
							    var newPost = new Post({
								    title : titles[i].toString(),
								    link : links[i].toString(),
									publish_time : publish_times[i].toString(),
									type : "job",
									top : 0
							    });
							    newPost.save( function(err, post) {
								    if (err) {
									    console.log(err);
								    } else {
								    	console.log('添加一条新通知');
									    console.log(post);
								    }
							    });
						    }
					    }
				    });
				 })(i);
		    }
		}
	});
};

// 教务信息模块
var getEdu = function () {
	//var url = 
};

// 新闻模块
var getNews = function () {
	//var url = 
};

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