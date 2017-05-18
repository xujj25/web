const data_output = require('./data_output_to_csv');

var keywordSet = [
  // '哈尔滨天价鱼',
  // '山东疫苗案',
  // '常州毒地案',
  // '魏则西之死',
  // '和颐酒店女子遇袭',
  // '中关村二小欺凌事件',
  // '泸州中学生坠亡事件',
  // '丽江游客餐厅被殴打'
    '长春婴儿被盗'
];

for (var i = 0; i < keywordSet.length; i ++) {
  data_output(keywordSet[i]);
}