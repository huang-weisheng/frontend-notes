<script setup lang="ts">
	import {onActivated,onDeactivated,ref} from 'vue';
	import { ElMessage } from 'element-plus';
	let divContent=ref('可编辑DIV');

	onActivated(() => {
		ElMessage.success('Div===Activated');
	});

	onDeactivated(() => {
		ElMessage.warning('Div===Deactivated');
	});
</script>

<template>
	<div contenteditable="true">{{divContent}}</div>
</template>

<style  scoped>
	div {
		height: 25px;
		overflow: auto;
		border: 1px solid #1cd;
		width: 200px;
	}
</style>
