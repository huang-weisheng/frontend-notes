import {defineStore} from 'pinia'
import {ref} from 'vue';
export const useBranchStore=defineStore('branch',()=>{
	const name=ref('pinia-branch');
	return {name};
})
	