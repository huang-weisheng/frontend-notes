import {defineStore} from 'pinia';
import {useBranchStore} from './branch.js';
import {ref,computed} from 'vue';
import {ElMessage} from 'element-plus';
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useCounterStore=defineStore('counter',
	()=>{
		//ref() 就是 state 属性
		const count = ref(0);
		// computed() 就是 getters
		const doubleCount = computed(() => count.value * 2);
		// function() 就是 actions,可以是异步的,在里边使用await
		const requestImage=async () => {
			let res = await fetch('https://api.vvhan.com/api/wallpaper/pcGirl');
			let imgBlob=await res.blob();
			console.log(imgBlob);
			return imgBlob;
		}
		// 访问其他store
		const accessBranchStore=() => {
			const branchStore=useBranchStore();
			ElMessage.success(`branchStore.name:${branchStore.name}`);
		}
		return {count,doubleCount,requestImage,accessBranchStore};
	}
);
