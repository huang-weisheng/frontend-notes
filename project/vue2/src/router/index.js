import { routerModule } from './modules';

//取消跳转到当前路由报错
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push ( location ) {
// 	return originalPush.call ( this , location ).catch ( ( err ) => err );
// };

const routes = [
	{
		path : '/' ,
		name : '/' ,
		redirect: '/example' , 
	} ,
	{
		path: '/example',
		name: 'example',
		component: () => import('@/views/example/index.vue'),
		children: routerModule,
	},
];


export default routes;
