<script setup lang="ts">
	import {useCount} from './store.js';
	import { ElTag } from 'element-plus';
	const {globalState,localState,increment}=useCount();
	defineExpose({
		increment
	});
</script>
<template>
	<el-tag type="success">local:{{localState.count}}</el-tag>
	<el-tag type="primary">global:{{globalState.count}}</el-tag>
</template>
