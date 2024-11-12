<script setup lang="ts">
	import {ref} from 'vue';
	import { ElInput } from 'element-plus';

	// defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props
	const props=withDefaults(
		defineProps<{
			gift: '苹果'|'香蕉'|'橘子';
			money?: number;
		}>(),
		{
			money: 100,
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

	//defineEmits 宏声明它要触发的事件,并为触发事件的参数类型进行约束
	const emit=defineEmits<{
		sonInput: [id: string];
		update: [id: string];
	}>();

	// js语法,运行时检查
	// const emit=defineEmits({
	// 	sonInput(param: string) {
	// 		//返回 `true` 或 `false`表明验证通过或失败,类型不符合,将会在控制台提醒
	// 		return param.length<5;
	// 	},
	// });

	let sonInputValue=ref('');

	//使用声明的 emit 触发事件
	const send=() => emit('sonInput','子组件输入......');

	// setup 写法则必须使用defineExpose暴露属性才能被父组件模板引用拿到
	defineExpose({
		sonInputValue,
	});

</script>

<template>
	<div class="son">
		<span>gift: {{props.gift}};</span><span> money: {{props.money}}</span>
		<!--子组件可以通过调用内置的 $emit(或声明的 emit) 方法,通过传入事件名称来触发一个事件-->
		<el-input v-model="sonInputValue" @input="send"></el-input>
	</div>
</template>
<style>
	.son {
		display: flex;
		width: calc(100% - 100px);
		white-space: nowrap
	}
</style>
