// 声明全局变量
globalThis.a = 123;

function fn() {
	var a = 456;
	const fn1 = new Function('console.log(globalThis.a)');
	fn1(); // 会打印 123
}

fn();