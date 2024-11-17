import path from 'path';
import fs from 'fs';
import {type IncomingMessage,type ServerResponse} from 'http';

const root=path.resolve();

export function POST(req: IncomingMessage,res: ServerResponse) {
	let chunks: Uint8Array[]=[];
	// 监听请求的 'data' 事件，收集上传的数据块
	req.on('data',(chunk: Uint8Array) => {
		chunks.push(chunk);
	});
	// 监听请求完成事件，处理完整的上传数据
	req.on('end',() => {
		// 将所有数据块合并成一个 Buffer
		const dataBuffer=Buffer.concat(chunks);
		//json格式请求
		if(req.url==='/json') {
			let jsonObj=JSON.parse(dataBuffer.toString()||"{}");
			console.log(jsonObj);
		}
		//二进制文件上传
		else if(req.url==='/binaryUpload') {
			// 读取后缀并生成唯一的文件名
			const fileName=`file_${Date.now()}.${req.headers['x-ext']}`;
			// 将文件内容写入文件系统
			writeFile(fileName,dataBuffer);
		}
		//formData格式上传数据
		else if(req.url==='/formDataUpload') {
			// 解析请求头，获取 boundary
			const boundary = dataBuffer.toString().split('\r\n')[0]
			// 声明一个数组,用来存放formdata中截取的键值对数据
			let datas: Buffer[]=[];
			//截取formdata中的每个键值对数据存放到datas
			let preIndex=0;
			let nextIndex=dataBuffer.indexOf(boundary,preIndex+1);
			do {
				const data=dataBuffer.subarray(preIndex,nextIndex);
				preIndex=nextIndex;
				nextIndex=dataBuffer.indexOf(boundary,nextIndex+1);
				datas.push(data);
			} while(nextIndex!==-1);
			//遍历处理切块后的数据
			datas.forEach(data => {
				//截取缓冲区内容
				const startIndex=data.indexOf('\r\n\r\n');
				const endIndex=data.lastIndexOf('\r\n');
				// formdata键值对的一个信息
				const info=data.subarray(0,startIndex);
				// formdata键值对携带的数据
				const content=data.subarray(startIndex+4,endIndex);
				if(info.includes('filename')) {
					// 获取文件名
					const fileName=/filename="(.+)"/.exec(info.toString('utf-8'));
					//将文件内容写入文件系统
					fileName&&writeFile(fileName[1],content);
				}
				else if(data.includes('name')) {
					// 获取字段名
					const key=/name="(.+)"/.exec(info.toString('utf-8'));
					const value=content.toString('utf-8');
					console.log('FormData',key&&key[1],value);
				}
			});
		}
		else {
			res.writeHead(404,{'Content-Type': 'text/plain;charset=utf-8'});
			res.end('页面找不到');
			return
		}
		res.writeHead(200,{'Content-Type': 'text/plain'});
		res.end('successfully');
	});
};

function writeFile(fileName,fileContent) {
	//创建文件夹路径
	const folderPath=path.join(root,'uploads');
	// 拼接文件的完整路径
	const filePath=path.join(root,'uploads',fileName);
	// 判断文件夹是否存在
	if(!fs.existsSync(folderPath)) {
		// 如果文件夹不存在，创建它
		fs.mkdirSync(folderPath);
	}
	try {
		fs.writeFileSync(filePath,fileContent);
		console.log('File saved successfully:',filePath);
	} catch(err) {
		console.error('Error writing file:',err);
		return true;
	}

}
