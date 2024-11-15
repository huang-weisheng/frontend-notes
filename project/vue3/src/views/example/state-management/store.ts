import {ref} from 'vue'

// 全局状态，创建在模块作用域下
const globalState=ref({
	count:0,
})	

export function useCount() {
	// 局部状态，每个组件都会创建
		const localState=ref({
		count:0,
	})
	const increment=function() {
		localState.value.count++
		globalState.value.count++
	}
	return {
		globalState,
		localState,
		increment,
	}
}
