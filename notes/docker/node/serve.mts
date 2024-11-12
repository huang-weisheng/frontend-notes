import http from 'http';
import {createWebsocketServer} from './serveModule/websocketServe.mjs';
import {GET} from './serveModule/get.mjs';
import {POST} from './serveModule/post.mjs';
import {DELETE} from './serveModule/delete.mjs';
const port=678;
//定义处理请求方法的映射
const RequestMap={
	GET,
	POST,
	DELETE,
};
// 创建 HTTP 服务器
const server=http.createServer((req,res) => {

	// 设置允许所有来源访问
	// res.setHeader('Access-Control-Allow-Origin','*');
	// 指定允许的 HTTP 请求方法
	res.setHeader('Access-Control-Allow-Methods','*');
	//设置允许所有的请求头
	res.setHeader('Access-Control-Allow-Headers','*');
	//指定哪些响应头可以暴露给前端 JavaScript。
	res.setHeader('Access-Control-Expose-Headers','*');
	//表示是否允许发送 Cookie。如果服务器设置为 true，则浏览器请求时需要设置 withCredentials 为 true。
	res.setHeader('Access-Control-Allow-Credentials','true');

	// 如果是 OPTIONS 请求，直接响应 200 OK
	if(req.method==='OPTIONS') {
		res.writeHead(200);
		return res.end();
	}

	//服务端收到的请求头字段全部为小写
	// console.log(req.headers);
	console.log(req.method);
	if(req.method==='GET') {
		GET(req,res);
	} else if(req.method==='POST') {
		POST(req,res);
	} else if(req.method==='DELETE') {
		DELETE(req,res);
	} else {
		res.writeHead(404,{'Content-Type': 'text/plain;charset=utf-8'});
		res.end('页面找不到');
	}

	// 监听请求的关闭事件,aborted事件已经弃用
	req.on('close',() => {
		//如果还未设置请求头,说明longRunningOperation在执行
		if(!res.headersSent) {
			res.writeHead(500,{'Content-Type': 'text/plain'});
			res.end('Request aborted');
			console.log('请求中断');
		}
	});

});

//监听websocket请求并启动服务
createWebsocketServer(server);

// 服务器开始监听指定端口
server.listen(port,() => {
	console.log(`Server is running at \x1b[34mhttp://localhost:${port}\x1b[0m`);
});

// 在容器终止时执行的清理操作
process.on('SIGTERM',() => {
	console.log('node is exit...');
	process.exit();
});
