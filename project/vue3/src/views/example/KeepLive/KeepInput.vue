<script setup lang="ts">
	import {ref} from 'vue';
	import { ElInput } from 'element-plus';
	let inputValue=ref('这是个输入框');
</script>

<template>
	<div>
		<el-input v-model="inputValue"></el-input>
	</div>
</template>

<style scoped></style>
