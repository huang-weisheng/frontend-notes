//require 加载模块时,会缓存模块,多次加载同一个模块,只会执行一次
//运行时态,不限制使用位置,可以使用变量
const count1 = require('./b.cjs').count1;
const str = './b.cjs';
const count2 = require(str).count2;
console.log(count1, count2);
