import type { RouteRecordRaw } from 'vue-router';

const exampleRoutes: RouteRecordRaw = {
    path: '/example',
    name: 'example',
    component: () => import('@/views/example/example.vue'),
    children: [
        {
            path: 'RouteA:id',
            name: 'RouteA',
            component: () => import('@/views/example/vue-router/RouteA.vue'),
            meta: { info: 'AAA' },
            // 路由独享守卫
            beforeEnter: (to, from) => {
                console.log('RouteA beforeEnter');
                // 返回 true 则继续导航，返回 false 则中断导航
                return true;
            },
        },
        {
            path: 'RouteB',
            name: 'RouteB',
            //利用命名视图同时显示多个路由组件
            components: {
                default: () => import('@/views/example/vue-router/RouteB.vue'),
                B1: () => import('@/views/example/vue-router/RouteB1.vue'),
            }
        }
    ],
};

export default exampleRoutes;
