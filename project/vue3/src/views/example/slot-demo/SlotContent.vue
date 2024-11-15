<script setup lang="ts">
	import VSlot from './SlotExit.vue';
	import { ElTag,ElText } from 'element-plus';
</script>
<template>
	<fieldset>
		<el-tag type="danger">
			<h3>插槽</h3>
		</el-tag>
		<v-slot>
			<!-- 未写插槽名,则使用默认值 default -->
			<template #>
				<el-text type="primary">#default:插槽内容</el-text>
			</template>
			<!--'H':插槽名(可选),默认为'default',scope:(可选) 插槽出口传来的属性 -->
			<template #['content']="scope">
				<el-text type="success">#content:{{ scope.message }}</el-text>
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