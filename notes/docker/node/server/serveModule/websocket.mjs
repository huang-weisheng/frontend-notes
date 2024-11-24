import { WebSocketServer } from 'ws';
/**
 * 选择子协议
 * @param protocols {Set<string>} 子协议集合
 * @param req {http.IncomingMessage} 请求对象
*/
function handleProtocols(protocols, req) {
	return protocols[1];
}
/**
 * 创建WebSocket服务器
 * @param server {http.Server} 服务器对象
*/
export function createWebsocketServer(server) {
	// 创建 WebSocket 服务器
	const wss = new WebSocketServer({ server, handleProtocols }, () => {
		console.log('WebSocket server created');
	});
	// 监听连接事件
	wss.on('connection', (ws, req) => {
		// 协议为hyx的客户端
		let hyxClient = [...wss.clients].filter(f => f._protocol === 'hyx');
		// 协议为jyb的客户端
		let jybClient = [...wss.clients].filter(f => f._protocol === 'jyb');
		// 监听消息事件
		ws.on('message', (message, isBinary) => {
			// 判断消息格式是否为二进制
			if (isBinary) {
				
			} else {
				
			}
			ws.send(message);
		});

		// 监听关闭事件
		ws.on('close', () => {
			console.log('Client disconnected');
		});
	});
}
