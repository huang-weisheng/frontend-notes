# Web Component

Web Component  允许你创建可重用的定制元素(它们的功能封装在你的代码之外)并且在你的 web 应用中使用它们。
Web Components  由三项主要技术组成,它们可以一起使用来创建封装功能的定制元素,可以任何地方重用,不必担心代码冲突。
1. Custom element(自定义元素):一组 JavaScript API,允许您定义 custom elements 及其行为,然后可以在您的用户界面中按照需要使用它们。
2. Shadow DOM(影子 DOM):用于将封装的影子DOM树附加到常规元素并控制。影子 DOM 内的所有代码都不会影响外部,不用担心与文档的其他部分发生冲突。
3. HTML template(HTML 模板): <template> 和 <slot> 元素使您可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

## 实现 web component 的基本方法通常如下所示:

1. 创建一个类或函数来指定 web 组件的功能
2. 使用 customElements.define() 方法注册您的新自定义元素,并向其传递要定义的元素名称、指定元素功能的类、以及可选的其所继承自的元素。
`customElements.define(name, constructor, options)`
- name
	- 自定义元素名。
- constructor
	- 自定义元素构造器。
- options (可选)
	- 控制元素如何定义。目前有一个选项支持: extends. 指定继承的已创建的元素。被用于创建自定义元素。
- 你可以创建两种类型的自定义元素:
	- 自主定制元素:独立元素; 它们不会从内置 HTML 元素继承。
	- 自定义内置元素:这些元素继承自 - 并扩展 - 内置 HTML 元素.

3. 如果需要,使用 Element.attachShadow() 方法将一个 shadow DOM 附加到自定义元素上。
4. 如果需要,使用 <template> 和 <slot> 定义一个 HTML 模板。再次使用常规 DOM 方法克隆模板并将其附加到您的 shadow DOM 中。
5. 在页面任何您喜欢的位置使用自定义元素,就像使用常规 HTML 元素那样。

## 使用生命周期回调函数

* 在 custom element 的构造函数中,可以指定多个不同的回调函数,它们将会在元素的不同生命时期被调用:
	- connectedCallback:当 custom element 首次被插入文档 DOM 时,被调用。
	- disconnectedCallback:当 custom element 从文档 DOM 中删除时,被调用。
	- adoptedCallback:当 custom element 被移动到新的文档时,被调用。一般是 iframe
	- attributeChangedCallback: 当 custom element 增加、删除、修改自身属性时,被调用。

```html
<body>
	<!-- user-card 元素的模板,定义html结构和样式,并不会显示或运行 -->
	<template id="userCardTemplate">
		<style>
			/* 自定义组件的宿主元素 */
			:host {
				display: block;
				/*宿主元素必须设置为包含块才能被子元素撑开(position和display的部分属性) */
				border: 15px solid rgb(108, 250, 7);
			}
			.container {
				background: rgb(231, 231, 7);
				padding: 20px;
			}
		</style>
		<div class="container">
			<button class="button">button</button>
		</div>
	</template>
	<!--自主定制元素-->
	<user-card></user-card>
	<!--自定义内置元素-->
	<p is="word-count"></p>
	<script>
		//若 customElements.define 时没有配置 extends,定义为自主定制元素,必须继承自 HTMLElement
		class UserCard extends HTMLElement {
			constructor() {
				// Always call super first in constructor
				super();
				//将一个 shadow root 附加到元素上,并返回对 ShadowRoot 的引用，影子 DOM 内的样式不会影响外部
				var shadow=this.attachShadow({mode: 'open'});
				//获取模板内容
				var templateElem=document.getElementById('userCardTemplate');
				//克隆模板内容
				var content=templateElem.content.cloneNode(true);
				//获取模板内容中的 button 元素
				this.$button=content.querySelector('.container>.button');
				//为 button 元素注册点击事件
				this.$button.onclick=() => alert('被点击了');
				//将模板内容添加到 shadow DOM 中
				shadow.append(content);
			}
			//当自定义元素被添加到 DOM 时,会调用 connectedCallback 方法
			connectedCallback() {
				console.log('Custom square element added to page.');
			}
			//当自定义元素被添加到 DOM 时,会调用 adoptedCallback 方法
			adoptedCallback() {
				console.log('Custom square element removed from page.');
			}
			//当自定义元素被添加到 DOM 时,会调用 disconnectedCallback 方法
			disconnectedCallback() {
				console.log('Custom square element moved to new page.');
			}
			//当自定义元素的属性发生变化时,会调用 attributeChangedCallback 方法
			attributeChangedCallback(name,oldValue,newValue) {
				console.log('Custom square element attributes changed.');
			}
		}
		//不使用 extends 定义为自主定制元素 user-card,UserCard 必须继承自 HTMLElement
		window.customElements.define('user-card',UserCard);

		//自定义元素构造函数继承的类必须和 customElements.define 注册时指定的类对应
		class WordCount extends HTMLParagraphElement {
			constructor() {
				super();
				this.textContent='custom HTMLParagraphElement';
			}
		}
		//使用 extends 定义为自定义内置元素 p,用法 <p is="word-count"></p>,WordCount 继承的类必须和 extends 指定的类对应
		window.customElements.define('word-count',WordCount,{extends: 'p'});
	</script>
</body>
```
