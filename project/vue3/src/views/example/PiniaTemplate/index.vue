<script setup lang="ts">
	import { ElButton,ElTag } from 'element-plus';
	import {useCounterStore} from '@/store/pinia';
	//可以在组件中的任意位置访问 `store` 变量 ✨
	//可访问store中所有(state , getters, actions 中)的数据
	const store=useCounterStore();
	//你可以通过 store 实例访问 state，直接对其进行读写。
	function directIncrement() {
		store.count++;
	}
	//调用store action，
	function storeIncrement() {
		store.increment();
	}
	//访问 getters
	const accessGetter=() => {
		console.log(store.otherGetter);
	};
	//调用store asyncAction，
	function asyncAction() {
		store.requestImage();
	}
	//用一个 state 的补丁对象在同一时间更改多个属性：
	function patchStoreByObj() {
		store.$patch({
			count: store.count+1,
			name: store.name+store.count+1
		});
	}
	//$patch 方法也接受一个函数来组合这种难以用补丁对象实现的变更。
	function patchStoreByFunc() {
		store.$patch((state) => {
			state.count++;
			store.name=store.name+store.count;
		});
	}

	//你可以通过 store 的 $subscribe() 方法侦听 state 及其变化,
	//比起普通的 watch()，使用 $subscribe() 的好处是 subscriptions 在 patch 后只触发一次
	store.$subscribe((mutation,state) => {

		//监听触发的原因 'direct' | 'patch object' | 'patch function'
		console.log(mutation.type);

		//defineStore的第一个参数, 和store.$id 一样  counter
		console.log(mutation.storeId,store.$id);

		// 当 mutation.type 为 'patch object'时,传递给 store.$patch() 的补丁对象。
		if(mutation.type==='patch object') {
			console.log(mutation.payload);
		}
		// todo....
	});

	//选项式API写法中你可以通过调用 store 的 $reset() 方法将 state 重置为初始值。
	function reset() {
		store.$reset();
	}
</script>

<template>
	<fieldset>
		<legend>
			<el-tag type="danger">
				<h2>pinia</h2>
			</el-tag>
		</legend>
		<p>
			<el-button type="primary" @click="directIncrement()">directIncrement</el-button>
			<el-button type="primary" @click="storeIncrement()">storeIncrement</el-button>
			<el-button type="primary" @click="accessGetter()">accessGetter</el-button>
			<el-button type="primary" @click="patchStoreByObj()">patchStoreByObj</el-button>
			<el-button type="primary" @click="patchStoreByFunc()">patchStoreByFunc</el-button>
			<el-button type="primary" @click="asyncAction()">asyncAction</el-button>
			<el-button type="primary" @click="reset()">resetStore</el-button>
		</p>
		<span>count is:{{store.count}}</span>
	</fieldset>

</template>

<style scoped></style>
