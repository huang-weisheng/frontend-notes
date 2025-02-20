<script setup lang="ts">
	defineOptions({
		name: 'LessUsage',//组件名称
		inheritAttrs: false,//禁用属性继承,class style id 等
	})
	import {getCurrentInstance,ref,toRefs, useAttrs, useSlots} from 'vue';
	import { ElButton,ElTag } from 'element-plus';

	//useSlots 获取传递给组件的插槽
	const slots=useSlots();

	//响应式解构
	const obj=ref({num: 10000});
	const {num}=toRefs(obj.value);
	console.log(num.value)

	//获取当前组件实例
	const instance=getCurrentInstance();
</script>
<template>
	<fieldset>
		<legend>
			<el-tag type="danger">
				<h2>响应式：{{num}}</h2>
			</el-tag>
		</legend>
		<el-button @click="console.log(instance)">
			打印this
		</el-button>
	</fieldset>
</template>
