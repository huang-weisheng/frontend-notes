import {createRouter,createWebHistory,createWebHashHistory} from 'vue-router';
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
					path: 'example',
					component:() => import('@/views/example/example.vue'),
					children: [
						{
							path: 'RouteA:id',
							name: 'RouteA',
							component: () => import('@/views/example/RouterVue/RouteA.vue'),
							meta: {route: 'AAA'}
						},
						{
							path: 'RouteB:id',
							name: 'RouteB',
							component: () => import('@/views/example/RouterVue/RouteB.vue'),
							meta: {route: 'BBB'},
						}
					],
				},
				{
					path: 'test',
					component: () => import('@/views/test/test-main.vue')
				}
			],
			redirect: '/example'
		},
	]
});

//全局路由前置守卫		
router.beforeEach((to,from,next)=> {
	next();
});

//全局路由后置守卫
router.afterEach((to,from) => {});

//全局路由错误守卫
router.onError((error) => {
	console.log('路由错误守卫',error);
});

export default router;
