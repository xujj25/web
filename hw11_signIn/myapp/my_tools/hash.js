var crypto = require('crypto');

var hashTool = function(str) {
	var mdFive = crypto.createHash('md5');
	mdFive.update(str);
	str = mdFive.digest('hex');
	return str;
}

module.exports = hashTool;