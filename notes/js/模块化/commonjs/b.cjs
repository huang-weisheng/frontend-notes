//exports 是 module.exports 的引用,重新赋值会断开引用
exports.count1 = 0;
//用于完全控制模块的导出内容。直接修改它会直接影响到最终导出的对象或函数。
module.exports.count2 = 1;

console.log('b.cjs加载');
