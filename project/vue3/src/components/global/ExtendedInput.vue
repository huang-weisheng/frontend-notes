<script lang="ts">
	import { defineComponent, ref, onMounted } from 'vue';
	import type { ElInput } from 'element-plus';

	export default defineComponent({
		name: 'ExtendedButton',
		setup() {
			const input = ref<InstanceType<typeof ElInput>>();

			onMounted(() => {
				if (input.value) {
					// 将所有属性暴露到 this 上
					for (const key in input.value) {
						if (Object.prototype.hasOwnProperty.call(input.value, key)) {
							(this as any)[key] = (input.value as any)[key];
						}
					}
				}
			});
			return {
				input,
			};
		},
	});
</script>
<template>
	<!-- :="$attrs" 传递所有属性和事件 -->
	<el-input :="$attrs" ref="input">
		<!-- 传递所有插槽 -->
		<template v-for="(_, name) in $slots" #[name]="scopedData">
			<slot :name="name" :="scopedData || {}"></slot>
		</template>
	</el-input>
</template>
