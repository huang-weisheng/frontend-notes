import path from 'path';
import {BrowserWindow} from 'electron';
import {ROOT_PATH,ASSETS_PATH} from '../../constants.mjs'

export const createMoadalWindow=(window) => {
	const modalWindow= new BrowserWindow({
		width: 800,
		height: 600,
		//父窗口,子窗口总在父窗口上方
		parent: window,
		//模态窗口,子窗口出现时父窗口禁用任何操作
		modal: true,
		webPreferences: {
			preload: path.join(ROOT_PATH,'preload/modal/modal.mjs'),
			contextIsolation: false,
			nodeIntegration: true,
		}
	});
	//防止窗口关闭时闪烁
	modalWindow.on('close',() => {
		modalWindow.hide();
		window.focus()
	});
	let filePath=path.join(ASSETS_PATH,'page/modal.html');
	// modalWindow.webContents.openDevTools();
	modalWindow.loadFile(filePath);
	return modalWindow;
}
