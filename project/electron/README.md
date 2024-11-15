# electron project 注意事项


# electron build 配置
files字段不声明则打包当前目录所有文件,
extraMetadata 允许打包时动态修改package.json中的字段,
打包要包含 package.json,根据package.josn指定启动项目入口文件及版本等信息。

# 常用属性

## 窗口操作

```js
//设置位置
mainWindow.setPosition(0,0); 
//设置大小
mainWindow.setSize(1200,600); 
//隐藏窗口
mainWindow.hide(); 
//显示窗口
mainWindow.show(); 
//设置是否全屏
mainWindow.setFullScreen(false); 
//取消窗口最大化
mainWindow.unmaximize(); 
//最小化窗口
mainWindow.minimize(); 
//窗口最大化
mainWindow.maximize(); 
//获取窗口是否最大化
mainWindow.isMaximized(); 
//在渲染进程中执行 JavaScript 代码。返回包含执行结果的 Promise。
const title=await mainWindow.webContents.executeJavaScript('document.title')
```


