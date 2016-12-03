function route(handler, pathname, response, postData, query) {
	console.log("Route a request for " + pathname);
	// 判断请求的内容是否存在
	if (typeof handler[pathname] === 'function') {
		handler[pathname](pathname, response, postData, query);
	} else {
		console.log("No request handler found for " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.write("404 Not found");
		response.end();
	}
}

exports.route = route;