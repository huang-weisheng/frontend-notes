import type {App} from "vue";
export default {
	install: ((app: App, options: {[key: string]: string;}) => {
		// 注入一个全局可用的 $translate() 方法
		app.config.globalProperties.$translate = (key: string) => {
			return options[key];
		};
	})
}

