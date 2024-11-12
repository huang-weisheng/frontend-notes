import type {InjectionKey, Ref} from 'vue';

type provideObjType={globalProvideNum: Ref<number>,update: () => void;};
export const globalProvideObjKey=Symbol() as InjectionKey<provideObjType>;
