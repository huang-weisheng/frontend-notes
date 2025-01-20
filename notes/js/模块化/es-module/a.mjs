//每个模块只会被加载和执行一次（多次加载同一个模块会复用已加载的模块实例）
//导入变量为常量;传递方式:引用传递,所有引入,指向同一块内存空间

//import from 语句:编译时态,必须在顶层且开头声明。路径不能使用变量
import obj, { str, count as figure } from './b.mjs';

console.log(obj.sum, str, figure);

//报错,导入为常量不能更改
// console.log(str=null);
// console.log(figure++);

//引用传递,在a.js中count被修改后,这里也会被修改	
setTimeout(() => console.log(figure), 2000);

//import(xxx)异步动态导入:运行时态,不限制在顶层声明,路径可以使用变量
import('./b.mjs').then(module => {
	//模块挂载的属性为只读,更改会报错
	// module.count = 10;
	// 模块对象:包含导出的所有特性
	console.log(module);
});

console.log('a.js加载');