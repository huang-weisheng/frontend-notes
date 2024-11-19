<script setup lang="ts">
	defineOptions({
		name: 'Router'
	})
	import {useRouter} from 'vue-router';
	import { ElButton,ElTag } from 'element-plus';
	const router=useRouter();
	function pushToA() {
		router.push({
			name: 'RouteA',
			query: {
				query: 'AAA'
			},
			params: { params: 'AAA'}
		});
	}
	function pushToB() {
		router.push({
			name: 'RouteB',
			query: {
				name: 'BBB'
			},
			//必须在定义路由路径时加上参数才能使用params传参
			params: {id: 'BBB'}
		});
	}
</script>
<template>
	<fieldset>
		<el-tag type="danger">
			<h3>router</h3>
		</el-tag>
		<el-button type="primary" @click="pushToA">RouteA</el-button>
		<el-button type="primary" @click="pushToB">RouteB(命名视图)</el-button>
		<router-view></router-view>
		<router-view name="B1"></router-view>
		<router-view name="B2"></router-view>
	</fieldset>
</template>
