<script setup lang="ts">
	import { ElButton,ElTag } from 'element-plus';
	import {useTemplateRef,watchEffect} from 'vue';
	import ExampleSon from './ExamplePropsEmitsSon.vue';

	//useTemplateRef 传入ref属性值,获取组件或元素的模板引用
	const inputRef=useTemplateRef<InstanceType<typeof ExampleSon>|null>('inputRef');

	//访问并修改子组件中通过defineExpose暴露的数据
	function modifyInputValue() {
		if(inputRef.value) {
			inputRef.value.sonInputValue='子组件数据修改成功';
		} else {
			console.log('子组件还未初始化');
		}
	}
	//只可以在组件挂载后才能访问模板引用。因为在初次渲染前这个元素还不存在
	watchEffect(() => {
		if(inputRef.value) {
			//组件加载完成,可以访问组件上的属性
		}
		else {
			// 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
		}
	});
	const sonInput=(param: string) => {
		console.log(param);
	};
</script>

<template>
	<fieldset>
		<el-tag type="danger"><h3>TmpRef-Props-Emits</h3></el-tag>
		<el-button @click="modifyInputValue" type="primary">修改输入框</el-button>
		<example-son ref="inputRef" :gift="'苹果'" @sonInput="sonInput"></example-son>
	</fieldset>

</template>

<style scoped>
	fieldset {
		display: flex;
	}
</style>
