<script setup lang="ts">
	import { ElButton, ElMessage } from 'element-plus';
	/* defineModel 是一个便利宏。编译器将其展开为以下内容：
	
	一个名为 modelValue 的 prop，本地 ref 的值与其同步；	
	一个名为 update:modelValue 的事件，当本地 ref 的值发生变更时触发。 */

	// 同步无指令参数的 v-model
	const color = defineModel<string>();

	// 同步指令参数为 textArg 的 v-model,带有自定义修饰符 capitalize
	const [text, modifiers] = defineModel<string>('textArg', {
		// 父组件必须提供
		required: true,

		// 提供一个默认值,若父组件未提供,则不会同步
		// default: 'abc',

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
		color.value = `color${Math.ceil(Math.random()*100)}`;
		text.value = `text${Math.ceil(Math.random()*100)}`;
	}
</script>

<template>
	<el-button type="primary" @click="update">子组件更新</el-button>
	<input v-model="color" placeholder="color" readonly>
	<input v-model="text" placeholder="text" readonly>
</template>
<style scoped>
	input {
		width: 100px;
	}
</style>
