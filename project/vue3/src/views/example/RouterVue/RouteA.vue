<script setup lang="ts">
	defineOptions({
		name:'RouterA'
	})
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
	<span>routerA</span>
	<el-button type="primary" @click="print">printRouteInfo</el-button>
</template>
