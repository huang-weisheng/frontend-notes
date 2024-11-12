# 切换npm源

## 设置全局镜像源

```bash
npm get registry #显示当前的镜像网址
npm config set registry  #设为默认地址
npm config set registry https://registry.npmmirror.com/ #更换淘宝的镜像网址
npm install -g nrm #安装源管理工具
nrm ls #查看所有的可用的源
nrm use 源的名字 #切换到某个源
```

## 使用 npmrc 文件配置镜像源

1. 创建或编辑 .npmrc 文件
2. 添加以下内容:
```bash
registry=https://registry.npmmirror.com/
```

# npm 更新依赖

运行 npm update 后,package.json 文件不会自动修改。package-lock.json 中会显示当前使用的版本(更新后)

```bash
npm outdated #检查哪些依赖项需要更新
npm update #更新所有依赖项的版本到最新版本
npm update <package-name >  #更新特定的依赖项
npm update [ <package-name > ] --save  #更新依赖并保存到package.json,若无效删除lock文件并重新npm i
```

# volta

你可以为你的项目指定特定的 Node.js 和工具版本, Volta 会自动为你设置这些版本。

- Volta 的功能依赖于创建符号链接，因此您必须：(二选一)
	- 启用开发者模式(推荐,系统=>开发者选项=>开发人员模式)。
	- 以管理员模式运行终端。

- volta install(pin) xx@x.x.x.x卡住解决办法:
	1. volta install(pin) xx@x.x.x.x --verbose 查看源下载地址
	2. 手动下载文件放到缓存目录： ~\AppData\Local\Volta\tools\inventory\xx
	3. 重新执行 volta install(pin) xx@x.x.x.x

- 删除node,npm,yarn缓存安装包
	- 目录:  ~\AppData\Local\Volta\tools\inventory\ 下对应目录
	- inventory\node目录需保留image\node目录下对应版本的 node-vxx.x.x-npm 文件

- 删除不用的node,npm,yarn版本
	- 目录:  ~\AppData\Local\Volta\tools\image\ 下对应目录
	- 影响 volta list all 显示

- 删除package.json中volta字段可以取消项目指定版本

```bash
	volta install 包名  #设置工具的默认版本。如果该工具尚未在本地缓存,将获取该工具。
	volta uninstall 包名  #将包从工具链卸载 (npm,node,yarn不能卸载)
	volta list #查看工具链中安装的包
	volta list all #查看工具链中所有的包详细信息
	volta pin node@latest  #为项目指定node版本
	volta pin npm@latest  #为项目指定npm版本
	volta run --node latest --npm latest npm run test #指定版本运行命令
		--node latest(可选) 指定node版本
		--npm latest(可选) 指定npm版本
	volta which 命令 #查看命令的文件路径
```

