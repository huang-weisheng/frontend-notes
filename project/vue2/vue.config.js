const { defineConfig } = require ( '@vue/cli-service' );

module.exports = defineConfig ( {
	transpileDependencies : false ,//是否对第三方依赖进行转译
	lintOnSave : false , //保存时lint,安装lint后生效
	indexPath : 'hyx.html' ,//打包后的出口文件名
	publicPath : './' ,//部署应用包时的基本路径.打包后的html基于这个路径引入静态资源
	outputDir : 'dist' ,//构建生产环境文件的目录
	assetsDir : 'static' ,//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录,
	devServer : {
		// https : true ,
		headers : {
			'Access-Control-Allow-Origin' : '*' , //为所有相应设置响应头
		} ,
		allowedHosts : 'all' , //禁用主机检查,所有地址都可以访问
		host : '0.0.0.0' ,  //主机
		port : 999 ,  //端口
		proxy : {
			//使用了 http-proxy-middleware 插件
			//所有配置见 https://github.com/chimurai/http-proxy-middleware#http-proxy-events
			'^/api' : { //要代理的字段,可以使用正则表达式
				changeOrigin : true ,//是否将请求头中携带的host头设置为代理目标的host,HTTP/2 版本协议不要求携带
				target : process.env.VUE_APP_URL , //将请求代理到的目标url
				pathRewrite : {
					'^/api' : 'api' , //路径重写
				} ,
				xfwd : true ,//代理服务器发送请求时是否携带请求的来源信息(X-Forwarded字段)
				onProxyReq ( proxyReq , req , res ) {//设置代理服务器的请求头
					//proxyReq.setHeader ( '' , '' )
				} ,
				onProxyRes ( proxyRes , req , res ) {//设置代理服务器的响应头
					//proxyRes.headers[ '' ] = ''
				} ,
			} ,
			'^/ocrbase' : {
				target : 'https://eolink.o.apispace.com' ,
			} ,
		} ,
	} ,
} );
