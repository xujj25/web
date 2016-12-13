var fs = require('fs');
var qs = require('querystring');

var contentTypes = {
	".ico": "image/x-icon",
	".jpg": "image/jpg",
	".css": "text/css",
	".js": "text/javascript",
	".html": "text/html"
};

var infoItemsChinese = {
	"username": "用户名",
	"student_id": "学号",
	"phone_number": "电话",
	"email_address": "邮箱"
}

var tempUserMemory = [];

function usernameQuery(_username) {
	console.log('查找用户' + _username + '是否存在')
	var result = null;
	for (var idx = 0; idx < tempUserMemory.length; idx ++) {
		if (tempUserMemory[idx]['username'] == _username) {
			result = tempUserMemory[idx];
			break;
		}
	}
	return result;
}

function load(pathname, response, info) {
	console.log('加载页面。。。');
	var ext = pathname.match(/(\.[^.]+|)$/)[0];  // 取得后缀名
	if (ext.length == 0) ext = '.html';
	if (pathname.length == 1) pathname = '/register.html';
	var dataTypeOption = ((ext == '.jpg' || ext == '.ico') ? "binary" : "utf-8");
	// 从存储中读取页面请求文件
	fs.readFile('./front_end/' + pathname, dataTypeOption, function(err, data){
		if (err) throw err;
		response.writeHead(200, {"Content-Type": contentTypes[ext]});
		if (ext == '.html') {
			if (typeof info === 'string' && info == "") {
				response.write(data, dataTypeOption);
				response.end();
			} else {
				// 在载入浏览器之前对页面数据进行修改
				response.write(correctData(data, info), dataTypeOption);
				response.end();
			}
		} else {
			response.write(data, dataTypeOption);
			response.end();
		}
	});
}

function testUserInfoExist(user) {
	console.log('验证信息项是否已经存在');
	if (tempUserMemory.length == 0) {
		return "";
	}
	var idx;
	var result = ""
	for (idx = 0; idx < tempUserMemory.length; idx ++) {
		if (user['username'] == tempUserMemory[idx]['username']) {
			result = 'username';
			break;
		}
		if (user['student_id'] == tempUserMemory[idx]['student_id']) {
			result = 'student_id';
			break;
		}
		if (user['phone_number'] == tempUserMemory[idx]['phone_number']) {
			result = 'phone_number';
			break;
		}
		if (user['email_address'] == tempUserMemory[idx]['email_address']) {
			result = 'email_address';
			break;
		}
	}
	return result;
}

function correctData(initData, info) {
	console.log('对静态文件中读取到的数据在写入浏览器前进行修改');
	var newData;
	if (typeof info === 'string') {
		newData = initData.replace(/<div id=\"repeat_notice\"><\/div>/,
				"<div id=\"repeat_notice\">"+ infoItemsChinese[info] +"重复！<\/div>");
	} else {
		newData = initData.replace("_username", info['username']);
		newData = newData.replace("_student_id", info['student_id']);
		newData = newData.replace("_phone_number", info['phone_number']);
		newData = newData.replace("_email_address", info['email_address']);
	}
	return newData;
}

function loadDedail(response, userGet) {
	console.log('开始加载详情页。。。');
	load('/detail.html', response, userGet);
}

function showUsers() {
	console.log('当前已经注册的用户: ');
	for (var idx = 0; idx < tempUserMemory.length; idx ++ ) {
		console.log(tempUserMemory[idx]['username']);
	}
}

function loadData(pathname, response, postData, query) {  // 分析加载请求，选择返回页面
	console.log(pathname + ' 路径下选择加载页面。。。');
	if (query == null) {
		console.log('无query请求下加载指定页面');
		load(pathname, response, "");
	} else {
		console.log('接收到query请求');
		var _username = query.match(/=.*/)[0].substr(1);
		console.log('欲查找用户名: ' + _username);
		var userGet = usernameQuery(_username);
		if (userGet != null) {
			console.log('查得用户，加载详情页');
			loadDedail(response, userGet);
		} else {
			console.log('用户名为' + _username + '的用户不存在，查询拒绝，返回注册页');
			response.writeHead(301, {'Location': '/'});
			response.end();
		}
	}
}

function handlePost(pathname, response, postData, query) {  // 处理post请求
	console.log('get post data ' + postData);
	if (!postData) {
		console.log('拒绝在没有提交数据的情况下对handlePost页面的访问，跳转至注册页');
		// response.writeHead(301, {'Location': '/'});
		response.end('no');
		return;
	}
	var user = qs.parse(postData);
	var repeatInfoItem = testUserInfoExist(user);
	if (repeatInfoItem != "") {
		console.log(infoItemsChinese[repeatInfoItem] + '信息重复！跳转至注册页并提示结果');
		load('/', response, repeatInfoItem);
	} else {
		tempUserMemory.push(user);
		console.log('注册成功！跳转至详情页');
		showUsers();
		// response.writeHead(301, {'Location': '/?username=' + user['username']});
		response.end('yes');
	}
}

exports.loadData = loadData;
exports.handlePost = handlePost;