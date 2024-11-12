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
				name: 'AAA'
			},
			params: {id: 'AAA'}
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
		<legend>
			<el-tag type="danger">
				<h2>router</h2>
			</el-tag>
			<el-button type="primary" @click="pushToB">RouteB</el-button>
			<el-button type="primary" @click="pushToA">RouteA</el-button>
		</legend>
		<router-view></router-view>
	</fieldset>
</template>
