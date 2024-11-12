# 影子 DOM ( Shadow DOM )

- Shadow DOM 内的样式不会影响外部,从而便于实现封装
- Shadow DOM 附加到一个常规元素上.附加后将只显示 shadow DOM 中的内容

Shadow DOM 特有的术语:
	- Shadow host:一个常规 DOM 节点,Shadow DOM 会被附加到这个节点上。
	- Shadow tree:Shadow DOM 内部的 DOM 树。
	- Shadow boundary:Shadow DOM 结束的地方,也是常规 DOM 开始的地方。
	- Shadow root: Shadow tree 的根节点。

## 基本用法:

`Element.attachShadow({mode})` 将一个 shadow root 附加到任何一个元素上。
当 mode 为 open 时,Element.shadowRoot 属性将返回 Shadow DOM 根节点供操作,
当 mode 为 closed 时,Element.shadowRoot 属性将返回 null

```html
<h1 style="color: red;" class="h1">h1</h1>
<main></main>
<script>
	let main=document.querySelector('main');
	let h1=document.querySelector('.h1');
	// 将一个 shadow root 附加到元素上,将只显示 shadow root 中的内容,并返回对 ShadowRoot 的引用
	let quoteShadow=main.attachShadow({mode: 'open'});
	// 将 h1 添加到 shadow root 中,main 将显示 h1
	quoteShadow.append(h1);
	// 获取 shadow root
	console.log(main.shadowRoot);
</script>
```
