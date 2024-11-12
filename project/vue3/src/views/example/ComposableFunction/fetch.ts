// fetch.js
import {ref,watchEffect,toValue,type Ref} from 'vue';

export function useFetch(url: Ref<string>) {
	const data=ref();
	const error=ref();
	const fetchData=() => {
		// reset state before fetching..
		data.value=null;
		error.value=null;
		// toValue(url) 是在 watchEffect 回调函数的内部调用的。
		//确保在 toValue() 规范化期间访问的任何响应式依赖项都会被侦听器跟踪。
		request(toValue(url))
			.then((res) => (data.value=res))
			.catch((err) => (error.value=err));
			function request(url: string) {
			return new Promise((resolve,reject) => {
				setTimeout(() => {
					Math.random()>0.5?resolve('成功'):reject('失败:');
				},1000);
			});
		}

	};
	//watch effect 会立即运行，并且会跟踪回调函数中 toValue(url) 期间访问的任何依赖项。
	watchEffect(() => {
		fetchData();
	});
	return {data,error};
}
