<script setup lang="ts">
	import VSlot from './SlotExit.vue';
	import { ElTag,ElButton } from 'element-plus';
</script>
<template>
	<fieldset>
		<el-tag type="danger">
			<h3>插槽</h3>
		</el-tag>
		<v-slot>
			<!-- 未写插槽名,则使用默认值 default -->
			<template #>
				<el-button link type="primary">插槽内容</el-button>
			</template>
			<!--content:插槽名(可选),默认为'default',scope:(可选) 插槽出口传来的属性 -->
			<template #['content']="scope">
				<el-button link type="success" plain>来自:{{ scope.message }}</el-button>
			</template>
		</v-slot>
	</fieldset>

</template>
<style scoped>
fieldset{
	display: flex;
	align-items: center;
}
</style>