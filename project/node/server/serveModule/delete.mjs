import * as fs from 'fs';
import * as path from 'path';
const folderPath=path.join(path.resolve(),'uploads');
/**
 * 删除uploads目录下所有文件
 * @param req {http.IncomingMessage} 请求对象
 * @param res {http.ServerResponse} 响应对象
*/
export function DELETE(req,res) {
	fs.rm(folderPath,{force: true,recursive: true},err => {
		if(err) {
			res.writeHead(500,{'Content-Type': 'text/plain'});
			res.end('deleteAllFiles error');
		} else {
			res.writeHead(200,{'Content-Type': 'text/plain'});
			res.end('deleteAllFiles successfully');
		}
	});
};
