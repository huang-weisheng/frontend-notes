<script setup lang="ts">
	import { ElButton, ElMessage } from 'element-plus';
	// defineModel 是一个便利宏。编译器将其展开为以下内容：
	// 一个名为其参数的 prop，默认为: modelValue ; 本地 ref 值与其同步,
	// 一个名为 update: <defineModel参数> 的事件，当本地 ref 值发生变更时触发。 

	// 绑定默认指令参数的 v-model,modelValue为默认值可以不写;
	const num = defineModel<number>('modelValue');
	// 绑定指令参数为 textArg 的 v-model,带有自定义修饰符 capitalize
	const [text, modifiers] = defineModel<string>('textArg', {
		// 父组件必须提供
		required: true,
		// 提供一个默认值,若父组件未提供,则不会同步
		default: 'aaa',
		// 子组件修改 text 时触发,父组件修改不触发
		set(value) {
			if (modifiers.upperCase) {
				//首字母大写
				ElMessage.success('text字母转为大写');
				return value.toUpperCase();
			}
			return value;
		},
		// 子组件或父组件访问 text 时触发
		get(val) {
			return val;
		}
	});

	function update() {
		num.value = Math.ceil(Math.random() * 100)
		text.value = `text${Math.ceil(Math.random() * 100)}`;
	}
</script>

<template>
	<el-button type="primary" @click="update">子组件更新</el-button>
	<input v-model="num" placeholder="color" readonly>
	<input v-model="text" placeholder="text" readonly>
</template>
<style scoped>
	input {
		width: 100px;
	}
</style>
