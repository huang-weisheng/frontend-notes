import {
	app,BrowserWindow,Menu,Tray,nativeImage,dialog
} from 'electron';
import path from 'path';
import {IS_DEV,ROOT_PATH,ASSETS_PATH} from '../constants.mjs';
import {createMoadalWindow} from './modalWindow.mjs';
const loadUrl='http://localhost:666/web/';
const iconPath=IS_DEV? 'icon/apple.png':'icon/shield.png';
//在 app 模块 ready 事件之后创建窗口。
/**
 * 创建窗口
 * @param {Object} screenInfo 屏幕信息
 * @returns {BrowserWindow} 窗口对象
 */
export const createMainWindow=async (screenInfo) => {
	// 初始化托盘菜单
	let tray;
	/**
	 * 创建窗口 BrowserWindow 模块，它创建和管理应用程序 窗口。
	 * @param {Object} screenInfo 屏幕信息
	 * @returns {BrowserWindow} 窗口对象
	 */
	const mainWindow=new BrowserWindow({
		//窗口大小和位置
		x: Math.round((screenInfo.width - 1400) / 2),
		y: Math.round((screenInfo.height - 700) / 2),
		width: 1400,
		height: 700,
		//是否全屏
		fullscreen: false,
		//是否允许窗口拖动
		movable: true,
		// 是否允许用户拖动大小
		resizable: true,
		//设置应用背景色
		backgroundColor: '#a4f79b',
		//窗口创建时是否显示。
		show: true,
		//是否显示系统标题栏
		frame: true,
		//窗口图标
		icon: nativeImage.createFromPath(path.join(ASSETS_PATH,iconPath)),
		//webPreferences 是一个对象，用于配置 BrowserWindow 的Web内容属性。
		webPreferences: {
			// 指定预加载脚本。
			preload: path.join(ROOT_PATH,'preload/main.cjs'),
			// 渲染进程上下文隔离:开启后需要通过 contextBridge 模块安全地暴露 API 和与主进程通信。
			contextIsolation: true,
			// Node.js 集成: 默认 false,当启用 nodeIntegration 时，沙盒(sandbox)也会被禁用。
			// contextIsolation 为 false 且 nodeIntegration 为 true ,可以在渲染进程直接使用commonJS语法访问nodeAPI
			nodeIntegration: false,
			// 渲染进程沙箱，限制访问 Node.js 的能力。预加载文件需关闭沙箱才能使用es语法。
			sandbox: false,
			//是否启用web同源策略,若为false则允许跨域请求和加载file协议本地文件
			webSecurity: true,
			//是否启用控制台
			devTools: true
		}
	});
	//加载页面
	mainWindow.loadURL(loadUrl);
	mainWindow.on('ready-to-show',() => {/** 窗口加载完成 */});
	//打开控制台
	mainWindow.webContents.openDevTools();
	//在渲染进程中执行 JavaScript 代码。返回包含执行结果的 Promise。
	const title=await mainWindow.webContents.executeJavaScript('document.title')

	//窗口的基本操作和属性
	function setWindowProperty() {
		mainWindow.setPosition(0,0); //设置位置
		mainWindow.setSize(1200,600); //设置大小
		mainWindow.hide(); //隐藏窗口
		mainWindow.show(); //显示窗口
		mainWindow.setFullScreen(false); //设置是否全屏
		mainWindow.unmaximize(); //取消窗口最大化
		mainWindow.minimize(); //最小化窗口
		mainWindow.maximize(); //窗口最大化
		mainWindow.isMaximized(); //获取窗口是否最大化
	}
	//自定义窗口菜单
	setIndexMenuTemplate(mainWindow);
	//关闭时最小化到托盘
	mainWindow.on('close',(event) => {
		if(!tray) {
			event.preventDefault();
			minToTray(mainWindow);
		}
	});

	/**自定义窗口菜单*/
	function setIndexMenuTemplate(mainWindow) {
		const indexMenuTemplate=[
			{
				label: '窗口',
				submenu: [
					{
						label: '切换全屏',
						// (可选),表示菜单项的角色。
						role: 'togglefullscreen',
						enabled: false
					},
					{
						label: '模态框',
						// 快捷键
						accelerator: 'CmdOrCtrl+M',
						click: () => createMoadalWindow(mainWindow)
					},
				],
			},
			{
				label: '对话框',
				submenu: [
					{
						label: '信息',
						click: async () => {
							// mainWindow(可选): 将 dialog 绑定到此窗口,类似模态框效果
							const result=await dialog.showMessageBox(mainWindow,{
								type: 'info',//error , warning , question , none
								title: '信息',
								message: '这是一个消息框',
								buttons: ['取消','确定'],
								checkboxLabel: '勾选框信息',
								checkboxChecked: true,
								icon: path.join(ASSETS_PATH,iconPath),
								detail: '额外信息'
							});
							console.log(result);
						}
					},
					{
						label: '错误',
						click: () => {
							dialog.showErrorBox('错误','这是一个错误框');
						}
					},
					{
						label: '选择文件',
						click: async () => {
							// mainWindow(可选): 将 dialog 绑定到此窗口,类似模态框效果
							let filePaths=await dialog.showOpenDialog(mainWindow,{
								//'openFile'选择文件',openDirectory' 选择文件夹 不能同时存在
								properties: ['openFile','multiSelections'],
								defaultPath: path.join(app.getPath('home'))
							});
							//返回选择的文件路径集合
							console.log(filePaths);
						}
					},
					{
						label: '文件保存',
						click: async () => {
							// mainWindow(可选): 将 dialog 绑定到此窗口,类似模态框效果
							let result=await dialog.showSaveDialog(mainWindow,{
								title: '保存文件',
								defaultPath: path.join(app.getPath('downloads'),'defaultFilename.txt')
							});
							console.log(result);
						}
					},
				]

			},
			{
				label: '系统',
				submenu: [
					{
						label: '开发者工具',
						role: 'toggleDevTools'
					}
				]
			}
		];
		// 构建菜单
		const mainMenu=Menu.buildFromTemplate(indexMenuTemplate);
		// 设置菜单
		mainWindow.setMenu(mainMenu);
	}
	/** 最小化到托盘 */
	function minToTray(win) {
		// 设置托盘以及图标,路径最好避免使用中文路径或者文件名
		tray=new Tray(path.join(ASSETS_PATH,iconPath));
		// 设置托盘菜单
		tray.setContextMenu(Menu.buildFromTemplate([
			{label: '退出',click: () => {app.quit();}}
		]));
		tray.setToolTip('Electron 应用');
		tray.on('click',() => {
			// 销毁托盘图标,显示主窗口
			mainWindow.show();
			tray&&tray.destroy();
			tray=null;
		});
		// 隐藏窗口
		win.hide();
	}
	return mainWindow;
};
