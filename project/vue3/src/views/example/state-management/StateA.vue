<script setup lang="ts">
	import {useCount} from './store.js';
	import { ElTag } from 'element-plus';
	const {globalState,localState,increment}=useCount();
	defineExpose({
		increment
	})
</script>
<template>
	<el-tag type="warning">local:{{localState.count}}</el-tag>
	<el-tag type="primary">global:{{globalState.count}}</el-tag>
</template>
<style scoped>
</style>
