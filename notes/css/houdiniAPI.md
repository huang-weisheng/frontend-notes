# houdiniAPI

Houdini 是一组底层 API,它们公开了 CSS 引擎的各个部分,从而使开发人员能够通过加入浏览器渲染引擎的样式和布局过程来扩展 CSS。Houdini 是一组 API,它们使开发人员可以直接访问 CSS 对象模型（CSSOM）,使开发人员可以编写浏览器可以解析为 CSS 的代码,从而创建新的 CSS 功能,而无需等待它们在浏览器中本地实现。

## @property

@property CSS at-rule是CSS Houdini API 的一部分,它允许开发者显式地定义他们的CSS 自定义属性, 允许进行属性类型检查、设定默认值以及定义该自定义属性是否可以被继承。

@property 规则提供了一个直接在样式表中注册自定义属性的方式，而无需运行任何 JS 代码。有效的 @property 规则会注册一个自定义属性，就像 CSS.registerProperty 函数被使用同样的参数调用了一样。

```CSS
/** @property 规则中 syntax 和 inherits 描述符是必需的; 如果其中任何一项缺失，整条规则都将失效并且会被忽略。 initial-value 描述符仅在 syntax 描述符为通用 syntax 定义时是可选的，否则initial-value也是必需的——如果此时该描述符缺失，整条规则都将失效且被忽略。*/
@property --my-stats {
	syntax: "<percentage>";/**指定属性值的类型或格式。 */
	inherits: true;/**表示这个属性是否会从父元素继承值 */
	initial-value: 0%;/**定义属性的初始值。当没有设置该属性时，元素将使用这个初始值。*/
}
/** 实现渐变背景动画 */
div{
	background-image: radial-gradient(red var(--item-size),green );
	animation: movable 2s infinite;
}
@keyframes  movable {
	50%{
		--my-stats:100%
	}
}
```
syntax 属性用于定义自定义 CSS 属性的值类型，常用的取值包括：
- <number>: 表示数字值，例如 1.5 或 42。
- <percentage>: 表示百分比值，例如 50%。
- <length>: 表示长度值，例如 px、em、rem、vh 等。
- <boolean>: 表示布尔值，通常取值为 true 或 false。
- <color>: 表示颜色值，例如 #ff0000、rgb(255, 0, 0)、rgba(255, 0, 0, 0.5) 等。
- <url>: 表示 URL 值，例如 url('image.png')。
- <string>: 表示字符串值，例如 "hello"。
- <object>: 表示对象值，通常用于复杂数据类型。
