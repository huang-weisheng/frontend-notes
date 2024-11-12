import {type InjectionKey} from 'vue';
export const localProvide=Symbol() as InjectionKey<{
	num: number,
	update: () => void;
}>;
export const LocalReadonlyProvide=Symbol() as InjectionKey<{
	num: number,
	update: () => void;
}>;
