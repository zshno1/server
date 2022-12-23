> 你是不是一直存在个困惑？vue项目build出来的dist文件夹下index.html直接点开始控制台一顿报错。今天咱就给他治服。
<img src="https://img2023.cnblogs.com/blog/1126296/202212/1126296-20221222171239413-858182100.png" style="zoom:50%;" />

解决方案就是本地启动一个node服务。详细步骤如下：
- 创建项目
   ```shell
    npm init 
  ```

 - 安装express
    ``` shell
    npm install express
    ```
  - 使用
    新建一个js，我这命名为server.js
    ```javascript
      var express = require("express");
      var app = express();
      // 静态资源代理
      app.use("/", express.static(__dirname + "/dist"));

      app.get("/", function (_, res) {
        res.sendFile(__dirname + "/dist/index.html");
      });

      var server = app.listen(8088, function () {
        var port = server.address().port;
        console.log('localhost:' + port);
      });
    ```
    
- 运行
把vue项目中build生成的dist文件夹copy过来。
    ``` shell
    node server.js
    ```
  
    打完收工
    <img src="https://img2023.cnblogs.com/blog/1126296/202212/1126296-20221222174446705-278044712.png" style="zoom:50%;" />

上面举例的是个没有请求接口的项目，但是我们的项目不请求接口是不可能的。 所以请求接口还是会有问题直接报404。

为啥项目开发运行过程中不会出问题，是因为我们在```vue.config.js```中配置的 ```devServer``` 。

当项目打包之后，你会发现项目变成静态页面了，我们会把页面打包部署到类似 nginx 上，也就是没有 node.js 作为页面的呈现服务了，那么配置的 ```devServer``` 当然也没法有效了，但原理还是一致的，最后只需在 nginx 上配置转发即可。

这是打包后部署服务器上的原理， 那我们部署在本地node服务原理也一样，我们借助```http-proxy-middleware```来完成代理转发。

- 安装
  ```shell 
  npm install http-proxy-middleware`
  ```
- 使用
    ``` javascript
    var { createProxyMiddleware } = require("http-proxy-middleware");
    app.use(
       "/api", // 需要代理接口路径
       createProxyMiddleware({
          target: "", // 代理的域名
          changeOrigin: true,
          secure: false,
          onProxyReq: function (proxyReq, req, res, options) {
           if (req.body) {
             let bodyData = JSON.stringify(req.body);
             // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
             proxyReq.setHeader("Content-Type", "application/json");
             proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
             // stream the content
             proxyReq.write(bodyData);
           }
         },
       })
    );
    ```

 - 运行

    ```shell
    npm server
    ```
