<script setup lang="ts">
	import { ElMessage, ElTag, ElButton } from 'element-plus';
	import { fa } from 'element-plus/es/locales.mjs';
	import { computed, ref, watch, watchEffect, type WatchStopHandle, type WatchOptions } from 'vue';
	const simple = ref(1);
	const complex = ref({ a: { b: { c: 999 } } });
	const computedValue = computed<Object>(() => ([simple.value, complex.value]));
	const getter = () => ([simple.value, complex.value]);

	//侦听器选项
	const watchOptions: WatchOptions = {
		deep: true,//是否深度侦听源变化,在 3.5+ 中,此参数还可以是指示最大遍历深度的数字。
		immediate: false,//创建侦听器时，立即执行一遍回调.
		flush: 'post',//如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 flush: 'post' 选项：
		once: false,//回调只在源变化时触发一次，3.4版本新增
	};

	//侦听简单类型
	const unwatchSimple: WatchStopHandle = watch(
		simple,
		function (newVal, oldVal) {
			ElMessage.success('简单类型');
		},
		watchOptions
	);
	//侦听复杂类型,默认深层侦听,受deep属性影响
	const unwatchComplex: WatchStopHandle = watch(
		complex.value,
		function (newVal, oldVal) {
			ElMessage.success('复杂类型');
		},
		watchOptions
	);
	//侦听 计算属性,只有计算值改变时才触发回调,默认浅侦听,受deep属性影响
	const unwatchComputedValue: WatchStopHandle = watch(
		computedValue,
		function (newVal, oldVal) {
			ElMessage.success('计算属性');
		},
		watchOptions
	);
	//侦听 getter 函数,默认浅侦听,受deep属性影响
	const unwatchGetter: WatchStopHandle = watch(
		getter,
		function (newVal, oldVal) {
			ElMessage.success('getter');
		},
		watchOptions
	);
	//侦听多个来源组,多个数据同时变化时只触发一次回调,默认浅侦听,受deep属性影响
	const unwatchMultiple: WatchStopHandle = watch(
		[simple, complex, computedValue, getter],
		function (newVal, oldVal) {
			ElMessage.success('多个来源组');
		},
		watchOptions
	);


	let syncValue = ref(1);
	let asyncValue = ref(999);
	let unwatchEffect = ref<WatchStopHandle | undefined>(undefined);

	//watchEffect 允许我们自动跟踪回调的响应式依赖。只跟踪回调中被使用到的属性,而不是递归地跟踪所有的属性。
	//异步创建的侦听器必须手动停止它，以防内存泄漏。同步创建的侦听器会在宿主组件卸载时自动停止。
	function createAsync() {
		if (unwatchEffect.value) {
			ElMessage.warning('侦听器已存在');
			return;
		}
		ElMessage.success('创建watchEffect');
		unwatchEffect.value = watchEffect(async (): Promise<void> => {
			//watchEffect 仅会追踪在其同步执行期间访问到的依赖	
			await asyncFn(syncValue.value);
			//同步期间访问不到,不会触发watchEffect回调
			await asyncFn(asyncValue.value);
		}, {
			//如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 flush: 'post' 选项：
			flush: 'post',
		});
	}
	//停止侦听器，调用 watch 或 watchEffect 返回的函数：
	function stopWatch() {
		unwatchEffect.value && unwatchEffect.value();
		unwatchEffect.value = undefined;
		ElMessage.success('已停止watchEffect侦听器');
	}

	function asyncFn(n: number): Promise<number> {
		return new Promise<number>(resolve => {
			setTimeout(() => {
				ElMessage.success(String(n));
				resolve(n);
			}, 1000);
		});
	}
</script>

<template>
	<fieldset style="margin-top: 8px;">
		<el-tag type="danger">
			<h3>Watch</h3>
		</el-tag>
		<label>
			简单:<input v-model="simple" />
			复杂:<input v-model="complex.a.b.c" />
		</label>
		<el-button type="primary" @click="createAsync" style="margin-left: 8px;">创建watchEffect</el-button>
		<el-button type="primary" @click="stopWatch">停止watchEffect</el-button>
		<label v-if="unwatchEffect">
			同步:<input v-model="syncValue" />
			异步:<input v-model="asyncValue" />
		</label>
	</fieldset>

</template>
<style scoped>
	input {
		width: 100px
	}
</style>
