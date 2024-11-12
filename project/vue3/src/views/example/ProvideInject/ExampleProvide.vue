<script setup lang="ts">
	defineOptions({
		name:'ProvideInject'
	})
	import { ElButton,ElTag } from 'element-plus';
	import {provide,inject,ref,readonly} from 'vue';
	import {globalProvideObjKey} from '@/types/provideInject.js';
	import {localProvide,LocalReadonlyProvide} from './provideKey.js';
	import ExampleInject from './ExampleInject.vue';

	//接收在整个应用层面提供的依赖 (main.ts),若不要求必传可提供默认值(第二个参数)
	const PROVIDE_OBJ=inject(globalProvideObjKey,{
		globalProvideNum: ref(1),
		update() {this.globalProvideNum.value++;},
	});

	//第三个参数表示默认值应该被当作一个工厂函数,只有在用到默认值时才会创建实例
	//const value=inject('key',() => new ExpensiveClass(),true)

	const localProvideObj=ref({
		num: 0,
		update() {
			this.num=Math.ceil(Math.random()*99);
		},
	})

	//提供局部的注入依赖;接收方式和上面相同
	provide(localProvide,localProvideObj.value);

	const readonlyProvideObj=ref({
		num: 0,
		update() {this.num=Math.ceil(Math.random()*99)}
	});

	//你想确保提供的数据不能被注入方的组件更改，你可以使用 readonly() 来包装提供的值。
	provide(LocalReadonlyProvide,readonly(readonlyProvideObj.value));
</script>
<template>
	<fieldset>
		<legend>
			<el-tag type="danger">
				<h3>ProvideInject</h3>
			</el-tag>
			<!-- 推荐使用供给方组件提供更改数据的方法函数来更改数据-->
			<el-button type="primary" @click="PROVIDE_OBJ?.update()">
				modifyGlobal
			</el-button>
			<!-- 这个组件中可以修改,只读只针对于注入方组件 -->
			<el-button type="primary" @click="readonlyProvideObj.update()">
				modifyLocalReadOnly
			</el-button>
		</legend>
		<!-- 这里是响应式 -->
		<el-tag>global:{{PROVIDE_OBJ?.globalProvideNum.value}}</el-tag>
		<example-inject></example-inject>
	</fieldset>

</template>
