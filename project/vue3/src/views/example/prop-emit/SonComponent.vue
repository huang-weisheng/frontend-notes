<script setup lang="ts">
	import { ElInput, ElTag, ElButton } from 'element-plus';
	import { ref, useAttrs } from 'vue';

	// useAttrs 获取没有被显式接收的 props 和 emits; 等于 $attrs
	const attrs = useAttrs();
	const printAttrs = () => {	console.log(attrs);	};

	// defineProps 会返回一个对象，其中包含了可以传递给组件的所有 props

	// const props1 = defineProps(['foo', 'bar']);

	// const props2 = defineProps({
	// 	foo: { type: String, required: true },
	// 	bar: Number
	// });

	const props = withDefaults(
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
	const emit = defineEmits<{
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

	const inputValue = ref('');
</script>

<template>
	<span>子组件:</span>
	<el-tag style="margin:0 10px;">gift: {{ props.gift }}</el-tag>
	<el-input @input="send" v-model="inputValue"></el-input>
	<!-- 多根组件时须显式使用一个组件绑定 $attrs,否则会抛出警告  -->
	<!-- v-bind 会绑定所有继承的属性和事件 -->
	<el-button @click="printAttrs" v-bind="$attrs" type="primary">printAttrs</el-button>
</template>
<style></style>
