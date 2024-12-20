
# in 运算符

`prop in obj` 如果该属性在对象或其原型链中,无论是否可枚举,返回 true。

# 数组方法 Array.prototype

- `[].sort(sortFn)` 数组排序,返回这个数组的引用。改变原数组。
```javascript
	[ 1, 2, 3 ].sort (  ( a , b )=>String(a) - String(b) )
```
- `[].flat(depth)` 创建一个新的数组,原数组扁平化而来,depth:扁平化深度,默认1
- `Array.from(arrayLike, mapFn, thisArg)` 对参数一(arguments,Map,Set,String,NodeList,HTMLCollection等)转换成数组对象
	- 参数一 : 伪数组对象(带有 length 属性和索引元素的对象)||可迭代对象
	- 参数二 : 可选参数,新数组中的每个元素会执行该回调函数。
	- 参数三 : 可选参数,执行回调函数 mapFn 时 this 对象。

```js
console.log ( Array.from ( 'foo' ) ); //["f", "o", "o"]
console.log ( Array.from ( { 0 : 0 , 1 : 1 , length : 3 } , x => x + x ) );// [0,2,NaN]
```

# 字符串方法 (String.prototype)

- `字符串.match(regexp)`
	- regexp: 正则表达式对象
	- 返回值: 若有匹配:返回 Array,内容取决于是否存在全局(g)标志,如果没有匹配,则返回 null。
		- 若有全局(g)标志,则将返回与完整正则表达式匹配的所有结果
		- 若无全局(g)标志,只返回第一个完整匹配及其相关捕获组。(一个带有一些额外属性的数组)
- `a.localeCompare (b )` 按本地编码顺序比较a和b, a大于b 返回 1, a小于b 返回 -1, a等于b 返回 0

# 日期的方法(Date)

## 创建日期

单个参数:
- `new Date()` 输出当前日期创建一个日期对象
- `new Date('2024-05-16T23:02:22')` 根据提供的日期字符串创建一个日期对象。
- `new Date(1672531199000)` 根据自1970-01-01 00:00:00 UTC以来的毫秒数创建一个日期对象
多个参数:
- `const date = new Date(year, monthIndex [, day [, hour [, minute [, second [, millisecond ]]]]]);`
	- 根据提供的年、月(从0开始)、日、小时、分钟、秒和毫秒创建一个日期对象。
	- `new Date(2024,0).toLocaleString();`  2024/1/1 00:00:00
	- `new Date(2024,0,0).toLocaleString();`
		-  特殊行为:日期的 0 表示前一个月的最后一天。2023/12/31 00:00:00;
	- `new Date(2024,2,3,4).toLocaleString();`  2024/3/3 04:00:00
	- `new Date(2024,2,3,4,5).toLocaleString();`  2024/3/3 04:05:00
	- `new Date(2024,2,3,4,5,6).toLocaleString();`  2024/3/3 04:05:06

## Date  的实例方法

1. **getFullYear()**: 获取四位数的年份。
2. **getMonth()**: 获取月份,从0开始。
3. **getDate()**: 获取月份中的某一天。
4. **getHours()**: 获取小时。
5. **getMinutes()**: 获取分钟。
6. **getSeconds()**: 获取秒数。
7. **getDay()**: 获取星期几,从周日开始,周日为0。
8. **getMilliseconds()**: 获取毫秒部分。

## 日期本地化

options中配置哪些字段则显示哪些字段!

```js
const options={
	hour12: false,//强制24小时制
	year: 'numeric',//numeric:显示四位数字;2-digit: 只显示后两位数字
	month: '2-digit',//numeric: 不补0; 若为 'long' ;年月日将显示为汉字;
	day: '2-digit',//2-digit：前边补0; numeric: 不补0
	weekday: 'short',// 控制周的显示(周几),若为 'long' (星期几);年月日将显示为汉字;
	hour: '2-digit',//2-digit：前边补0; numeric: 不补0
	minute: '2-digit',//2-digit：前边补0; numeric: 不补0
	second: '2-digit',//2-digit：前边补0; numeric: 不补0
};
console.log(new Date().toLocaleString('zh-CN',options)); // 2024/08/29周四 23:17:23
```

# 对象的方法(Object)

- `Object.getOwnPropertySymbols(obj)` 返回 obj 所有 自有 Symbol 键的数组。无论是否可枚举。
- `Object.getOwnPropertyNames(obj)` 返回所有自有键(不包括Symbol键)组成的数组。无论是否可枚举。
- `Object.getPrototypeOf( obj )` 返回 obj 的原型
- `Object.setPrototypeOf(obj, prototype)` 将 obj 的原型设置为 prototype, prototype 可以是 null。
- `Object.hasOwn(obj, prop)` 判断属性是不是对象自身的属性。旨在取代 Object.prototype.hasOwnProperty(prop)
- `Object.create( prototype,properties?)`  创建一个对象
	- 参数一:对象的原型
	- 参数二(可选):对象的属性及描述符,默认:不可写,不可枚举,不可配置
	```javascript
	let obj = Object.create ( { name : 'ls' } , { a : { value : 'a' }, b : { value : 'b' } } )
	```
- `Object.preventExtensions(obj)` 使对象不可添加新属性。它还可以防止对象的原型被重新指定。浅冻结。
	- obj 将要变得不可扩展的对象。
	- 返回值 已经不可扩展的对象。(还是本身)
- `Object.seal(obj)` 使对象不可添加新属性,已有属性不可删除,不可配置,但允许修改属性值。浅冻结。
	- obj 将要变得不可扩展的对象。
	- 返回值 已经不可扩展的对象。(还是本身)
- `Object.freeze(obj)` 使对象不可添加新属性,已有属性不可删除,不可配置,不可写(属性值不可修改)。浅冻结。
	- obj 将要变得不可扩展的对象。
	- 返回值 已经不可扩展的对象。(还是本身)
- `Object.isExtensible(obj)`  静态方法判断一个对象是否是可添加新属性的(可扩展)。
	- obj: 要检查的对象。
	- 返回值: 指示给定对象是否可扩展的一个布尔值。
- `Object.getOwnPropertyDescriptor(obj, prop)` 返回其属性描述符||undefined,返回对象可变,但不影响原属性的配置。
- `Object.prototype.isPrototypeOf(obj)` 测试 Object.prototype 是否存在于 obj 的原型链上
  ```js
  let Test = function () { }
  let testObject = new Test();
  Test.prototype.isPrototypeOf(testObject) // true Test.prototype在testObject的原型链上
  Object.prototype.isPrototypeOf(testObject) // true Object.prototype在testObject的原型链上
  ```

# Object.defineProperty

Object.defineProperty(obj, prop, descriptor)

- obj 要定义属性的对象。
- prop 要定义或修改的属性的名称或 Symbol 。
- descriptor 要定义或修改的属性描述符。

* 目前存在的属性描述符有两种主要形式: 数据描述符和存取描述符。
* 数据描述符是一个具有值的属性,该值可以是可写的,也可以是不可写的。
* 存取描述符是由 getter 函数和 setter 函数所描述的属性。
* 一个描述符只能是这两者其中之一；不能同时是两者。它们共享可选键值(configurable,enumerable)
* 数据描述符还具有以下可选键值:value,writable  (有这属性表示是数据描述符)
* 存取描述符还具有以下可选键值: get, set  (有这属性表示是存取描述符)
* 如果一个描述符不具有 value、writable、get 和 set 中的任意一个键,那么它将被认为是一个数据描述符。如果一个描述符同时拥有 value 或 writable 和 get 或 set 键,则会产生一个异常。
* 记住,这些选项不一定是自身属性,也要考虑继承来的属性。为了确认保留这些默认值,在设置之前,可能要冻结 Object.prototype ,明确指定所有的选项,或者通过 Object.create(null) 将 Object.prototype.__proto__ 属性指向 null。

```js
let btn = document.createElement ( 'button' )
btn.innerHTML = '0'
document.documentElement.append ( btn )
btn.addEventListener ( 'click' , numAdd )
function numAdd () {
	property = 'newValue'
	console.log ( property === 1 && property === 2 && property === 3 )
}
let num = 0
window.property = 0
Object.defineProperty ( window , 'property' , {
	configurable : true , //仅当为 true 时,该属性的描述符才能够被改变,同时该属性也能从对应的对象上被删除。 默认false。
	enumerable : false , //仅当为true时,该属性才会出现在对象的枚举属性中(可以被for...in,Object.keys遍历)。 默认false。
	//value : 42 ,//该属性对应的值。可以是任何有效的 JavaScript 值(数值,对象,函数等)。默认为undefined。
	//writable : false ,//值为 true 时,属性的值,也就是上面的 value,才能被赋值运算符改变 默认false。
	get () {//没参数
		num ++
		//当访问该属性时,会调用此函数。该函数的返回值会被用作属性的值。 默认为 undefined.传入 this 对象(由于继承关系,这里的this并不一定是定义该属性的对象)。
		return num
	} ,
	set ( newValue ) {//该方法接受一个参数(被赋予的新值),默认为 undefined。
		console.log ( newValue )
		//当属性值被修改时,会调用此函数,会传入赋值时的 this 对象。
	} ,
} )
```

# Proxy

## 简介

- Proxy 对象用于创建一个对象的代理,从而实现基本操作的拦截和自定义(如属性查找、赋值、枚举、函数调用等)。

- 语法: `const p = new Proxy(target, handler)`
	- target: 要使用 Proxy 包装的目标对象(可以是任何类型的对象,包括原生数组,函数,甚至另一个代理)。
	- handler: 一个通常以函数作为属性的对象,各属性中的函数分别定义了在执行各种操作时代理 p 的行为。
	- p: 代理对象

## 参数 handler对象 的方法

### handler.get(target, property, receiver)

- handler.get(target, property, receiver)方法用于拦截对象的读取属性操作。
	- target:  目标对象。
	- property:  被获取的属性名。
	- receiver:  Proxy 或者继承 Proxy 的对象
- get 方法可以返回任何值。
- 该方法会拦截目标对象的以下操作:
	- 访问代理对象的属性:proxy[bar] 和 proxy.bar
	- 代理对象作为原型被访问:Object.create(proxy)[foo]
	- Reflect.get()
- 如果要访问的目标属性是不可写以及不可配置的,则返回的值必须与该目标属性的值相同。
- 如果要访问的目标属性没有配置访问方法,即 get 方法是 undefined 的,则返回值必须为 undefined。

```js
	//代理一个对象的属性访问
	var p=new Proxy({},{
		get: function(target,prop,receiver) {
			//作为原型上的属性被访问时,receiver 是 obj，而不是 proxy
			console.log(receiver===obj);//true
			//返回 10
			return 10;
		},
	});
	// obj 的原型是 p
	const obj=Object.create(p);
	// 触发拦截, handler.get 函数参数中的 receiver 是 obj，而不是 proxy
	console.log(obj.foo);// "10"
```

### handler.set(target, property, value, receiver)

- handler.set(target, property, value, receiver) 方法拦截对象的属性赋值操作。
	- target:  目标对象。
	- property:  将被设置的属性名或 Symbol。
	- value:  新属性值。
	- receiver:  最初接收赋值的对象。通常是 proxy 本身,若 set 方法在原型链上或以其他方式被间接地调用则不是。
- 该方法会拦截目标对象的以下操作:
	- 等号赋值:proxy.foo = bar
	- 指定继承者的属性值:Object.create(new Proxy(...))[foo] = bar
	- Reflect.set()
- set 方法应当返回一个布尔值。 true 代表属性设置成功

```js
	// 代理一个对象的属性赋值
	var p=new Proxy({},{
		set(target,prop,value,receiver) {
			//p为obj原型时,receiver 是 obj，而不是 p
			console.log(receiver===obj);//true
			// 将对 p 的代理操作转发给 obj
			return Reflect.set(target,prop,value,receiver);
		},
	});
	// obj 的原型是 p
	const obj=Object.create(p);
	//触发拦截, handler.set 函数参数中的 receiver 是 obj，而不是 proxy
	obj.name='John';
	console.log(obj);
```

### handler.deleteProperty	(target, property)

- handler.deleteProperty(target, property) 方法用于拦截对对象属性的 delete 操作。
	- target 目标对象。
	- property 待删除的属性名。
- deleteProperty 必须返回一个 Boolean 类型的值,表示了该属性是否被成功删除。
- 该方法会拦截以下操作:
	- 删除属性: delete proxy.foo
	- Reflect.deleteProperty()
- 如果目标对象的属性是不可配置的,那么该属性不能被删除。
```js
	let obj={a: 0,b: 1};
	//代理一个对象的属性删除
	var p=new Proxy(obj,{
		deleteProperty: function(target,property) {
			console.log(target,property);
			// 将对 p 的代理操作转发给 obj
			return Reflect.deleteProperty(target,property);
		},
	});
	// 使用 delete 操作符删除属性,触发 handler.deleteProperty
	delete p.a;
	console.log(obj);
```

### handler.defineProperty(target, property, descriptor)

- handler.defineProperty(target, property, descriptor) 用于拦截对象的 defineProperty 操作。
	- target: 目标对象。
	- property: 待检索其描述的属性名。
	- descriptor: 待定义或修改的属性的描述符。
- 该方法会拦截目标对象的以下操作:
	- Object.defineProperty
	- Reflect.defineProperty
```js
let obj = {}
// 代理一个对象的属性定义
var p = new Proxy (obj , {
		defineProperty ( target , prop , descriptor ) {
			console.log ( descriptor );
			// 将对 p 的代理操作转发给 obj
			return Reflect.defineProperty ( target , prop , descriptor );
		} ,
	} ,
);
// 使用Object.defineProperty定义属性,触发 handler.defineProperty
Object.defineProperty ( p , 'name' , {
	value : 'proxy' ,
} );
console.log(obj);
```
### handler.getPrototypeOf(target)

- 读取代理对象的原型时,该方法就会被调用。示例演示五种触发 getPrototypeOf 代理方法的方式
- getPrototypeOf(target) 方法的返回值必须是一个对象或者 null。
	- target:  目标对象。
- 该方法会拦截目标对象的以下操作:
	- Object.getPrototypeOf()
	- Reflect.getPrototypeOf()
	- __proto__
	- Object.prototype.isPrototypeOf
	- instanceof
```js
var obj = {};
var p = new Proxy ( obj , {
	getPrototypeOf ( target ) {
		return Array.prototype;
	} ,
} );
Object.getPrototypeOf ( p ) === Array.prototype; // true
Reflect.getPrototypeOf ( p ) === Array.prototype;// true
p.__proto__ === Array.prototype; // true
Array.prototype.isPrototypeOf ( p ); // true
p instanceof Array; // true
```

### handler.setPrototypeOf(target, prototype)

- handler.setPrototypeOf(target, prototype) 方法主要用来拦截 Object.setPrototypeOf(),
	- target 被拦截目标对象。
	- prototype 对象新原型或为null。
- 如果成功修改了[[Prototype]], setPrototypeOf 方法返回 true,否则返回 false.
- 这个方法可以拦截以下操作:
	- Object.setPrototypeOf()
	- Reflect.setPrototypeOf()
- setPrototypeOf 方法若返回false,则使用Object.setPrototypeOf时报错

```js
var target = { target : 1 };

var p1 = new Proxy ( target , {
	setPrototypeOf ( target , newProto ) {
		console.log ( newProto );//{ newProto : 100 }
		Object.setPrototypeOf ( target , newProto );//触发拦截时进行一些操作
		return true //若返回false,则使用Object.setPrototypeOf时报错
	} ,
} );
Reflect.setPrototypeOf ( p1 , { newProto : 100 } );
Object.setPrototypeOf ( p1 , { newProto : 100 } );
```

### handler.has(target, prop)

- handler.has(target, prop) 方法是针对 in 操作符的代理方法。
	- target: 目标对象。
	- prop: 需要检查是否存在的属性。
- 这个钩子可以拦截下面这些操作:
	- 属性查询:foo in proxy
	- 继承属性查询:foo in Object.create(proxy)
	- with 检查: with(proxy) { (foo); }
	- Reflect.has()
- has 方法返回一个 boolean 属性的值用作in运算符的返回值。

```js
var p = new Proxy ( {} , {
		has : function ( target , prop ) {
			console.log ( "called: " + prop );
			return true;
		} ,
	} ,
);
console.log ( "a" in p ); // "called: a"; outputs true
```

### handler.apply (拦截函数调用)

- handler.apply() 方法用于拦截函数的调用。
	- target: 目标对象(函数)。
	- thisArg: 被调用时的上下文对象。
	- argumentsList:  被调用时的参数数组。
- 该方法会拦截目标对象的以下操作:
	- proxy(...args)  proxy是函数的代理
	- Function.prototype.apply() 和 Function.prototype.call()
	- Reflect.apply()

```js
var p = new Proxy ( function () {} , {
	apply : function ( target , thisArg , argumentsList ) {
		console.log ( "called: " + argumentsList.join ( ", " ) );
		return argumentsList[ 0 ] + argumentsList[ 1 ] + argumentsList[ 2 ];
	} ,
} );

console.log ( p ( 1 , 2 , 3 ) ); // "called: 1, 2, 3"; outputs 6
```

### handler.construct(target, argumentsList, newTarget)

- handler.construct(target, argumentsList, newTarget) 方法用于拦截 new 操作符。
	- target:  目标对象。
	- argumentsList:  constructor 的参数列表。
	- newTarget:  最初被调用的构造函数,就上面的例子而言是 p。
- construct() 方法必须返回一个对象。
- 该拦截器可以拦截以下操作:
	- new proxy(...args)   proxy是函数的代理
	- Reflect.construct()

```js
var p = new Proxy ( function () {} , {
	construct : function ( target , argumentsList , newTarget ) {
		console.log ( "called: " + argumentsList.join ( ", " ) );
		return { value : argumentsList[ 0 ] * 10 };
	} ,
} );
console.log ( new p ( 1 ).value ); // "called: 1"; outputs 10
```

### handler.isExtensible(target)

- handler.isExtensible(target) 方法用于拦截对对象的 Object.isExtensible()。
	- target: 目标对象。
	- 返回值:  isExtensible方法必须返回一个 Boolean 值或可转换成 Boolean 的值。

```js
var p = new Proxy ( {} , {
		isExtensible : function ( target ) {
			console.log ( "called" );
			return true; // 也可以 return 1; 等表示为 true 的值
		} ,
	} ,
);

console.log ( Object.isExtensible ( p ) ); // "called"; outputs true
```

### handler.ownKeys(target)

- handler.ownKeys(target) 方法用于拦截 Reflect.ownKeys().
	- target:  目标对象。
	- 返回值: ownKeys 方法必须返回一个可枚举对象。

```js
var p = new Proxy ( {} , {
		ownKeys : function ( target ) {
			console.log ( "called" );
			return [ "a" , "b" , "c" ];
		} ,
	} ,
);
console.log ( Object.getOwnPropertyNames ( p ) ); // "called"; outputs [ 'a', 'b', 'c' ]
```

# 编码和解码

- `encodeURIComponent(URIComponent)`; 适用于编码 URI 中的单个组件（如查询参数、路径的一部分、哈希值等）。
	- URIComponent: 一个 string 。若不是 string,则先转换为 string。
	- 转义除了如下所示外的所有字符:`A-Z a-z 0-9 - _ . ! ~ * ' ( )`
	- 返回值: 被编码后的新字符串。
- `decodeURIComponent(URIComponent)` 解码 encodeURIComponent 转化的 URI
	- URIComponent: encodeURIComponent 编码后的 URI
	- 返回值: encodeURIComponent 编码之前的 URI。
- `encodeURI(URI)`; 用于编码整个 URI（如协议、主机名、路径等）。保留 URI 结构。
	- URI: 一个完整的 URI。
	- 只会编码那些在 URI 中无效的字符( `; , / ? : @ & = + $ 字母 数字 - _ . ! ~ * ' ( ) #`)。
	- 返回值: 被编码后的新字符串。
- `decodeURI(encodedURI)` 解码 encodeURI 编码的 URI
	- encodedURI:  一个 decodeURI 编码过的 URI
	- 返回值: 返回 encodeURI 编码之前的 URI。
- `btoa(stringToEncode)` 方法可以将一个二进制字符串编码为 Base64 编码的 ASCII 字符串。
	- stringToEncode: 一个需要编码的二进制字符串。
	- 返回值: 一个包含 stringToEncode 的 Base64 表示的 ASCII 字符串。
- `atob(encodedData)` 对经过 base-64 编码的字符串进行解码。
	- encodedData:经过 base-64 编码的字符串
	- 返回值:经过 base-64 编码的字符解码的结果


# Reflect

Reflect 是一个内置的对象,它提供拦截 JavaScript 操作的方法。这些方法与 proxy handler  的方法相同。Reflect 不是一个函数对象,因此它是不可构造的。

- `Reflect.get(target, key[, receiver])`
	- target: 目标对象。
	- key: 需要获取的属性名。
	- receiver(可选): 如果 获取的属性是 getter,receiver 则为 getter 调用时的 this 值。
```js
	let obj={
		a: 1,
		b: 2,
		get c() {return this.a+this.b;},
	};
	const p=new Proxy(obj,{
		get(target,key,receiver) {
			console.log('read',key,target[key]);
			//读原始对象中的c,打印d
			// return target[ key ];
			//直接读取 receiver 属性,将无限递归爆栈
			// return receiver[ key ];
			//调用obj.d的getter函数将this指向p,然后读p的a,b属性,打印d,a,b
			return Reflect.get(target,key,receiver);
		},
	});
	console.log(p.c)
```
- `Reflect.set(target, key, value[, receiver])`
	- target: 目标对象。
	- key: 需要设置的属性名。
	- value: 需要设置的属性值。
	- receiver(可选):
		- 若target[key]为setter,receiver则为setter调用时的this值。
		- 否则直接赋值到receiver,若receiver[key] 为setter,则什么也不做
```js
	let a={ n:111 };
	let b={
		set x (num) {console.log('b',this)}
	};
	//target[key]不是setter且receiver[key] 为setter,什么也不做
	Reflect.set(a,'x',222,b);
	console.log(a);//{ n: 111 }
	console.log(b);//{ set x }
```
- `Reflect.deleteProperty(target, propertyKey)` 删除属性,返回该属性是否被成功删除。
- `Reflect.setPrototypeOf(target, prototype)` 设置对象的原型。返回是否操作成功
- `Reflect.ownKeys(target)` 返回一个由目标对象自身的属性键组成的数组。包括不可枚举和symbol值.
- `Reflect.has(target, key)` 检查是否拥有某个属性,包括不可枚举和原型链,相当于in 操作符。
- `Reflect.apply(target, this, argumentsList)` 指定this和参数对目标函数调用。返回函数调用返回值

# toLocaleString

toLocaleString() 方法返回一个表示对象的字符串。该方法旨在由派生对象重写,以达到其特定于语言环境的目的。
重写此方法的所有对象最多只能接受两个参数,分别对应于 locales 和 options,

- `xxx.toLocaleString()`; 使用默认的本地化格式
- `xxx.toLocaleString(locales)`; 指定区域
- `xxx.toLocaleString(locales, options)`; 指定区域和配置

## date日期


## number 数字

```js
const number = 1234567.89;
// 使用用户默认的本地化格式化数字,结果为 "1,234,567.89"
number.toLocaleString();
// 将数字格式化为人民币货币,并按照中国大陆的本地化规则显示,结果为 "¥1,234,567.89"
number.toLocaleString("zh-CN", { style: "currency", currency: "CNY" });
//将数字转换为美元货币格式,输出:"$1,234,567.89"
number.toLocaleString('en-US',{style: 'currency',currency: 'USD'});

```

# eval 动态执行代码

eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。

- `eval('var num = 1')` 函数会将传入的 string 当做 JavaScript 代码进行执行。
	- 同步执行,局部作用域,使用 var 声明的变量可以在当前作用域访问
	- 返回字符串中代码的返回值。如果为空,则返回 undefined。
