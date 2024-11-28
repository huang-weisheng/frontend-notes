import {ipcRenderer} from 'electron';

window.ping=() => ipcRenderer.invoke('ping');
window.electronAPI={
	setTitle: (title) => ipcRenderer.send('set-title',title),
};
ipcRenderer.on('main',(_event,value) => {
	console.log('modalWindow:',value);
});
window.addEventListener('DOMContentLoaded',() => {
	const replaceText=(selector,text) => {
		const element=document.getElementById(selector);
		if(element&&text) element.innerText=text;
	};

	for(const dependency of ['chrome','node','electron']) {
		replaceText(`${dependency}-version`,process.versions[dependency]);
	}
});
