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
		<legend>
			<el-tag type="danger">
				<h2>状态管理</h2>
			</el-tag>
			<el-button type="primary" @click="incrementA">countA++</el-button>
			<el-button type="primary" @click="incrementB">countB++</el-button>
		</legend>
		<StateA ref="A"></StateA>
		<StateB ref="B"></StateB>
	</fieldset>

</template>
<style></style>
