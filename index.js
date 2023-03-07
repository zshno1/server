
var express = require('express');
var app = express();
var user = require('./data/user.js')
console.log(user)

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//写个接口123
app.get('/user/item', function(req, res) {
    console.log(user)
    let id = req.query.id
    console.log(id)
    let data = user.filter(item => {
          return item.id == id
        })
    // let data = user;
    console.log(data)
    res.status(200),
    res.json(data)
});

//配置服务端口
var server = app.listen(3000, function() {

    var host = server.address().address;

    var port = server.address().port;

    console.log('服务器启动：http://localhost', host, port);
})