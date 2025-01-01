<template>
	<div class="example">
		<fieldset>
			<legend style="display: flex;align-items: center;justify-content: space-between;">
				<el-button type="success">{{ $translate('hello') }}</el-button>
				<el-button @click="ping" type="primary">ping</el-button>
				<el-button type="primary" @click="setTitle">设置标题</el-button>
				<div style="border: 3px dashed goldenrod;-webkit-app-region: drag;">
					<el-text type="success">可拖动区域,无边框模式下生效,对应鼠标事件将由系统托管</el-text>
					<el-tag type="info"
						style="-webkit-app-region: no-drag;margin:5px 10px;">
						不可拖动区域
					</el-tag>
				</div>
			</legend>
			<prop-emit />
			<watch-syntax />
			<v-model />
			<example-provide />
			<div style="display: flex;">
				<composable-function />
				<state-management />
			</div>
			<div style="display: flex;">
				<slot-vue />
				<custom-directive />
			</div>
			<keep-cache />
			<pinia-store />
			<div style="display: flex;">
				<vue-router />
				<async-components />
			</div>
			<path-process />
		</fieldset>
	</div>
</template>
<script setup lang="ts">
	import PropEmit from '@/views/example/prop-emit/FatherComponent.vue';
	import WatchSyntax from '@/views/example/watch-syntax/WatchSyntax.vue';
	import VModel from '@/views/example/v-model/FatherModel.vue';
	import ExampleProvide from '@/views/example/ProvideInject/ProvideModule.vue';
	import ComposableFunction from '@/views/example/composable-function/ComposableFunction.vue';
	import KeepCache from '@/views/example/keep-alive/KeepAlive.vue';
	import CustomDirective from '@/views/example/custom-directive/CustomDirective.vue';
	import SlotVue from '@/views/example/slot-demo/SlotContent.vue';
	import StateManagement from '@/views/example/state-management/StateManagement.vue';
	import VueRouter from '@/views/example/vue-router/VueRouter.vue';
	import PiniaStore from '@/views/example/pinia-store/PiniaStore.vue';
	import AsyncComponents from '@/views/example/async-components/AsyncComponents.vue';
	import PathProcess from '@/views/example/assets-process/AssetsProcess.vue';
	import { ElMessageBox, ElTag, ElButton, ElText } from 'element-plus';
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
<style scoped>
	.example {
		width: 800px;
	}
</style>