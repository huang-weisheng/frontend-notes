import type { RouteRecordRaw } from 'vue-router';

const exampleRoutes: RouteRecordRaw = {
    path: '/example',
    name: 'example',
    component: () => import('@/views/example/example.vue'),
    children: [
        {   
            // 路由路径
            path: 'RouteA:userId',
            // 路由名
            name: 'RouteA',
            // 通过 import 异步注册组件
            component: () => import('@/views/example/vue-router/RouteA.vue'),
            // 路由元信息
            meta: { info: '这是路由A的元信息噢' },
            // 路由独享守卫
            beforeEnter: (to, from) => {
                console.log('RouteA beforeEnter');
                // 返回 true 则继续导航，返回 false 则中断导航
                return true;
            },
        }
    ],
};

export default exampleRoutes;
