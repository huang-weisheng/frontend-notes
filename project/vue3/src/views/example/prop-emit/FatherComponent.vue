<script setup lang="ts">
	import { ElTag, ElSelect, ElOption, ElMessage } from 'element-plus';
	import SonComponent from './SonComponent.vue';
	import { ref } from 'vue';

	const sonInput = (param: string) => {
		ElMessage.success('父组件接收到的值:' + param);
	};

	type giftType = '苹果' | '香蕉' | '橘子' | '葡萄' | '梨' | '西瓜';
	const gift = ref<giftType>('苹果');
	const gifts = ['苹果', '香蕉', '橘子', '葡萄', '梨', '西瓜'];
</script>
<template>
	<fieldset>
		<el-tag type="danger">
			<h3>Props-Emits</h3>
		</el-tag>
		<span>父组件:</span>
		<el-select v-model="gift" placeholder="请选择礼物" clearable style="width: 300px;">
			<el-option v-for="item in gifts" :key="item" :label="item" :value="item"></el-option>
		</el-select>
		<son-component :gift="gift" @sonInput="sonInput"></son-component>
	</fieldset>
</template>
<style scoped>
	fieldset {
		white-space: nowrap;
		display: flex;
		align-items: center;
	}
</style>
