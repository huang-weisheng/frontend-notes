<script setup lang="ts">
	import {ref} from 'vue';
	import { ElButton,ElTag,ElMessage } from 'element-plus';
	import CacheDiv from './CacheDiv.vue';
	import CacheInput from './CacheInput.vue';

	// 缓存组件
	let keepComponents={
		CacheDiv,
		CacheInput,
	};
	// 当前组件
	let currentComponents = ref<'CacheDiv' | 'CacheInput'>('CacheDiv');
	// 不缓存组件,根据组件name属性匹配
	let excludeComponents=ref<string[]>([]);
	// 取消缓存
	function cancelCache() {
		ElMessage.success('取消缓存');
		excludeComponents.value=['CacheDiv','CacheInput'];
	}
	// 清空不缓存组件列表
	function startCache() {
		ElMessage.success('开始缓存');
		excludeComponents.value=[];
	}
	// 切换组件
	function toogleComponent() {
		ElMessage.success('切换组件');
		currentComponents	.value = currentComponents.value==='CacheDiv'?'CacheInput':'CacheDiv';
	}
</script>
<template>
	<fieldset>
		<el-tag type="danger">
			<h3>缓存动态组件</h3>
		</el-tag>
		<el-button type="primary" @click="toogleComponent">切换组件</el-button>
		<el-button type="primary" @click="cancelCache">取消缓存</el-button>
		<el-button type="primary" @click="startCache">开始缓存</el-button>
		<!-- exclude:不缓存组件,也可使用include来声明缓存组件-->
		<keep-alive :exclude="excludeComponents">
			<component :is="keepComponents[currentComponents]"></component>
		</keep-alive>
	</fieldset>
</template>
<style scoped>
	fieldset {
		display: flex;
		align-items: center;
	}
</style>
