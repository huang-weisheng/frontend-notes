<template>
	<fieldset class="async-container">
		<el-tag type="danger">
			<h3>异步组件</h3>
		</el-tag>
		<el-button type="primary" @click="show = !show">
			显示
		</el-button>
		<el-dialog v-model="show" title="异步组件示例">
			<async-demo v-if="show" />
		</el-dialog>
	</fieldset>
</template>

<script setup lang="ts">
	import { ElDialog, ElTag, ElButton } from 'element-plus';
	import { ref, defineAsyncComponent } from 'vue';
	import LoadingComponent from './components/LoadingComponent.vue';
	import ErrorComponent from './components/ErrorComponent.vue';

	const show = ref(false);

	// 使用defineAsyncComponent定义异步组件，添加加载和错误处理
	const AsyncDemo = defineAsyncComponent({
		// 加载组件
		loader: () => import('./components/AsyncDemo.vue'),
		// 展示加载组件前的延迟时间
		delay: 200,
		// 异步组件加载超时时间
		timeout: 1000,
		// 加载错误或超时显示组件
		errorComponent: ErrorComponent,
		// 加载中显示组件
		loadingComponent: LoadingComponent,
		// 错误处理,只有当网络请求错误才会触发,超时不会触发
		onError(error, retry, fail, attempts) {
			// 重试5次
			if (attempts <= 5) {
				setTimeout(() => {
					console.log('重试', attempts);
					// 行为待定
					retry();
				}, 1000);
			} else {
				console.log('失败');
				//显示错误组件
				fail();
			}
		}
	});
</script>

<style scoped>

</style>
