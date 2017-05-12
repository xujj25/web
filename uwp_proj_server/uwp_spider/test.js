var cheerio = require('cheerio');
var fs = require('fs');
var Request = require('request');
var site = 'http://m.people.cn/52/index.html';
/*
人民网新闻中心 http://m.people.cn/52/index.html 直接使用jq提取

凤凰新闻 http://inews.ifeng.com/ 
url = '/' + dataSourceId + '_' + pageIndex + '/data.shtml';
pageIndex = 0, 1, 2, 3....
dataSourceId = 32

手机环球网 http://m.huanqiu.com/
url = `http://uluai.com.cn/rcmd/falls/getRtCmd?siteId=5011&cki=${userID}&num=20&chan=`
userID = getId: (len = 36) => {
    let str = ''
    const base = '0123456789abcdef'
    for (let i = 0; i < len; i++) {
      str += base[~~(Math.random() * 16)]
    }
    return str
  }
*/

Request.get({uri:site,headers: {
    'User-Agent': 'spider'
}},function(err,response,body){
    if(err){
        console.log("访问" + site +  "失败")
        console.log(err);
    }
    else{
        console.log("访问" + site +  "完成")
        // var match = body.match(/\d+\.\d+\.\d+\.\d+/g);
        
        // var jsonArr = JSON.parse(body);
        // console.log(typeof jsonArr);
        // console.log(jsonArr.length);
        // var i;
        // for (i = 0; i < jsonArr.length; i++)
        // {
        //   console.log(jsonArr[i].date);
        // }
        // console.log(jsonArr);

        fs.writeFile('html_test.html', body, function(err) {
          if (err)
            throw err;
          console.log('html download finished');
        });

        // console.log(body);
        // handleDB(body);
}});

function handleDB(html){
  var $ = cheerio.load(html); //引入cheerio的方法。这样的引入方法可以很好的结合jQuery的用法。
  // var info = $('#info');
  // // 获取电影名
  // var movieName = $('#content>h1>span').filter(function(i,el){
  //   return $(this).attr('property') === 'v:itemreviewed';
  // }).text();
  // // 获取影片导演名
  // var directories = '- 导演：' + $('#info span a').filter(function(i,el){
  //   return $(this).attr('rel') === 'v:directedBy';
  // }).text();
  // // 获取影片演员
  // var starsName = '- 主演：';
  // $('.actor .attrs a').each(function(i,elem){
  //     starsName += $(this).text() + '/';
  // });
  // // 获取片长
  // var runTime = '- 片长：' + $('#info span').filter(function(i,el){
  //   return $(this).attr('property') === 'v:runtime';
  // }).text();
  // // 获取影片类型
  // var kind = $('#info span').filter(function(i,el){
  //   return $(this).attr('property') === 'v:genre'
  // }).text();
  //   // 处理影片类型数据
  // var kLength = kind.length;
  // var kinds = '- 影  片类型：';
  // for (i = 0; i < kLength; i += 2){
  //   kinds += kind.slice(i,i+2) + '/';
  // }
  // // 获取电影评分和电影评分人数
  //   // 豆瓣
  // var DBScore = $('.ll.rating_num').text();
  // var DBVotes = $('a.rating_people>span').text().replace(/\B(?=(\d{3})+$)/g,',');
  // var DB = '- 豆  瓣评分：' + DBScore + '/10' + '(' + 'from' + DBVotes + 'users' + ')';
  //   // IMDBLink
  // IMDBLink = $('#info').children().last().prev().attr('href');

  // var data = movieName + '\r\n' + directories + '\r\n' + starsName + '\r\n' + runTime + '\r\n' + kinds + '\r\n'+ DB +'\r\n';
  // // 输出文件
  // // fs.writeFile('dbmovie.txt', data, 'utf-8', function(err){
  // //   if (err) throw err;
  // //   else console.log('大体信息写入成功'+'\r\n' + data)
  // // });

  // $('#Pl_Official_MyProfileFeed__27 div div div div div .S_txt2').each(function(index, el) {
  //   if ($(el).attr('action-type')) {
  //     console.log($(el).text());
  //   }
  // });
}