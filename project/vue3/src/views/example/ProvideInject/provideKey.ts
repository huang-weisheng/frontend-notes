import {type InjectionKey} from 'vue';
export const localProvide=Symbol() as InjectionKey<{
	localProvideNum: number,
	update: () => void;
}>;
export const LocalReadonlyProvide=Symbol() as InjectionKey<{
	localProvideNum: number,
	update: () => void;
}>;
