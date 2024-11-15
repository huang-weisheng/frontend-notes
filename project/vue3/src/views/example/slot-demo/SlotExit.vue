<script setup lang="ts">
	//useSlots()===defineSlots();表示父组件传递的插槽,TS中建议使用 defineSlots
	const slots=defineSlots<{
		default(props: {}): any;
		content(props: {message:string}): any;
	}>()
</script>
<template>
	<div>
		<!-- name 属性不写默认为 default-->
		<slot name="default"></slot>
		<!-- name:接收插槽的插槽名;可通过v-bind:向插槽传递属性-->
		<slot name="content" :message="'插槽出口传递的内容'"></slot>
	</div>
</template>
