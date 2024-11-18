import App from '@/App.vue';
import i18nPlugin from '@/plugins/i18n';
import EInput from '@/components/global/ExtendedInput.vue';
import router from '@/router/router';
import {globalProvideObjKey} from '@/types/provideInject';
import {createPinia} from 'pinia';
import {createApp,ref} from 'vue';
//引入全局样式
import './styles/global.css';

// 引入vite插件
import { buildTime, author } from 'virtual:build-info';
console.log(`构建时间：${buildTime}，作者：${author}`)


//创建应用实例
const app=createApp(App);

//vue插件可以是一个拥有 install() 方法的对象或一个函数。应用实例和options作为参数传递
app.use(i18nPlugin,{
	hello: '你好'
})

//全局注册组件
app.component('EButton', EInput);

// 全局注册自定义指令
app.directive('focus',{
	mounted: (el,binding,vnode,prevVnode) => el.focus()
});

//为应用添加路由
app.use(router);

//为应用添加pinia
app.use(createPinia());

//全局提供依赖
app.provide(globalProvideObjKey,{
	globalProvideNum: ref(0),
	update() {this.globalProvideNum.value=Math.ceil(Math.random()*99)}
});   

//将应用实例挂载到#app元素上, mount 方法应该始终在整个应用配置和资源注册完成后被调用。
app.mount('#app');



