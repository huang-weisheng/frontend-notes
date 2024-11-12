import 'vue';
import EInput from '@/components/global/ExtendedInput.vue'; // 引入自定义组件
import type {ElInput} from 'element-plus';
declare module vue {
	interface ComponentCustomProperties {
		EInput: typeof ElInput;
	}
}
