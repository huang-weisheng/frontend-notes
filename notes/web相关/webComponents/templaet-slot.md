# <template>：内容模板元素

- <template> :内容模板元素可以视为一个可存储在文档中以便后续使用的内容片段。元素内容不会被渲染。

- 此元素仅包含全局属性。和 content , 这个属性是只读的DocumentFragment 包含了模板所表示的 DOM 树。

```html
<table id="producttable" border>
	<tbody id="tbody">
		<!-- 现有数据可以可选地包括在这里 -->
	</tbody>
</table>
<template id="template">
	<tr>
		<td>td[0]</td>
		<td>td[1]</td>
	</tr>
</template>
<script>
	let template=document.querySelector('#template');
	let	td=template.content.querySelectorAll('td');
	let tbody=document.getElementById('tbody');
	// 克隆新行并将其插入表中
	let	clonedTemplate1=template.content.cloneNode(true);
	tbody.appendChild(clonedTemplate1);
	// 克隆新行并将其插入表中
	let clonedTemplate2=template.content.cloneNode(true);
	tbody.appendChild(clonedTemplate2);
</script>
```

# <slot>

- HTML <slot> 元素，作为 Web Component 技术套件的一部分，是 Web 组件内的一个占位符。该占位符可以在后期使用自己的标记语言填充，这样你就可以创建单独的 DOM 树, 并将它与其他的组件组合在一起。
- 此元素有全局属性。还有 name 属性:  插槽的名字。拥有 name 属性的插槽叫具名插槽。

```html
<body>
	<template id="my-paragraph">
		<p>
			<!-- 显示所有接收到的没有slot属性的数据,text和 book -->
			<slot>default</slot>
			<!--第一个插槽已经被接收过了,所以这个显示默认值 -->
			<slot>default</slot>
			<!-- 显示所有 slot=my 的插槽, 123 和 456 -->
			<slot name="my">default</slot>
		</p>
	</template>
	<my-paragraph>
		<!-- 这个传给第一个默认插槽中显示 -->
		<p>text</p>
		<!-- 这个也传给第一个默认插槽中显示 -->
		<p>book</p>
		<!-- 这个传给第二个默认插槽中显示 -->
		<p slot="my">123</p>
		<!-- 这个也传给第二个默认插槽中显示 -->
		<p slot="my">456</p>
	</my-paragraph>
	<script>
		customElements.define(
			'my-paragraph',
			class extends HTMLElement {
				constructor() {
					super();
					let template=document.getElementById('my-paragraph');
					let templateContent=template.content;
					const shadowRoot=this.attachShadow({mode: 'open'});
					shadowRoot.appendChild(templateContent.cloneNode(true));
				}
			},
		);
	</script>
</body>
```
