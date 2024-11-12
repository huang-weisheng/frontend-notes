<script setup lang="ts">
	import {ref,type ObjectDirective,type DirectiveHook} from 'vue';
	import { ElButton,ElTag } from 'element-plus';
	/**
	 * el：指令绑定到的元素。这可以用于直接操作 DOM。
	 * binding：一个对象 包含指令值,指令参数,修饰符等信息
	 * vnode：代表绑定元素的底层 VNode。
	 * prevVnode：代表之前的渲染中指令所绑定元素的 VNode。仅在 beforeUpdate 和 updated 钩子中可用。
	 * */

	const color=ref('red');
	const max=ref('arg');
	const changeColor=() => {
		color.value=color.value==='green'? 'red':'green'
	}
	//在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令
	const vColor: DirectiveHook=(el,binding) => {
		// 这会在 `mounted` 和 `updated` 时都调用
		el.style.color=binding.value;
	};

	//没有使用 <script setup> 的写法
	// export default {
	// 	setup() {
	// 		/*...*/
	// 	},
	// 	directives: {
	// 		// 在模板中启用 v-focus
	// 		focus: {
	// 			/* ... */
	// 		}
	// 	}
	// }

	//一个指令的定义对象可以提供几种钩子函数 (都是可选的)：
	const vRandom: ObjectDirective={
		// 在绑定元素的 attribute 前
		// 或事件监听器应用前调用
		created(el,binding,vnode,prevVnode) {
			el.value=Math.random()*10000;
		},
		// 在元素被插入到 DOM 前调用
		beforeMount(el,binding: {},vnode,prevVnode) {

		},

		// 在绑定元素的父组件
		// 及他自己的所有子节点都挂载完成后调用
		mounted(el,binding,vnode,prevVnode) {},

		// 绑定元素的父组件更新前调用
		beforeUpdate(el,binding,vnode,prevVnode) {},

		// 在绑定元素的父组件
		// 及他自己的所有子节点都更新后调用
		updated(el,binding,vnode,prevVnode) {},

		// 绑定元素的父组件卸载前调用
		beforeUnmount(el,binding,vnode,prevVnode) {},

		// 绑定元素的父组件卸载后调用
		unmounted(el,binding,vnode,prevVnode) {},
	};
</script>

<template>
	<fieldset>
		<legend>
			<el-tag type="danger">
				<h2>Directive</h2>
			</el-tag>
			<el-button @click="changeColor" type="primary">改变颜色</el-button>
		</legend>
		<!-- v-random:指令名; max:指令参数; a,b:修饰符; {num: 1000}:指令值 -->
		<input v-random:[max].a.b="{num: 1000}" v-color="color" />
	</fieldset>

</template>
