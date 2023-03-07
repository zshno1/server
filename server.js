var express = require("express");
var app = express();
 
// var { createProxyMiddleware } = require("http-proxy-middleware");


app.use("/", express.static(__dirname + "/dist"));
app.get("/", function (_, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

// app.use(
//   "/karp", // 接口地址
//   createProxyMiddleware({
//      target: "", // 代理的域名
//      changeOrigin: true,
//      secure: false,
//     onProxyReq: function (proxyReq, req, res, options) {
//       console.log(req.body);
//       if (req.body) {
//         // let bodyData = JSON.stringify(req.body);
//         // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
//         // proxyReq.setHeader("Content-Type", "application/json");
//         // proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
//         // stream the content
//         // proxyReq.write(bodyData);
//       }
//     },
//   })
// );

var server = app.listen(8088, function () {
  var port = server.address().port;
  console.log('http://localhost:' + port);
});




