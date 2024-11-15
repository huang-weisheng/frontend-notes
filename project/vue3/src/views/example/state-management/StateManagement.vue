<script setup lang="ts">
	defineOptions({
		name:'StateManagement'
	})
	import { ElButton,ElTag } from 'element-plus';
	import {useTemplateRef} from 'vue';
	import StateA from './StateA.vue';
	import StateB from './StateB.vue';
	const stateA=useTemplateRef<InstanceType<typeof StateA>|null>('A');
	const stateB=useTemplateRef<InstanceType<typeof StateB>|null>('B');

	const incrementA=() => {
		stateA.value&&stateA.value.increment();
	};
	const incrementB=() => {
		stateB.value&&stateB.value.increment();
	};
</script>
<template>
	<fieldset>
		<el-tag type="danger">
			<h3>状态管理</h3>
		</el-tag>
		<el-button type="warning" @click="incrementA">+1</el-button>
		<StateA ref="A"></StateA>
		<el-button type="success" @click="incrementB">+1</el-button>
		<StateB ref="B"></StateB>
	</fieldset>

</template>
<style></style>
