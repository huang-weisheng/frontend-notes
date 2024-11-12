
<script setup lang="ts">
	defineOptions({
		name:'ComposableFunction'
	})
	import { ElButton,ElTag } from 'element-plus';
	import {ref} from 'vue';
	import {useMouse} from './mouse.js';
	import {useFetch} from './fetch.js';
	
	//每一个调用 useMouse() 的组件实例会创建其独有的 x、y 状态拷贝，因此他们不会互相影响。
	const {x,y}=useMouse();

	const url=ref('url');
	//在 url 改变时将重新 fetch
	const {data,error}=useFetch(url);

	const changeUrl = () =>	{
		url.value = Math.random().toFixed();
	}
</script>
<template>
	<fieldset>
		<legend>
			<el-tag type="danger">
				<h3>
					ComposableFunction
				</h3>
			</el-tag>
			<el-button type="primary" @click=" changeUrl ">发起请求</el-button>
		</legend>
		Mouse position is at: {{x}}, {{y}}
		<span v-if="error">error: {{error}}</span>
		<span v-else-if="data"> Data:{{data}} </span>
		<span v-else>Loading...</span>
	</fieldset>

</template>
