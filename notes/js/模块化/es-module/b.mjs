// export用于声明要导出的变量,导出必须位于顶层,可以不在开头,可以使用变量

// 具名导出:导出单个特性,可以有多个
let a = 1
export var count1 = a;

// 具名导出:导出其它地方声明的特性,可以有多个
const b = 2;
const c = 3;
export { b as count2, c as count3 };

// 默认导出:每个模块只能有一个默认导出
export default { sum: a + b + c };


console.log('a.js加载');

setTimeout(() => {
	count1 = 10;
}, 100);

