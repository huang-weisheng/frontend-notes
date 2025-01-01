<script setup lang="ts">
	import { useRouter, useRoute } from 'vue-router';
	import { ElButton, ElTag, ElDropdown, ElDropdownMenu, ElMessage } from 'element-plus';
	const router = useRouter();
	const route = useRoute();
	// 跳转到路由A(通过 name )
	const goToRouteA = () => {
		router.push({
			name: 'RouteA',
			//通过query传参
			query: {
				name: 'hyx'
			},
			//必须在定义路由路径时加上参数才能使用params传参
			params: { userId: '123456' },
			//通过hash滚动到锚点
			hash: '#route-scroll-1'
		});
	};
	//跳转到路由B(通过 path ),通过 path 跳转不能使用 params 传参
	const goToRouteB = () => {
		if (router.hasRoute('RouteB')) {
			return router.push({
				path: '/example/RouteB',
				query: {
					name: 'hyx'
				}
			});
		};
		ElMessage.error('路由B不存在');
	};
	//取代当前路由记录,不增加新的历史记录
	const replaceToExample = () => {
		router.replace({ name: 'example' });
	};
	//前进或后退多少步
	const go = (step: number) => {
		router.go(step);
	};
	//当前实时路由信息,当前是哪个组件就打印哪个组件的信息
	const printRouteInfo = () => console.log(route);
	//获取路由实例
	const printRouter = () => console.log(router);
	//获取所有路由配置
	const getRoutes = () => console.log(router.getRoutes());
	//添加路由B到 example 路由下
	const addRouteB = () => {
		if (router.hasRoute('RouteB')) {
			return ElMessage.error('RouteB已存在');
		}
		router.addRoute('example', {
			path: 'RouteB',
			name: 'RouteB',
			component: () => import('@/views/example/vue-router/RouteB.vue')
		});
		ElMessage.success('添加路由B成功');
	};
	//删除路由B
	const removeRouteB = () => {
		if (router.hasRoute('RouteB')) {
			router.removeRoute('RouteB');
			return ElMessage.success('删除路由B成功');
		}
		ElMessage.error('路由B不存在');
	};
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
					<el-button type="success" @click="goToRouteB">RouteB(动态路由)</el-button>
				</el-dropdown-menu>
				<el-dropdown-menu>
					<el-button type="success" @click="replaceToExample">Example(replace跳转)</el-button>
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
			<el-button type="primary">动态路由</el-button>
			<template #dropdown>
				<el-dropdown-menu>
					<el-button type="success" @click="addRouteB">添加路由B至example</el-button>
				</el-dropdown-menu>
				<el-dropdown-menu>
					<el-button type="success" @click="goToRouteB">跳转到RouteB</el-button>
				</el-dropdown-menu>
				<el-dropdown-menu>
					<el-button type="success" @click="removeRouteB">删除路由B</el-button>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<!-- 使用 v-slot 获取组件 -->
		<router-view v-slot="{ Component }">
			<transition name="slide-right" mode="out-in">
				<component :is="Component" />
			</transition>
		</router-view>
	</fieldset>
</template>
<style>

	.slide-right-enter-active,
	.slide-right-leave-active {
		transition: all 0.5s ease;
	}

	.slide-right-enter-from {
		opacity: 0;
		transform: translateX(-50px);
	}

	.slide-right-leave-to {
		opacity: 0;
		transform: translateX(50px);
	}
</style>