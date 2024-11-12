### ES6

#### call apply bind

- call(指向谁,arg1,arg2,arg3...) call和apply都会立刻调用函数
- apply(指向谁,[arg1,arg2,arg3]) call传递参数的时候,直接用逗号隔开,而apply传递参数的时候 需要使用数组
- bind(指向谁,arg1,arg2,arg3...) bind不会立刻调用函数,会返回一个已经变更this指向的函数

#### let const

#### 箭头函数

- 箭头函数不能用于构造函数,因为它没有原型
- 箭头函数中没有一个叫做arguments的关键字
- arguments是一个伪数组,可以获取函数传递的实参

#### 解构赋值

- let { name:pro } = obj 解构出name这个变量并赋值给了另一个变量pro
- let { a : { b } } = obj; 解构出obj中a对象的b,并未将a解构出来
- let { name=0 } = obj 解构出name变量,当属性不存在或值为 undefined 时，将使用默认值
- let {a,b,...others } = arr others储存剩下的属性,必须是模式中的最后一个，并且不能有尾随逗号。
- let [, , b] = arr 用变量和数组中的结果进行对应就可以了
- let [ name=0,age ] = arr 解构出name变量,当属性不存在或值为 undefined 时，将使用默认值
- let [a,b,...others ] = arr others储存剩下的属性,必须是模式中的最后一个，并且不能有尾随逗号。

#### 展开语法 ...

#### 模板字符串 `${}`

带标签的模板是模板字面量的一种更高级的形式，它允许你使用函数解析模板字面量。
```js
let a = document.createElement ( 'a' );
a.innerText = '百度';
HTMLElement.prototype.styles = function ( a , ... arg ) {
	a.slice ( 0 , a.length - 1 ).forEach ( ( i , n ) => {
		this.style[ i ] = arg[ n ] + '';
	} );
	return this;
};
HTMLElement.prototype.props = function ( a , ... arg ) {
	a.slice ( 0 , a.length - 1 ).forEach ( ( i , n ) => {
		this[ i ] = arg[ n ] + '';
	} );
	return this;
};
a.styles`color${ 'red' }font-size${ '30px' }`.props`href${ 'http://www.baidu.com' }target${ '_blank' }}`;
document.body.append ( a );
```

#### 可选链

可选链运算符（?.）允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。在引用为空 (null 或者 undefined) 的情况下短路返回值是 undefined。

- `console.log(a.b?.c)` 是否可以继续链式调用

#### 空值合并运算符 ??

空值合并运算符（??）是一个逻辑运算符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

- console.log(flag ?? "这是结果") 双问号前面的值如果是undefined或者是null的时候 就会使用后面的结果

### 字符串填充

targetLength:要填充到的长度 padString:用来填充的字符串

- padStart(targetLength, padString) 向左填充
- padEnd(targetLength, padString)  向右填充

### 类 class
