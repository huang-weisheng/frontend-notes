<script setup lang="ts">
	import {onActivated,onDeactivated,ref} from 'vue';
	import { ElTag } from 'element-plus';
	let divContent=ref('可编辑DIV');
	onActivated(() => {
		//console.log ( 'div加载' )
	});

	onDeactivated(() => {
		//console.log ( 'div卸载' )
	});
</script>

<template>
	<div contenteditable="true" style="border: 1px solid #1cd;">{{divContent}}</div>
</template>

<style  scoped>
	div {
		height: 25px;
		overflow: auto
	}
</style>
