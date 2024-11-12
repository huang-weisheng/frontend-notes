import { type Plugin } from 'vite';

// 插件配置选项接口定义
interface Options {
	author?: string; // 作者信息
}
/** 创建一个Vite插件,用于获取构建信息 */
export default function (options: Options = {}): Plugin {
	// 定义虚拟模块ID
	const virtualModuleId = 'virtual:build-info';
	// 解析后的虚拟模块ID,添加\0前缀表示这是一个虚拟模块
	const resolvedVirtualModuleId = '\0' + virtualModuleId;
	// 记录构建开始时间
	const buildStartTime = new Date().toLocaleString();
	return {
		// 插件名称
		name: 'vite-plugin-info',
		//插件的执行条件
		apply(config, { command }) {
			// 返回 true 表示使用插件
			return true;
		},
		enforce: 'post', // 在其他插件之后执行
		/*  代码执行顺序
			1. Alias
			2. 带有 enforce: 'pre' 的用户插件
			3. Vite 核心插件
			4. 没有 enforce 值的用户插件
			5. Vite 构建用的插件
			6. 带有 enforce: 'post' 的用户插件
			7. Vite 后置构建插件（最小化，manifest，报告）
		*/
		/** 解析虚拟模块ID */
		resolveId(id) {
			if (id === virtualModuleId) {
				return resolvedVirtualModuleId;
			}
		},
		/**调用 load 方法定义虚拟模块内容 */
		load(id) {
			if (id === resolvedVirtualModuleId) {
				// 返回包含构建时间和作者信息的模块内容
				return `
					export const buildTime ='${buildStartTime}'
					export const author = '${options.author}'
				`;
			}
		},
		/** 转换源代码 */
		transform(code, id) {
			//返回文件内容
			return code;
		},
		/** 配置开发服务器 */
		configureServer(server) {
			// 添加自定义中间件,提供构建信息API
			server.middlewares.use((req, res, next) => {
				if (req.url === '/build-info') {
					res.setHeader('Content-Type', 'application/json');
					// 返回JSON格式的构建信息
					res.end(JSON.stringify({
						buildTime: buildStartTime,
						author: options.author
					}));
				} else {
					next();
				}
			});
		},
		buildStart() {
			// 使用 setTimeout 延迟输出
			setTimeout(() => {
				console.log('-plug-info','\x1b[35m构建开始...\x1b[0m');
			}, 0);
		},
		buildEnd() {
			// 使用 setTimeout 延迟输出
			setTimeout(() => {
				console.log('-plug-info','\x1b[33m构建结束...\x1b[0m');
			}, 0);
		},
		/** 处理热更新 */
		handleHotUpdate(ctx) {
			// ctx 包含以下属性：
			const {
				file,          // 改变的文件路径
				timestamp,     // 时间戳
				modules,       // 受影响的模块
				read,          // 读取文件内容的函数
				server        // Vite 服务器实例
			} = ctx;
			// 指定需要热更新的模块
			if (file.endsWith('.vue')) {
				// 返回受影响的模块进行更新
				return modules;
			}
			// 当特定文件改变时触发完全重载
			if (file.includes('config.json')) {
				// 强制页面重新加载
				server.ws.send({
					type: 'full-reload'
				});
				// 返回空数组表示不需要进行模块热更新
				return [];
			}
			// 例如：自定义热更新处理
			if (file.endsWith('.custom')) {
				// 发送自定义事件到客户端
				server.ws.send({
					type: 'custom',
					event: 'custom-update',
					data: { file, timestamp }
				});
				return [];
			}
			// 返回 undefined 表示使用 Vite 默认的热更新处理
			return;
		}
	};
}