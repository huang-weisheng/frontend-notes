<script setup lang="ts">
	defineOptions({
		name: 'KeepLive'
	});
	import {ref} from 'vue';
	import { ElButton,ElTag } from 'element-plus';
	import KeepDiv from './KeepDiv.vue';
	import KeepInput from './KeepInput.vue';
	let keepComps=[
		KeepDiv,
		KeepInput,
	];
	let currentComp=ref(0);
	let excComp=ref<string[]>([]);
	function cancelKeep() {
		excComp.value=['KeepDiv','KeepInput'];
	}
	function startKeep() {
		excComp.value=[];
	}
	function toogleKeepComp() {
		currentComp.value=currentComp.value===1? 0:1;
	}
</script>
<template>
	<fieldset>
		<legend>
			<el-tag type="danger">
				<h2>KeepLive</h2>
			</el-tag>
			<el-button type="primary" @click="toogleKeepComp">切换组件</el-button>
			<el-button type="primary" @click="cancelKeep">取消缓存</el-button>
			<el-button type="primary" @click="startKeep">开始缓存</el-button>
		</legend>
		<div style="display: flex;align-items: center; height: 30px">
			<div style="width: 150px;">
				<keep-alive :exclude="excComp">
					<component :is="keepComps[currentComp]"></component>
				</keep-alive>
			</div>
		</div>
	</fieldset>
</template>
