import {defineStore} from 'pinia';
import {useBranchStore} from './branch.js';
import {ref,computed} from 'vue';
import {ElMessage} from 'element-plus';
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useCounterStore=defineStore('counter',
	()=>{
		const count = ref(0);
		const doubleCount = computed(() => count.value * 2);
		const requestImage=async () => {
			let res = await fetch('https://api.vvhan.com/api/wallpaper/pcGirl');
			let imgBlob=await res.blob();
			document.body.style.backgroundImage=`url(${URL.createObjectURL(imgBlob)})`;
		}
		const accessBranchStore=() => {
			const branchStore=useBranchStore();
			ElMessage.success(`branchStore.name:${branchStore.name}`);
		}
		return {count,doubleCount,requestImage,accessBranchStore};
	}
);
