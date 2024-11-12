console.log('a.js加载');

//import语句默认会优先执行,放在最下边也可以,执行b.js,注册'bus.b'事件
import {count} from './b.js';

//es-moduele为值传递,导出的所有引入,指向同一块内存空间,所有的引入都是共用的一个数据
import bus from './bus.js';

//报错,导入为常量不能更改
// count ++;

//动态加载js文件,多次引用,b.js代码只执行一次
import('./b.js').then(module => {
	// module.obj = { count : 0 };//报错 导入为常量不能赋值
	module.obj.count++;
	console.log(module.obj.count);
});

bus.$emit('b','a-b');//触发b.js中注册的'b'事件
console.log(count);
