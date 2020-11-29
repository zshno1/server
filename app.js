const http = require("http");
const fs = require("fs");

http.createServer(function(req, res) {
    res.end('holle node.js')
    fs.mkdir("./uploader", function(err){
        if(err !== null){
            console.log("创建成功")
        }
    })
}).listen(3000,function(){
    console.log("服务启动了， http://localhost:3000")
})
