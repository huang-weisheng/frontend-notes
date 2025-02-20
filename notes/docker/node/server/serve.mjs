import http from 'http';

let port = 99;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
	// 设置允许所有来源访问
	res.setHeader('Access-Control-Allow-Origin', '*');
	// 指定允许的 HTTP 请求方法
	res.setHeader('Access-Control-Allow-Methods', '*');
	//设置允许所有的请求头
	res.setHeader('Access-Control-Allow-Headers', '*');
	//指定哪些响应头可以暴露给前端 JavaScript。
	res.setHeader('Access-Control-Expose-Headers', '*');
	//表示是否允许发送 Cookie。如果服务器设置为 true，则浏览器请求时需要设置 withCredentials 为 true。
	res.setHeader('Access-Control-Allow-Credentials', 'true');

	// 如果是 OPTIONS 请求，直接响应 200 OK
	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		return res.end();
	}

	//服务端收到的请求头字段全部为小写
	// console.log(req.headers);
	if (req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Hello World' }));
	} else{
		res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
		res.end('页面找不到');
	}

});
server.listen(port, () => {
	console.log(`Server is running at \x1b[34mhttp://localhost:${port}\x1b[0m`);
});