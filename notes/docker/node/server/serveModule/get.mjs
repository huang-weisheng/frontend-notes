
import * as path from 'path';
import * as fs from 'fs';
//获取当前模块的目录路径
const root=path.resolve();
/**
 * 发送404响应
 * @param res {http.ServerResponse} 响应对象
*/
function notfound(res) {
	res.writeHead(404,{'Content-Type': 'text/plain;charset=utf-8'});
	res.end('页面找不到');
}
/**
 * 处理GET请求
 * @param req {http.IncomingMessage} 请求对象
 * @param res {http.ServerResponse} 响应对象
*/
export function GET(req,res) {
	//初始化模拟长时间请求的变量
	let longRunningOperation;
	if(req.url) {
		let fileList=['/','html','css','js','josn'];
		let reqType=req.url.split('.').slice(-1)[0];
		//如果是媒体类型为需要返回文件的类型
		if(fileList.includes(reqType)) {
			//拼接文件的完整路径
			let filePath=path.join(root,reqType==='/'? 'index.html':req.url);
			// 获取文件状态
			fs.stat(filePath,function(err,stats) {
				if(err) {
					notfound(res);
				} else {
					// 发送200响应
					res.writeHead(200);
					// res 是一个可写流,fs创建一个可读流,用pipe方法直接写入
					fs.createReadStream(filePath).pipe(res);
				}
			});
		} else {
			if(req.url==='/stream_fetch_text') {
				//模拟一个需要两秒完成的响应
				longRunningOperation=setTimeout(() => {
					//返回响应头。fetch请求状态确定
					res.writeHead(200,{'Content-Type': 'text/plain;charset=utf-8'});
					//write()返回响应体内容
					res.write('响应中......');
					setTimeout(() => {
						//end结束返回响应体内容,流式返回数据
						res.end('请求完成!');
					},2000);
				},2000);
			} else {
				notfound(res);
			}

		}
	}
	// 请求关闭时取消长时间运行的操作
	req.on('close',() => {
		if(longRunningOperation) {
			clearTimeout(longRunningOperation);
		}
	});
};
