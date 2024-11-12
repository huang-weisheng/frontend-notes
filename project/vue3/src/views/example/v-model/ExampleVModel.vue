<script setup lang="ts">
	defineOptions({
		name:'VModel'
	})
	import {ref} from 'vue';
	import ExampleChild from './ExampleVModelSon.vue';
	import { ElButton,ElTag } from 'element-plus';
	let color=ref('颜色');
	let num=ref('数字');
	let str=ref('文字');
</script>

<template>
	<fieldset>
		<legend>
			<el-tag type="danger">
				<h3>VModel</h3>
			</el-tag>
			<el-button type="primary" @click="color='颜色'">colorReset</el-button>
			<el-button type="primary" @click="num='数字'">numReset</el-button>
			<el-button type="primary" @click="str='文字'">strReset</el-button>
		</legend>
		<!-- text(指令参数):据此接收绑定,capitalize(修饰符):传递给组件;str(指令值):绑定的数据 -->
		<example-child v-model="color" v-model:count="num" v-model:text.capitalize="str"></example-child>
	</fieldset>

</template>

<style scoped>
	input {
		width: 100px;
	}
</style>
