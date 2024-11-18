<template>
	<fieldset>
		<legend style="display: flex;align-items: center;justify-content: space-between;">
			<el-button type="success">{{ $translate('hello') }}</el-button>
			<el-button @click="ping" type="primary">ping</el-button>
			<el-button type="primary" @click="setTitle">设置标题</el-button>
			<div style="border: 3px dashed goldenrod;-webkit-app-region: drag;">
				<span>可拖动区域,无边框模式下生效,对应鼠标事件将由系统托管</span>
				<el-tag type="info"
					style="-webkit-app-region: no-drag;margin:5px 10px;">
					不可拖动区域
				</el-tag>
			</div>
		</legend>
		<router-view />
	</fieldset>
</template>
<script setup lang="ts">
	import { ElMessageBox, ElTag, ElButton } from 'element-plus';

	const ping = async () => {
		if (window.electronAPI && window.electronAPI.ping) {
			let data = await window.electronAPI.ping();
			alert(data);
		}
	};
	const setTitle = () => {
		ElMessageBox.prompt('', 'Please input title', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancel',
		})
			.then(({ value }) => {
				if (window.electronAPI && window.electronAPI.setTitle) {
					window.electronAPI.setTitle(value);
				}
			});
	};
</script>
