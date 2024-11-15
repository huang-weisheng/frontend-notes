/* 预加载脚本能够访问 Node.js 和 Electron 的 API，但没有直接访问 DOM 的权限 */
// 启用渲染进程的上下文隔离后,需要通过 contextBridge 模块来安全地暴露 API 和与主进程通信。
// 不开启渲染进程上下文隔离可以直接在预加载脚本中将变量挂载到window全局对象上
// 必须关闭安全沙箱功能 webPreferences.sandbox , 预加载文件才可使用es语法
const {ipcRenderer,contextBridge}=require('electron');

for(const dependency of ['chrome','node','electron']) {
	console.log(`${dependency}-version`,process.versions[dependency]);
}

// 向主进程发送消息并接收回复,触发 ipcMain.handle 监听 ping 的函数,并以promise接收其返回值,
const ping=()=>ipcRenderer.invoke('ping')
// 向主进程发送消息
const setTitle=(title) => ipcRenderer.send('set-title',title)
// 监听主进程发送的消息
ipcRenderer.on('main',(_event,value) => {
	console.log('收到 main 消息: ',value);
});
// contextBridge.exposeInMainWorld 用于在渲染进程的全局上下文（即 window 对象）中安全地暴露某些功能或 API，
contextBridge.exposeInMainWorld('electronAPI',{
	ping,
	setTitle
});
// 接收主进程发送的用于两个渲染进程通信的端口
ipcRenderer.on('port',e => {
	let electronMessagePort=e.ports[0];
	electronMessagePort.onmessage=messageEvent => {
		// 处理消息
		console.log(messageEvent);
	};
	// 将electronMessagePort的发送方法暴露到window.electronMessagePort
	contextBridge.exposeInMainWorld('electronMessagePort',{
		postMessage: electronMessagePort.postMessage.bind(electronMessagePort)
	});
});
