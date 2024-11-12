<script setup lang="ts">
	// 定义组件名
	defineOptions({
		name: 'RouterB'
	});
	import {useRouter,useRoute} from 'vue-router';
	import { ElButton } from 'element-plus';
	const router=useRouter();
	const route=useRoute();
	const print=() => {
		console.log(route);
		console.log(router);
	};
</script>
<template>
	<span>routerB</span>
	<el-button type="primary" @click="print">printRouteInfo</el-button>
</template>
