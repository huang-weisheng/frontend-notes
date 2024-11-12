<script setup lang="ts">
	import {useCount} from './store.js';
	import { ElTag } from 'element-plus';
	const {globalCount,localCount,increment}=useCount();
	defineExpose({
		increment
	})
</script>
<template>
	<el-tag>localA:{{localCount}}</el-tag>
	<el-tag>A-global:{{globalCount}}</el-tag>
</template>
<style scoped>
</style>
