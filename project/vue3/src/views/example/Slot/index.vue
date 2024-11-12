<script setup lang="ts">
	defineOptions({
		name:'Slot'
	})
	import VSlot from './v-slot.vue';
	import { ElTag } from 'element-plus';
</script>
<template>

	<fieldset>
		<legend>
			<el-tag type="danger">
				<h2>Slot</h2>
			</el-tag>
		</legend>
		<v-slot>
			<!-- v-slot:声明插槽,对应的简写 # -->
			<!-- 未写插槽名,则使用默认值 default -->
			<template #>
				<span>###</span>
			</template>
			<!--'H':插槽名(可选),默认为'default',scope:(可选) 插槽出口传来的属性 -->
			<template #['H']="scope">
				<span>{{ scope.message }}</span>
			</template>
		</v-slot>
	</fieldset>

</template>
