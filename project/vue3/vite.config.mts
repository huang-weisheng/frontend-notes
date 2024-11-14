import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vitePluginInfo from './vite-plugins/vite-plugin-info.mjs';

export default defineConfig(({ command, mode }) => {
	console.log('command', command);
	console.log('mode', mode)
	return {
		mode: 'play',//指定项目运行的模式
		base: '/web/',//公共基础路径。
		//构建配置
		build: {
			outDir: 'dist',// 存放打包文件的目录
			assetsDir: 'static',// 存放静态资源的目录
			sourcemap: false,// 生成源映射文件
			chunkSizeWarningLimit: 1024,//打包文件大小警告阈值
			minify: true, //是否开启代码压缩	
			target: 'ESNext',// 指定目标ECMAScript版本
			//设置资源内联为 base64的阈值
			assetsInlineLimit: (filePath: string, content: Buffer)=>{
				//返回true则将资源内联为 base64,否则不内联	
				return content.byteLength < 0;
			},
			// rollup 中多次引入的局部注册组件会自动被提取成单独的文件
			rollupOptions: {
				// 自定义输出目录结构和分包,覆盖assetsDir属性
				output: {
					//规定入口文件的输出路径和命名格式。
					entryFileNames: 'js/entry.[name].[hash].js',
					//规定代码拆分后的输出文件命名格式。
					chunkFileNames: 'js/chunk.[name].[hash].js',
					//自定义所有非 JS 文件的输出路径和命名规则。
					assetFileNames: (assetInfo) => {
						let extType: string = '';
						if (assetInfo.name) {
							extType = assetInfo.name.split('.').pop() || '';
						}
						if (extType === 'css') {
							return 'css/[name].[hash][extname]';
						}
						const imgTypes = ['png', 'jpg', 'jpeg', 'gif', 'svg'];
						if (imgTypes.includes(extType)) {
							return 'images/[name].[hash][extname]';
						}
						return 'assets/[name].[hash][extname]';
					},
					// 手动进行代码分包,返回的文件名为chunkFileNames字段的[name]
					manualChunks(id) {
						//id: 模块的绝对路径
						if (id.includes('node_modules')) {
							// 分包的文件名
							return 'node_modules';
						}

					}
				}
			}
		},
		//esbuild配置
		esbuild: {
			//build模式下删除console和debugger
			drop: command === 'build' ? ['console', 'debugger'] : []
		},
		//plugins 用于定义 Vite 的插件。
		plugins: [
			vue(),
			vitePluginInfo({ author: 'hyx' })
		],
		//路径别名配置
		resolve: {
			alias: {
				'@': path.resolve(import.meta.dirname, 'src')
			},
		}, 
		//开发服务器配置
		server: {
			port: 666, //vite项目启动时自定义端口
			host: '0.0.0.0',
			hmr: true,//是否开启热更新
			headers: {//设置响应给浏览器的头,只对开发服务器直接处理的静态资源请求有效
				'X-Custom-To-Browser': 'Custom-Header'
			},
			//代理服务器配置
			proxy: {
				'^/vvhan': {
					target: 'https://api.vvhan.com',
					//将主机标头的来源更改为目标 URL
					changeOrigin: true,
					//配置转发出去的请求的请求头,只对代理的请求有效
					headers: {
						'Custom-To-Server': 'Custom-Header'
					},
					//路径重写
					rewrite: (path) => path.replace(/^\/vvhan/, ''),
					//是否添加x-forward标头
					xfwd: true,
					//转发配置
					configure: (proxy, _options) => {
						//这里也可以配置转发出去的请求的请求头
						proxy.on('proxyReq', function (proxyReq, req, res) {
							const proxyReqHeaders = proxyReq.getHeaders();
							const originHeaders = req.headers;

							//移除请求头
							proxyReq.removeHeader('Custom-To-Server');
							//添加请求头
							proxyReq.setHeader('proxy-to-server', 'Proxy-Header');
							
							const newProxyReqHeaders = proxyReq.getHeaders();
						});
						//这里可以配置代理后响应给浏览器的响应头
						proxy.on('proxyRes', (proxyRes, req, res) => {
							const proxyResHeaders = { ...proxyRes.headers };
							const originHeaders = { ...req.headers };

							//操作返回给浏览器原请求的响应头
							proxyRes.headers["Proxy-To-Browser"] = "Proxy-Header";
							proxyRes.headers["Proxy-To-Delete"] = "Delete-Header";
							delete proxyRes.headers['Proxy-To-Delete'];

							const newProxyResHeaders = { ...proxyRes.headers };
						});
					}
				},
			}
		},
	};
});
