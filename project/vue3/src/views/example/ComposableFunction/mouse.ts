// mouse.js
import {ref} from 'vue';
import {useEventListener} from './event';

export function useMouse() {
	const x=ref(0);
	const y=ref(0);

	useEventListener(window,'mousemove',(event: MouseEvent): void => {
		x.value=event.pageX;
		y.value=event.pageY;
	});
	//推荐组合式函数始终返回一个包含多个 ref 的普通对象，这样该对象在组件中被解构为 ref 之后仍可以保持响应性：
	return {x,y};
}
