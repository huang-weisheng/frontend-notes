import {createRouter,createWebHistory,createWebHashHistory} from 'vue-router';
import exampleRoutes from './example';

const router=createRouter({
	//使用history模式,import.meta.env.BASE_URL 为部署应用时的基本 URL,由 base 配置项决定。
	//history: createWebHistory(import.meta.env.BASE_URL),

	//使用hash模式
	history: createWebHashHistory(),

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
		exampleRoutes
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
