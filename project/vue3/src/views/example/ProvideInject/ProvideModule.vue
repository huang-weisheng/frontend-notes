<script setup lang="ts">
	import { ElButton,ElTag } from 'element-plus';
	import {provide,inject,ref,readonly} from 'vue';
	import {globalProvideObjKey} from '@/types/provideInject.ts';
	import {localProvide,LocalReadonlyProvide} from './provideKey.ts';
	import InjectModule from './InjectModule.vue';

	//接收(main.ts)在整个应用层面提供的依赖 ,若不要求必传可提供默认值(第二个参数)
	const GLOBAL_INJECT=inject(globalProvideObjKey,{
		globalProvideNum: ref(1),
		update() {this.globalProvideNum.value++;},
	});

	//第三个参数表示默认值应该被当作一个工厂函数,只有在用到默认值时才会创建实例
	//const value=inject('key',() => new ExpensiveClass(),true)

	const LOCAL_PROVIDE=ref({
		localProvideNum: 0,
		update() {
			this.localProvideNum =Math.ceil(Math.random()*99);
		},
	})

	//提供局部的注入依赖
	provide(localProvide, LOCAL_PROVIDE.value);

	const readonlyProvideObj=ref({
		localProvideNum: 0,
		update() {this.localProvideNum=Math.ceil(Math.random()*99)}
	});

	//使用 readonly 禁止注入方的组件更改注入数据
	provide(LocalReadonlyProvide,readonly(readonlyProvideObj.value));
</script>
<template>
	<fieldset>
		<el-tag type="danger">
			<h3>ProvideInject</h3>
		</el-tag>
		<!-- 推荐使用供给方组件提供更改数据的方法函数来更改数据-->
		<el-button type="primary" @click="GLOBAL_INJECT?.update()">
			修改全局注入
		</el-button>
		<el-tag>global:{{ GLOBAL_INJECT?.globalProvideNum.value}}</el-tag>
		<!-- 这里是响应式 -->
		<InjectModule />
	</fieldset>

</template>
