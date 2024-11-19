<script setup lang="ts">
	import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
	import { ElButton } from 'element-plus';
	const router = useRouter();
	const route = useRoute();
	const print = () => {
		console.log(route);
		console.log(router);
	};
	onBeforeRouteLeave((to, from) => {
		console.log('RouteA onBeforeRouteLeave');
	});
	onBeforeRouteUpdate((to, from) => {
		console.log('RouteA onBeforeRouteUpdate');
	});
</script>
<template>
	<span>routerA</span>
	<el-button type="primary" @click="print">printRouteInfo</el-button>
</template>
