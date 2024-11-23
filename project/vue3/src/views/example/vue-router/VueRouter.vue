<script setup lang="ts">
	import { useRouter, useRoute } from 'vue-router';
	import { ElButton, ElTag, ElDropdown, ElDropdownMenu,ElMessage } from 'element-plus';
	const router = useRouter();
	const route = useRoute();
	//通过name跳转
	const goToRouteA = () => {
		router.push({
			name: 'RouteA',
			//通过query传参
			query: {
				name: 'AAA'
			},
			//必须在定义路由路径时加上参数才能使用params传参
			params: { id: 'AAA' },
			//通过hash滚动到锚点
			hash: '#route-scroll-1'
		});
	}
	//通过path跳转
	const goToRouteB = () => router.push({ path: '/example/RouteB' });
	//取代当前路由记录,不增加新的历史记录
	const replaceToExample = () => router.replace({ name: 'example' });
	//前进或后退多少步
	const go = (step: number) => router.go(step);
	//当前实时路由信息,当前是哪个组件就打印哪个组件的信息
	const printRouteInfo = () => console.log(route);
	//路由实例
	const printRouter = () => console.log(router);
	//添加路由C到example路由下
	const addRouteC = () => {
		router.addRoute('example', {
			path: 'RouteC',
			name: 'RouteC',
			component: () => import('@/views/example/vue-router/RouterC.vue')
		});
		ElMessage.success('添加路由C成功');
	}
	//跳转到路由C
	const goToRouteC = () => {
		if (router.hasRoute('RouteC')) {
			router.push({ name: 'RouteC' });
		} else {
			ElMessage.error('路由C不存在');
		}
	}
	//删除路由C
	const removeRouteC = () => {
		if (router.hasRoute('RouteC')) {
			router.removeRoute('RouteC');
			ElMessage.success('删除路由C成功');
		} else {
			ElMessage.error('路由C不存在');
		}	
	};
	//获取所有路由
	const getRoutes = () => console.log(router.getRoutes());
</script>
<template>
	<fieldset id="router-example">
		<el-tag type="danger">
			<h3>router</h3>
		</el-tag>
		<el-dropdown>
			<el-button type="primary">路由跳转</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-button type="success" @click="goToRouteA">RouteA(锚点)</el-button>
				</el-dropdown-menu>
				<el-dropdown-menu>
					<el-button type="success" @click="goToRouteB">RouteB(命名视图)</el-button>
				</el-dropdown-menu>
				<el-dropdown-menu>
					<el-button type="success" @click="replaceToExample">replaceToExample</el-button>
				</el-dropdown-menu>
				<el-dropdown-menu>
					<el-button type="success" @click="go(-1)">go(-1)</el-button>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<el-dropdown>
			<el-button type="primary">路由信息</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-button type="success" @click="printRouteInfo">当前路由信息</el-button>
				</el-dropdown-menu>
				<el-dropdown-menu>
					<el-button type="success" @click="printRouter">路由实例</el-button>
				</el-dropdown-menu>
				<el-dropdown-menu>
					<el-button type="success" @click="getRoutes">所有路由配置</el-button>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<el-dropdown>
			<el-button type="primary">
				动态路由
			</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-button type="success" @click="addRouteC">添加路由C至example</el-button>
				</el-dropdown-menu>
				<el-dropdown-menu>
					<el-button type="success" @click="goToRouteC">跳转到RouteC</el-button>
				</el-dropdown-menu>
				<el-dropdown-menu>
					<el-button type="success" @click="removeRouteC">删除路由C</el-button>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<!-- 使用name获取组件 -->
		<router-view name="B1"></router-view>
		<!-- 使用v-slot获取组件 -->
		<router-view v-slot="{ Component }">
			<transition name="slide-right" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</fieldset>
</template>
<style>
	/* 右滑动画 */
	.slide-right-enter-active,
	.slide-right-leave-active {
		transition: all 0.3s ease;
	}

	.slide-right-enter-from {
		opacity: 0;
		transform: translateX(-20px);
	}

	.slide-right-leave-to {
		opacity: 0;
		transform: translateX(20px);
	}
</style>