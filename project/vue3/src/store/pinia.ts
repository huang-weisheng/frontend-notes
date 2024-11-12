import {defineStore} from 'pinia';
import {useBranchStore} from './pinia-branch.js';

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useCounterStore=defineStore('counter',{
	// 为了完整类型推理，推荐使用箭头函数
	state: () => {
		return {
			// 所有这些属性都将自动推断出它们的类型
			count: 0,
			name: 'Eduardo',
			isAdmin: true,
			items: [{name: 'shoes'}],
		};
	},
	getters: {
		// 使用箭头函数，并且它将接收 state 作为第一个参数
		doubleCount: (state) => state.count*2,


		//也可以通过 this 访问到整个 store 实例,在 TypeScript 中必须定义返回类型。
		doublePlusOne(state): number {
			return this.doubleCount+state.count;
		},

		otherGetter: (state) => {
			//想要使用另一个 store 的话，那你直接在 getters 中调用就好了：
			const branchStore=useBranchStore();
			return branchStore.urlAndHash+'==='+state.name;
		},
	},
	actions: {
		increment() {
			//action 也可通过 this 访问整个 store 实例，
			this.count++;
		},
		//action 可以是异步的，你可以在它们里面 await 调用任何 API
		async requestImage() {
			//想要使用另一个 store 的话，那你直接在 action 中调用就好了：
			const branchStore=useBranchStore();
			try {
				let imgBlob=await fetch(branchStore.url).then(res => res.blob());
				document.body.style.backgroundImage=`url(${URL.createObjectURL(imgBlob)})`;
			} catch(err) {
				console.log(err);
			}
		},
	},
});
