<script setup lang="ts">
	import {ElInput,ElTag} from 'element-plus';
	import { ref } from 'vue';

	// defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props
	const props=withDefaults(
		defineProps<{
			gift?: '苹果' | '香蕉' | '橘子' | '葡萄' | '梨' | '西瓜';
		}>(),
		{
			gift: '苹果',
		}
	);

	// js语法,运行时检查
	// const props=defineProps({
	// 	gift: {
	// 		type: String,
	// 		required: true,
	// 		//类型校验函数, 在 3.4+ 中完整的 props 作为第二个参数传入
	// 		validator(value,allProps) {
	// 			return ['success','warning','苹果',value].includes(value);
	// 		},
	// 	},
	// })

	//defineEmits 声明事件,并为参数类型进行约束
	const emit=defineEmits<{
		sonInput: [value: string];
	}>();

	// js语法,运行时检查
	// const emit=defineEmits({
	// 	sonInput(param: string) {
	// 		//返回 `true` 或 `false`表明验证通过或失败,类型不符合,将会在控制台提醒
	// 		return param.length<5;
	// 	},
	// });

	//使用声明的 emit 触发事件
	const send = () => emit('sonInput', inputValue.value);
	
	const inputValue=ref('');
</script>

<template>	
	<span>子组件:</span>
	<el-tag style="margin:0 10px;">gift: {{ props.gift }}</el-tag>
	<el-input @input="send" v-model="inputValue"></el-input>
</template>
<style>

</style>
