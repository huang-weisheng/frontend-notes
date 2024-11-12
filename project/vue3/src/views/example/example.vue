<template>
	<div>
		<example-watch />
		<ref-props-emits />
		<example-v-model />
		<example-provide />
		<div style="display: flex;">
			<example-composable />
			<example-directive />
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
	import ExampleWatch from '@/views/example/watch-syntax/WatchSyntax.vue';
	import RefPropsEmits from '@/views/example/PropsEmits/ExamplePropsEmits.vue';
	import ExampleVModel from '@/views/example/v-model/ExampleVModel.vue';
	import ExampleProvide from '@/views/example/ProvideInject/ExampleProvide.vue';
	import ExampleComposable from '@/views/example/ComposableFunction/ExampleComposable.vue';
	import KeepLive from '@/views/example/KeepLive/KeepAlive.vue';
	import ExampleDirective from '@/views/example/ExampleDirective.vue';
	import SlotVue from '@/views/example/Slot/index.vue';
	import StateManagement from '@/views/example/StateManagement/index.vue';
	import RouterVue from '@/views/example/RouterVue/index.vue';
	import PiniaTemplate from '@/views/example/PiniaTemplate/index.vue';
</script>
