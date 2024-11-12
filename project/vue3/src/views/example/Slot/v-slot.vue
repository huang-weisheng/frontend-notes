<script setup lang="ts">
	import {useSlots} from "vue";

	//useSlots()===defineSlots();表示父组件传递的插槽,TS中建议使用 defineSlots
	const slotAll=useSlots();
	const slots=defineSlots<{
		default(props: {}): any;
		H(props: {message:string}): any;
	}>()
</script>
<template>
	<div>
		<!--name 属性不写默认为 default-->
		<slot>
			<!-- 若未提供对应插槽则显示默认	的数据 -->
			default
		</slot>
		<!-- name:接收插槽的插槽名;可通过v-bind:向插槽传递属性-->
		<slot name="H" :message="'马杀鸡'">
			<!-- 若未提供插槽内容则显示默认	的数据 -->
			暂无数据
		</slot>
	</div>
</template>
