// mouse.js
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';

export function useMouse() {
	const x = ref(0);
	const y = ref(0);
	const callback = (event: MouseEvent): void => {
		x.value = event.pageX;
		y.value = event.pageY;
	};
	onMounted(() => window.addEventListener('mousemove', callback));
	onUnmounted(() => window.removeEventListener('mousemove', callback));

	//推荐组合式函数始终返回一个包含多个 ref 的普通对象，这样该对象在组件中被解构为 ref 之后仍可以保持响应性：
	return { x, y };
}
