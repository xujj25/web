var server = require('./web_server');
var router = require('./router');
var requestHandler = require('./requestHandler');

var handler = {};
	// 注册页、详情页静态文件请求项
	handler['/'] = requestHandler.loadData;
	handler['/javascript/jquery.js'] = requestHandler.loadData;
	handler['/javascript/lodash.js'] = requestHandler.loadData;
	handler['/javascript/register.js'] = requestHandler.loadData;
	handler['/favicon.ico'] = requestHandler.loadData;
	handler['/css/style.css'] = requestHandler.loadData;
	handler['/css/img/bk2.jpg'] = requestHandler.loadData;

	// 表达提交处理请求项
	handler['/handlePost'] = requestHandler.handlePost;


server.startServer(router.route, handler);