# <center> BOM(浏览器对象模型) </center>

## 谷歌浏览器取消跨域限制

谷歌浏览器图标右键属性=>目标栏的地址改为下边内容, --前有空格

版本49之后:  "C:...\chrome.exe" --disable-web-security --user-data-dir=C:\MyChromeDevUserData
版本49之前:  --disable-web-security

## 获取网页运行平台

 ```javascript
var userAgent = navigator.userAgent;
if ( userAgent.indexOf ( 'iPhone' ) !== - 1 ) {
	alert ( '这是移动端的iphone平台' )
}
else if ( userAgent.indexOf ( 'Android' ) !== - 1 ) {
	alert ( '这是移动端安卓平台' )
}
else if ( userAgent.indexOf ( 'Macintosh' ) !== - 1 ) {
	alert ( 'mac桌面平台' )
}
else if ( userAgent.indexOf ( 'Windows' ) !== - 1 ) {
	alert ( 'windows桌面平台' )
}
```

# <center> DOM(文档对象模型) </center>

## 判断节点包含关系

Node.contains 方法返回一个布尔值,表示一个节点是否是给定节点的后代
- `parent.contains(child)`  判断一个节点是否包含另一个节点,（也可以是当前元素本身）。

## 查找祖先元素

Element.closest 匹配特定选择器且离当前元素最近的祖先元素（也可以是当前元素本身）。
`el.closest(selectors)` selectors 是指定的选择器，比如 "p:hover, .toto + q"。

## 平滑滚动

```css
* {
	scroll-behavior: smooth;
}
```

```js
//smooth :平滑滚动;instant:直接跳转到指定位置;auto 或缺省值表示浏览器会自动选择滚动时的过渡效果。
Element.scrollTo ( { top : 200 , left : 200 , behavior : 'smooth' , } );
```

## 获取元素样式

 getComputedStyle('元素').属性 来获取最终css计算后属性。

## 坐标和尺寸

- innerHeight innerWidth 浏览器视口区域的尺寸 (包含滚动条)
- outerHeight outerWidth 整个浏览器应用窗口的尺寸
- screen.height(width)  显示器的尺寸
- devicePixelRatio 返回当前显示设备的物理像素分辨率与CSS 像素分辨率之比。(将几个物理像素渲染为一个css像素)

## 元素位置宽高信息

element.offsetParent即包含块

- element.offsetParent 返回一个指向最近的（指包含层级上的最近）包含该元素的定位元素（position 不是 static）或者最近的table,td,th,thead,tfoot,tr元素。
- element.offsetWidth( offsetHeight )返回元素不计算transform属性布局宽高,包含了 content border padding 滚动条,
- element.offsetLeft( offsetTop ) 返回当前元素不计算transform属性左上角相对于其 offsetParent 元素的左部(顶部)内边距的距离。
- dom元素.getBoundingClientRect() 返回一个DOMRect对象,提供了元素计算完transform的最终样式的大小及其相对于视口的位置.
- element.clientHeight（clientWidth）返回该元素自身的宽（高）包含内边距，（不包含边框、滚动条）
- element.scrollTop（scrollLeft）(可写) 返回该元素的滚动条滚动时被卷进去的内容的上侧及左侧距离，返回值不带单位（就是滚动条滚动距离）
- element.scrollWidth（scrollHeight）返回自身的实际(内边距)宽（高）（不含边框）文档内容实际高度，包括超出视窗的溢出部分

## DOM属性 (attributes & dataset)

- Element.attributes 获取当前元素的所有属性节点
- Element.getAttribute(key) 获取某个属性
- Element.setAttribute(key,value) 为元素设置属性
- Element.removeAttribute(key) 移除某个属性
- Element.dataset 提供了对元素上自定义数据属性（data-*）读/写访问 操作自定义属性

```js
	el.dataset.abc; //访问属性
	el.dataset.example = null; //设置属性
	delete el.dataset.abc; //删除属性
```

## DOMParser

DOMParser 可以将存储在字符串中的 XML 或 HTML 源代码解析为一个 DOM Document。

- var parser = new DOMParser(); 新建一个 DOMParser 对象实例。
- let doc = domparser.parseFromString(str, mimeType); 将包含HTML或XML的字符串解析为HTMLDocument或XMLDocument。
	- str: 要分析的字符串。它必须包含 HTML、XML、XHTML 或 svg 文档。
	- mimeType: 一个字符串。此字符串确定是使用 XML 分析器还是 HTML 分析器来分析字符串。有效值为：
		- text/html
		- text/xml
		- application/xml
		- image/svg+xml
	- 基于 mimeType 参数，返回 Document 或 XMLDocument 或其他文档类型。

```js
// 创建一个 DOMParser 实例
const parser = new DOMParser();
// 将 HTML 字符串解析为 Document 对象;
const doc = parser.parseFromString(string, 'text/html');
//doc 是一个完整的 Document 对象，你可以使用标准的 DOM 方法和属性来操作这个 Document 对象。
doc.querySelector('li')
```
## 获取页面元素

-  getElementsBy     返回的是动态集合, 会随文档改变, ById这种返回元素的除外
-  querySelectorAll  获取的是静态集合,取出来之后就和文档的改变无关了

## 获取相关节点

- `el.children` 获取当前元素的所有子元素节点的伪数组[元素节点]
- `el.childNodes` 返回一个当前元素所有子节点的伪数组[元素节点, 文本节点, 注释节点,...]
- `el.parentNode` 获取父节点 可以链式使用 最顶级的父节点就是document
- `el.firstChild` 获取的是当前元素的第一个子节点
- `el.firstElementChild` 获取的是当前元素的第一个子元素节点
- `el.lastChild` 获取的是当前元素的最后一个子节点
- `el.lastElementChild` 获取的是当前元素的最后一个子元素节点
- `el.nextSibling` 获取下一个兄弟节点
- `el.previousSibling` 获取上一个兄弟节点
- `el.nextElementSibling` 获取下一个兄弟元素节点
- `el.previousElementSibling` 获取上一个兄弟元素节点

## 操作节点

- `Element.remove()` 把对象从 DOM 树中删除。(较新)
- `Document.createDocumentFragment()` 创建一个新的空白的文档片段
- `parent.append(Element)`  某个节点子节点末尾增加一个子节点 增加节点
- `parent.insertBefore('要插入的节点','插入到谁的前面')` 插入节点
-` parent.removeChild(Element)` 移除节点
- `parent.replaceChild('新节点','旧节点')` 替换节点
- `Element.cloneNode(true)` 传入true表示深度克隆,会克隆当前元素的所有子节点
