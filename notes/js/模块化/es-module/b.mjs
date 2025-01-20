// export用于声明要导出的变量,导出必须位于顶层,可以不在开头,可以使用变量

let str = 'str'
let num = 2;

// 具名导出:导出其它地方声明的特性,可以有多个
export {str,num as count};

// 默认导出:每个模块只能有一个默认导出
export default { sum: str + num };

setTimeout(() => {
	num = 10;
}, 1000);

console.log('b.js加载');
