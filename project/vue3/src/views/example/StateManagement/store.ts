import {ref} from 'vue'

// 全局状态，创建在模块作用域下
const globalCount=ref(0)

export function useCount() {
	// 局部状态，每个组件都会创建
	const localCount=ref(0)
	const increment=function() {
		localCount.value++
		globalCount.value++
	}
	return {
		globalCount,
		localCount,
		increment,
	}
}
