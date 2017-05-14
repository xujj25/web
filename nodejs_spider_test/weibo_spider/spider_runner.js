var spider = require('./main_spider');

var keywordSet = [
  '山东疫苗案',
  '常州毒地案',
  '魏则西之死',
  '和颐酒店女子遇袭',
  '中关村二小欺凌事件',
  '泸州中学生坠亡事件'
];

for (var i = 0; i < keywordSet.length; i ++) {
  spider(keywordSet[i]);
}