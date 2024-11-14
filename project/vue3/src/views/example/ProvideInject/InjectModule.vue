<script setup lang="ts">
	import { ElTag,ElButton,ElMessage } from 'element-plus';
	import {inject} from 'vue';
	import {localProvide,LocalReadonlyProvide} from './provideKey'
	//接收局部提供的依赖
	const LOCAL_INJECT=inject(localProvide);
	//接收局部提供的只读依赖
	const LOCAL_READONLY_INJECT=inject(LocalReadonlyProvide);
	const modifyLocal=() => {
		if(LOCAL_INJECT) {
			//以下方式均无法更改.因为该provide不允许注入方修改
			LOCAL_INJECT.localProvideNum=Math.ceil(Math.random()*99);
		}
	}
	const modifyLocalReadOnlyNum = () => {
		ElMessage.warning('只读注入无法修改')
		if(LOCAL_READONLY_INJECT) {
			//以下方式均无法更改.因为该provide不允许注入方修改
			LOCAL_READONLY_INJECT.localProvideNum=99
			LOCAL_READONLY_INJECT.update()
		}
	}
</script>
<template>
	<!-- 这里是响应式 -->
	<el-button @click="modifyLocal" type="primary">修改局部注入</el-button>
	<el-tag>local:{{LOCAL_INJECT?.localProvideNum}}</el-tag>
	<el-button @click="modifyLocalReadOnlyNum" type="primary">修改只读注入</el-button>
	<el-tag>localReadOnly:{{LOCAL_READONLY_INJECT?.localProvideNum}}</el-tag>
</template>
