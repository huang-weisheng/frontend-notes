import {WebSocketServer} from 'ws'
//选择子协议
function handleProtocols(protocols: Set<string>,req) {
	return [...protocols][Math.round(Math.random())]
}
export function createWebsocketServer(server) {
	// 创建 WebSocket 服务器
	const wss=new WebSocketServer({server,handleProtocols})

	// 监听连接事件
	wss.on('connection',(ws,req) => {
		let hyxClient=[...wss.clients].filter(f => f._protocol==='hyx')
		let jybClient=[...wss.clients].filter(f => f._protocol==='jyb')
		console.log('connection')
		// 监听消息事件
		ws.on('message',(message) => {
			console.log('ReceivedLength:',message.length)
			// 回复收到的消息
			ws.send(message)
		})

		// 监听关闭事件
		ws.on('close',() => {
			console.log('Client disconnected')
		})
	})
}
