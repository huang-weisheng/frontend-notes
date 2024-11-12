<script setup lang="ts">
	import {useCount} from './store.js';
	import { ElTag } from 'element-plus';
	const {globalCount,localCount,increment}=useCount();
	defineExpose({
		increment
	});
</script>
<template>
	<el-tag type="warning">localB:{{localCount}}</el-tag>
	<el-tag type="warning">B-global:{{globalCount}}</el-tag>
</template>
