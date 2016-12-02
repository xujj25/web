var http = require('http');
var url = require('url');


function startServer(route, handler) {
	function onRequest(request, response) {
		// 解析url,pathname,query
		console.log("Request for url: " + request.url + " received.");
		var pathname = url.parse(request.url).pathname;
		console.log("Request for pathname: " + pathname + " received.");
		var query = url.parse(request.url).query;
		console.log("用户查询请求: " + query + " 接收.");

		// 获取post数据
		var postData = "";

		request.setEncoding('utf-8');
		request.addListener('data', function(chunk) {
			postData += chunk;
		});
		
		request.addListener('end', function() {
			if (postData != "") console.log('request.method '+ request.method);
			// 将数据还有请求传给路由
			route(handler, pathname, response, postData, query);
			console.log('handle post data over');
		});
	}

	http.createServer(onRequest).listen(8000);
	console.log('Server running at port 8000.');
}

exports.startServer = startServer;