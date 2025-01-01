<script setup lang="ts">
	import {onActivated,onDeactivated,ref} from 'vue';
	import { ElInput,ElMessage } from 'element-plus';

	defineOptions({
		name: 'inputName',
	});

	let inputValue=ref('这是个输入框');

	onActivated(() => {
		ElMessage.success('Input===Activated');
	});

	onDeactivated(() => {
		ElMessage.warning('Input===Deactivated');
	});
</script>

<template>
	<div>
		<el-input v-model="inputValue"></el-input>
	</div>
</template>

<style scoped></style>
