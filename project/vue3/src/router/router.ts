import {createRouter,createWebHistory,createWebHashHistory} from 'vue-router';
import exampleRoutes from './example';

const router=createRouter({
	//使用history模式,import.meta.env.BASE_URL 为部署应用时的基本 URL,由 base 配置项决定。
	history: createWebHistory(import.meta.env.BASE_URL),

	//使用hash模式
	// history: createWebHashHistory(),

	//滚动行为
	scrollBehavior(to, from, savedPosition) {
		//模拟 “滚动到锚点” 的行为：
		if (to.hash) {
			//返回promise延迟滚动,当有路由过渡效果时要注意是否可以获取到元素
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve({ 
						el: to.hash,
						//平滑滚动
						behavior: 'smooth',
						//相对偏移
						top: 100,
						left: 0,
					});
				}, 500);
			})
		};
		//也可以直接返回一个对象,
		return {
			// 跳转到的元素
			el:'#app',
			// 相对于该元素的偏移
			left: 0,
			top: 0,
			behavior: 'smooth',
		};
	},
	routes: [
		{
			path: '/',
			children: [
				{
					path: 'test',
					component: () => import('@/views/test/test-main.vue')
				}
			],
			redirect: '/example'
		},
		exampleRoutes,
		// 将匹配所有内容并将其放在 `route.params.pathMatch` 下
		{ path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/error/404.vue') },
	]
});

//全局路由前置守卫		
router.beforeEach((to,from,next)=> {
	next();
});
//全局路由解析守卫,导航被确认之前、所有组件内守卫和异步路由组件被解析之后调用。
router.beforeResolve((to,from,next)=> {
	next();
});
//全局路由后置守卫
router.afterEach((to,from) => {});
//全局路由错误守卫
router.onError((error) => {
	console.log('路由错误守卫',error);
});

export default router;
