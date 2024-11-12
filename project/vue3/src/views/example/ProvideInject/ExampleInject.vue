<script setup lang="ts">
	import { ElTag,ElButton } from 'element-plus';
	import {inject} from 'vue';
	import {localProvide,LocalReadonlyProvide} from './provideKey'
	//接收局部提供的依赖
	const localObj=inject(localProvide);
	//接收局部提供的只读依赖
	const readOnlyObj=inject(LocalReadonlyProvide);
	const modifyLocal=() => {
		if(localObj) {
			//以下方式均无法更改.因为该provide不允许注入方修改
			localObj.num=Math.ceil(Math.random()*99);
		}
	}
	const modifyLocalReadOnlyNum=() => {
		if(readOnlyObj) {
			//以下方式均无法更改.因为该provide不允许注入方修改
			readOnlyObj.num=99
			readOnlyObj.update()
		}
	}
</script>
<template>
	<!-- 这里是响应式 -->
	<el-tag>local:{{localObj?.num}}</el-tag>
	<el-tag>localReadOnly:{{readOnlyObj?.num}}</el-tag>
	<el-button @click="modifyLocal">modifyLocal</el-button>
	<el-button @click="modifyLocalReadOnlyNum">modifyLocalReadOnlyNum</el-button>
</template>
