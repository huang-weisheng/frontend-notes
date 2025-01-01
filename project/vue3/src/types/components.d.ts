import 'vue';
import HButton from '@/components/global/HButton.vue'
declare module 'vue' {
	export interface GlobalComponents {
		HButton: typeof HButton
	}
}
