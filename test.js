var express = require('express');
var fs=require("fs");
var app = express();
var path=require("path");
const proxy = require('http-proxy-middleware');//引入代理中间件
app.use(express.static(path.resolve("images")));

const apiProxy = proxy('/aj', { target: 'http://192.168.1.79:8090',changeOrigin: true });//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
app.use('/aj/*', apiProxy);//api子目录下的都是用代理

app.get("/",function(req,res){
    var data=fs.readFileSync("testUp.html","utf-8");
    res.end(data);
});
app.listen(8888,function(){
    console.log("监听 8888 中!")
});