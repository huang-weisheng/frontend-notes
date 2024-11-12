import {app,BrowserWindow,ipcMain,Menu,screen,session} from 'electron';
import {createMainWindow} from './window/mainWindow.mjs';

// app 模块，它控制应用程序的事件生命周期。
app.whenReady().then(async () => {
	//获取主显示器的信息
	const display=screen.getPrimaryDisplay();
	//获取主显示器的尺寸(设备独立像素为单位)及缩放比例,app.whenReady后调用。
	const {workAreaSize: {width,height},scaleFactor}=display;
	const screenInfo={width,height,scaleFactor};
	//隐藏默认设置的顶部菜单,createWindow前调用避免覆盖针对单独窗口的设置
	Menu.setApplicationMenu(null);
	//创建窗口,在 app 模块 ready 事件之前，您不能使用此模块。
	const mainWindow=await createMainWindow(screenInfo);
	//ipcMain.handle 定义渲染进程通过 ipcRenderer.invoke 发送消息时的处理函数及返回结果
	ipcMain.handle('ping',() => 'pong');
	//监听渲染进程发送的消息
	ipcMain.on('set-title',(event,title) => {
		//获取发送消息的窗口并为其设置标题
		const webContents=BrowserWindow.fromWebContents(event.sender);
		webContents.setTitle(title);
	});
	//主进程向渲染进程发送消息
	setTimeout(() => mainWindow.send('main',`send to main`),1000);
	//修改响应头,允许跨域请求
	session.defaultSession.webRequest.onHeadersReceived((details,callback) => {
		// details: 包含关于请求的信息，包括响应头、状态码等。
		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Access-Control-Allow-Origin': ['*'],
				'Access-Control-Allow-Headers': ['*'],
				'Access-Control-Allow-Methods': ['*'],
			},
		});
	});
	app.on('activate',async () => {
		if(BrowserWindow.getAllWindows().length===0) await createMainWindow(screenInfo);
	});
});
//应用程序结束之前的回调
app.on('before-quit',() => {
	console.log('app is quit!');
});
//所有窗口关闭事件的回调
app.on('window-all-closed',() => {
	if(process.platform!=='darwin') app.quit();
});
