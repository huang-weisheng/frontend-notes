import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import App from '@/App.vue';
import VueRouter from 'vue-router';
import routes from '@/router';
import store from '@/store';
import HButton from '@/components/h-button/index.vue';

// vue2 全局注册组件,直接调用构造函数静态方法,所有 Vue 实例可用
Vue.component('HButton', HButton)

// vue2 全局自定义指令,直接调用构造函数静态方法,所有 Vue 实例可用
Vue.directive('focus', {
	inserted(el, binding) {
		// 在元素插入到 DOM 后自动获取焦点
		el.focus();
	},
});

// 挂载全局变量
Vue.prototype.$axios = axios;

// vue2 注册插件,调用对象 install 方法,若为函数则直接调用。参数一: Vue, 参数二: options
Vue.use ( ElementUI , {
	size : 'small' ,
	zIndex : 3000 ,
} );
Vue.use(VueRouter);

// 创建路由对象
const router = new VueRouter({
	routes,
});

// 路由全局前置守卫
router.beforeEach ( ( to , from , next ) => {
	next();
} );


// 创建vue实例
const vm = new Vue ( {
	data:{
		isRoot:true
	},
	router ,
	store ,
	mounted(){
		console.log(this.$options)
	},
	render : ( h ) => h ( App ) ,
} ).$mount ( '#app' );