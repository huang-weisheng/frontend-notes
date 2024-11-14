<script setup lang="ts">
	import { ref, type Directive } from 'vue';
	import { ElTag, ElInput } from 'element-plus';

	const important = ref('重要');

	//在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令
	//不推荐在组件上使用自定义指令,它会始终应用于组件的根节点
	const vTip: Directive = {
		/**
		 * el：指令绑定到的元素。这可以用于直接操作 DOM。
		 * binding：一个对象 包含指令值,指令参数,修饰符等信息
		 * vnode：代表绑定元素的底层 VNode。
		 * prevVnode：之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 中可用。
		 * */
		
		// 在绑定元素的 attribute 前 或事件监听器应用前调用
		created(el, binding, vnode, prevVnode) {
			const color = binding.modifiers.红色 ? '红色的' : '';//修饰符
			const bold = binding.modifiers.加粗 ? '加粗的' : '';//修饰符
			const degree = binding.arg ? binding.arg + '的' : '';//指令参数
			const text = binding.value.text;//指令值
			const placeholder = `${degree}${color}${bold}提示,内容为:${text}`;
			el.setAttribute('placeholder', placeholder);
		},
		// 在元素被插入到 DOM 前调用
		beforeMount(el, binding, vnode, prevVnode) {

		},
		// 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
		mounted(el, binding, vnode, prevVnode) { },

		// 绑定元素的父组件更新前调用
		beforeUpdate(el, binding, vnode, prevVnode) { },

		// 在绑定元素的父组件及他自己的所有子节点都更新后调用
		updated(el: HTMLElement, binding, vnode, prevVnode) { },

		// 绑定元素的父组件卸载前调用
		beforeUnmount(el, binding, vnode, prevVnode) { },

		// 绑定元素的父组件卸载后调用
		unmounted(el, binding, vnode, prevVnode) { },
	};
	//简写
	const vColor: Directive = (el, binding) => {
		// 这会在 `mounted` 和 `updated` 时都调用

	};
</script>

<template>
	<fieldset>
		<el-tag type="danger">
			<h3>自定义指令</h3>
		</el-tag>
		<!-- v-random:指令名; max:指令参数; a,b:修饰符; {num: 1000}:指令值 -->
		<input v-tip:[important].红色.加粗="{ text: '小提示' }" />
	</fieldset>
</template>
<style scoped>
	fieldset {
		display: flex;
		align-items: center;
		input {
			width: 300px;
		}
	}
</style>
