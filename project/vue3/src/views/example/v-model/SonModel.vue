<script setup lang="ts">
	import { ElButton } from 'element-plus';
	/* defineModel 是一个便利宏。编译器将其展开为以下内容：
	
	一个名为 modelValue 的 prop，本地 ref 的值与其同步；
	一个名为 update:modelValue 的事件，当本地 ref 的值发生变更时触发。 */

	//同步父组件没有指令参数的 v-model
	const color = defineModel<string>({ required: true });

	//声明count同步父组件指令参数的 count 的 v-model,提供一个默认值,若父组件未提供,则不会同步
	const count = defineModel<string>('count', { default: '0' });

	//声明 text同步父组件指令参数的 text 的 v-model,带有自定义修饰符 capitalize
	const [text, modifiers] = defineModel<string>('text', {
		// 这个 v-model:text 必须声明
		required: true,
		// 子组件修改 text 时触发,父组件修改不触发
		set(value) {
			if (modifiers.capitalize) {
				//首字母大写
				return value.charAt(0).toUpperCase() + value.slice(1);
			}
			return value;
		},
		// 子组件或父组件访问 text 时触发
		get(val) {
			return val;
		}
	});

	function update() {
		color.value = `color${Math.ceil(Math.random()*100)}`;
		count.value = `count${Math.ceil(Math.random()*100)}`;
		text.value = `text${Math.ceil(Math.random()*100)}`;
	}
</script>

<template>
	<el-button type="primary" @click="update">子组件更新</el-button>
	<input v-model="color" placeholder="color">
	<input v-model="count" placeholder="count">
	<input v-model="text" placeholder="text">
</template>
<style scoped>
	input {
		width: 100px;
	}
</style>
