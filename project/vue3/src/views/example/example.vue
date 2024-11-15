<template>
	<div class="example">
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
		<keep-alive />
		<pinia-store />
		<RouterVue />
	</div>
</template>
<script setup lang="ts">
	import PropEmit from '@/views/example/prop-emit/FatherComponent.vue';
	import WatchSyntax from '@/views/example/watch-syntax/WatchSyntax.vue';
	import VModel from '@/views/example/v-model/FatherModel.vue';
	import ExampleProvide from '@/views/example/ProvideInject/ProvideModule.vue';
	import ComposableFunction from '@/views/example/composable-function/ComposableFunction.vue';
	import KeepAlive from '@/views/example/keep-alive/KeepAlive.vue';
	import CustomDirective from '@/views/example/custom-directive/CustomDirective.vue';
	import SlotVue from '@/views/example/slot-demo/SlotContent.vue';
	import StateManagement from '@/views/example/state-management/StateManagement.vue';
	import RouterVue from '@/views/example/RouterVue/index.vue';
	import PiniaStore from '@/views/example/pinia-store/PiniaStore.vue';
</script>
<style scoped>
	.example {
		width: 1000px;
	}
</style>