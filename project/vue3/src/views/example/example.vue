<template>
	<div class="example">
		<prop-emit />
		<watch-syntax />
		<v-model />
		<example-provide />
		<div style="display: flex;">
			<composable-function />
			<custom-directive />
		</div>
		<div style="display: flex;">
			<slot-vue />
			<state-management />
		</div>
		<keep-live />
		<PiniaTemplate />
		<RouterVue />
	</div>
</template>
<script setup lang="ts">
	import PropEmit from '@/views/example/prop-emit/FatherComponent.vue';
	import WatchSyntax from '@/views/example/watch-syntax/WatchSyntax.vue';
	import VModel from '@/views/example/v-model/FatherModel.vue';
	import ExampleProvide from '@/views/example/ProvideInject/ProvideModule.vue';
	import ComposableFunction from '@/views/example/composable-function/ComposableFunction.vue';
	import KeepLive from '@/views/example/KeepLive/KeepAlive.vue';
	import CustomDirective from '@/views/example/custom-directive/CustomDirective.vue';
	import SlotVue from '@/views/example/Slot/index.vue';
	import StateManagement from '@/views/example/StateManagement/index.vue';
	import RouterVue from '@/views/example/RouterVue/index.vue';
	import PiniaTemplate from '@/views/example/PiniaTemplate/index.vue';
</script>
<style scoped>
	.example {
		width: 1000px;
	}
</style>