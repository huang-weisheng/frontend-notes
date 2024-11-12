import fs from 'fs';
import path from 'path';
import {type IncomingMessage,type ServerResponse} from 'http';
const folderPath=path.join(path.resolve(),'uploads');
export function DELETE(req: IncomingMessage,res: ServerResponse) {
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
