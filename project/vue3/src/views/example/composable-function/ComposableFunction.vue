
<script setup lang="ts">
	import { ElTag } from 'element-plus';
	import {useMouse} from './mouse.ts';
	
	//每一个调用 useMouse() 的组件实例会创建其独有的 x、y 状态拷贝，因此他们不会互相影响。
	const {x,y}=useMouse();

</script>
<template>
	<fieldset>
		<el-tag type="danger">
			<h3>
				组合式函数
			</h3>
		</el-tag>
		mouse position: {{x}}, {{y}}
	</fieldset>
</template>
<style scoped>
	fieldset{
		display: flex;
		align-items: center;
	}
</style>
