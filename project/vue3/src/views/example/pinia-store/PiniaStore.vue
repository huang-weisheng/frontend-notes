<script setup lang="ts">
	import { ElButton,ElTag,ElMessage } from 'element-plus';
	import {useCounterStore} from '@/store/store';
	
	//可访问store中所有(state , getters, actions 中)的数据 ✨
	const store=useCounterStore();
	//访问store
	function accessStore() {
		store.count++;
		ElMessage.success(`doubleCount:${store.doubleCount}`);
		store.requestImage();
		store.accessBranchStore();
	}

	//用一个 state 的补丁对象在同一时间更改多个属性：
	function patchByObject() {
		store.$patch({
			count: store.count+1,
		});
	}

	//$patch 方法也接受一个函数来组合这种难以用补丁对象实现的变更。
	function patchByFunction() {
		store.$patch((state) => {
			state.count++;
		});
	}

	//你可以通过 store 的 $subscribe() 方法侦听 state 及其变化, patch 后只触发一次
	store.$subscribe((mutation,state) => {
		//监听触发的原因 'direct' | 'patch object' | 'patch function'
		ElMessage.success(`store is changed by ${mutation.type}`);
		// 当 mutation.type 为 'patch object'时,传递给 store.$patch() 的补丁对象。
		if(mutation.type==='patch object') {
			ElMessage.success(`patch object:${JSON.stringify(mutation.payload)}`);
		}
	});
</script>

<template>
	<fieldset>
		<el-tag type="danger">
			<h3>pinia</h3>
		</el-tag>
		<p>
			<el-button type="primary" @click="accessStore()">accessStore</el-button>
			<el-button type="primary" @click="patchByObject()">patchByObject</el-button>
			<el-button type="primary" @click="patchByFunction()">patchByFunction</el-button>
		</p>
		<span>count is:{{store.count}}</span>
	</fieldset>

</template>

<style scoped>
	fieldset {
		display: flex;
		align-items: center;
	}
</style>
