
## Animation   动画

Element 接口的 animate（） 方法是创建一个新的 Animation 的便捷方法，将它应用于元素，然后运行动画。它将返回一个新建的 Animation 对象实例

offset: 关键帧的 offset 偏移量指定为介于0.0和1.0之间的数字或为null。这相当于使用@keyframes在 CSS 样式表中以百分比指定开始和结束状
态。如果此值为null或缺失，则关键帧将在相邻关键帧之间均匀分布。

并非所有的关键帧都需要设置 offset。没有指定 offset 的关键帧将与相邻的关键帧均匀间隔。 可以通过提供easing过渡来给指定关键帧之间应用过渡效果

两个特色的 css 属性：

- float, 必须写成 cssFloat ，因为"float" 是 JavaScript 的保留关键字
- offset, 必须写成 cssOffset ，因为"offset" 表示如下的关键帧 offset

```html

<style >
	div::after {
		content: "";
		display: block;
		width: 100px;
		height: 50px;
		background: red;
	}
</style >
<div style = "background: green;height: 50px" onclick = "playAnimate()" ></div >
<script >
	function playAnimate () {
		let dv = document.querySelector ( 'div' );
		let dh = dv.animate ( [
				{
					easing : 'linear' ,
					height : '500px' ,
					offset : 1 ,
				} ,
			] ,
			{
				duration : 2000 , //动画持续时间
				iterations : 2 , //动画执行的次数
				delay : 0 , //延迟动画开始的毫秒数。默认值为 0。
				fill : 'forwards' , // 动画在执行之前和之后如何将样式应用于其目标,见css animation-fill-mode
				direction : 'alternate' ,//动画播放方向,见css animation-direction
				endDelay : 100 ,//动画结束后延迟的毫秒数(这个时间后动画完成)。默认值为 0。
				iterationStart : 0.5 ,//动画迭代开始处，0.5 表示在第一次迭代的中途开始, 设置此值后,具有2 次迭代的动画将在第三次迭代中途结束.
				// pseudoElement : '::after' , //伪元素选择器.如果存在，则该效果将应用于 的选定伪元素，而不是其自身。
				id : 'dvAnimation' , //id: 在 animate() 里可作为唯一标识的属性：一个用来引用动画的字符串。
			} ,
		);
		dv.onclick = () => {
			dh.playState !== 'running' ? //动画的状态
				dh.play () ://启动或恢复动画的播放。如果动画完成，调用将重新启动动画，从头开始播放。play()
				dh.pause ();//暂停动画
			// dh.finish ();//立即完成动画,触发dh.finished的回调函数
			// dh.reverse ();//让动画立即向反方向播放,相当于设置dh.playbackRate * - 1
			// dh.playbackRate = dh.playbackRate * - 1; //返回或设置动画的播放速率。
		};
		dv.oncontextmenu = ( e ) => {
			dh.commitStyles ();//将当前动画样式提交为元素行内样式属性,即使取消动画依然保留提交的样式;不能用于伪元素;
			dh.cancel ();//清除此动画造成的所有 KeyframeEffect，并中止其播放。会使其恢复元素样式
			e.preventDefault ();
		};
		dh.onfinish = () => {//每次动画播放完毕时,或调用Animation.finish（)方法立即导致动画完成都会触发。
			console.log ( 'onfinish事件执行' );
		};
		dh.oncancel = () => {//每次动画播放完成时,或调用Animation.finish（)方法立即导致动画完成都会触发。
			console.log ( 'oncancel事件执行' );
		};
		dh.finished.then ( r => {//finished:一个表示动画的完成状态promise属性。动画第一次播放完毕时成为完成状态
			console.log ( 'finished===动画完成' , r );//r就是dh
			dv.getAnimations ( { subtree : true } )//subtree:是否同时获取后代元素的动画,此数组包括 CSS 动画、CSS 过渡和 Web 动画
			.forEach ( animation => {animation.cancel ();} ); //清除此动画的所有keyframeEffects，并中止播放。(动画保持的样子失效)
		} );
	}
</script >
```

## IntersectionObserver (监视元素交叉)

IntersectionObserver 接口（从属于 Intersection Observer API）提供了一种异步观察目标元素与其祖先元素或顶级文档视口（viewport）交叉状态的方法。其祖先元素或视口被称为根（root）。
```javascript
	let root=document.querySelector('.root');
	let ob=new IntersectionObserver((entries) => {   //触发满足交叉条件时执行的函数
		entries.forEach(entrie => { // 参数entries是所有监听元素交叉情况组成的数组
			console.log(entrie.isIntersecting);//与根元素的交叉状态
			entrie.target;  //取得监听的对象
		});
	},{
		//用作视口的元素，用于检查目标的可见性。必须是目标的祖先,默认为浏览器视口。
		//目标在根的可见区域的任何不可见部分都会被视为不可见
		root: root,
		rootMargin: '-50px 0px', //这组值用于增大或缩小根元素的每一侧的计算范围后再计算交叉
		threshold: 1,//目标可见度达到多少时触发回调,默认0, 最大1
	});
	let el=document.querySelector('.dv');
	ob.observe(el); //开始观察el
	ob.unobserve(el); //取消观察 el
	ob.disconnect(el); //终止对所有目标元素可见性变化的观察。
```

## ResizeObserver 监听元素内容或边框盒（即元素的大小）变化

ResizeObserver 接口监视 Element 内容盒或边框盒或者 SVGElement 边界尺寸的变化。
```js
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    console.log('Element:', entry.target);
    console.log('Element size:', entry.contentRect);
  }
});

const element = document.querySelector('#some-element');
// 开始观察 element 元素
resizeObserver.observe(element);
// 停止观察所有已观察的元素
resizeObserver.disconnect();
// 停止对 element 元素的监听
resizeObserver.unobserve(element);

```

## MutationObserver 监听DOM树中的变化

比如节点的增删改，属性的修改，文本内容的修改等。

语法: mutationObserver.observe(target[, options])
- target: DOM 树中的一个要观察变化的 DOM Node (可能是一个 Element)，或者是被观察的子节点树的根节点。
- options: 配置项描述了 DOM 的哪些变化应该报告给 MutationObserver 的 callback。
	- childList、attributes 和 characterData 中，必须有一个参数为 true。
	- subtree: 监听以target为根节点的整个子树。包括子树中所有节点的属性，不仅针对 target。默认为 false。
	- childList: 当为 true 时，监听 target 节点中发生的节点的新增与删除（同时，如果 subtree 为 true，会针对整个子树生效）。默认值为 false。
	- attributes: 当为 true 时观察所有监听的节点属性值的变化。默认值为 false,当声明了 attributeFilter 或 attributeOldValue，默认值则为 true
	- attributeFilter: 一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。
	- attributeOldValue: 指定是否在监视节点属性值的变化时记录旧属性。默认值为 false
	- characterData: 指定是否观察文本节点（即 DOM 中的字符数据）的变化。默认值则为 false,如果指定characterDataOldValue,则默认为 true
	- characterDataOldValue: 指定是否在监视到文本内容变化时记录旧的文本内容。默认值为 false


```js
const mutationObserver=new MutationObserver(mutations => {
	mutations.forEach(mutation => {
		console.log(mutation);
	});
});

// 开始监听
const config={attributes: true,childList: true,subtree: true};
mutationObserver.observe(targetNode,config);

// 取消监听
mutationObserver.disconnect();
```

## js媒体查询 (matchMedia)

 ```javascript
//matchMedia(mediaQueryString)返回一个新的 MediaQueryList 对象
const myQuery = matchMedia ( '(min-width: 320px)' );
// 监听mQuery 当媒体查询的支持状况改变时，MediaQueryList 接口的 change 事件触发。
myQuery.onchange = ()=>{
	console.log ( '匹配的结果' , myQuery.matches );
}
 ```

## requestAnimationFrame(重绘前回调)

window.requestAnimationFrame()需要传入一个回调函数作为参数,该回调函数会在浏览器下一次重绘之前执行。

当 requestAnimationFrame()运行在后台标签页或者隐藏的 <iframe> 里时,requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。

警告： 请确保总是使用第一个参数（或其他一些获取当前时间的方法）来计算动画在一帧中的进度，否则动画在高刷新率的屏幕中会运行得更快。请参考下面示例的做法。

```js
window.requestAnimationFrame((timestamp) => {
	// 距离当前文档的时间起点的事件间隔
	console.log(timestamp);
});
```

## requestIdleCallback(空闲时回调)

window.requestIdleCallback() 方法插入一个函数，这个函数将在浏览器空闲时期被调用(没有需要执行的js,且未到达页面渲染时间)。
这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。
函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。

```html

<meta charset = "UTF-8" >
<style >
	@keyframes slide {
		0% {
			left: 0%;
		}
		100% {
			left: 80%;
		}
	}
</style >
<button onclick = "directCall()" >直接调用</button >
<button onclick = "freeCalling()" >闲置时调用</button >
<div style = "width: 100px;	height: 100px;	animation: 3s slide infinite;position: absolute;background: #19b919;" ></div >
<script >
	let n = 0;
	function directCall () {
		while ( n < 300 ) {
			let random = Math.random ();
			if ( random > 0.999999 ) {
				console.log ( random , ++ n );
			}
		}
		n = 0;
	}
	function freeCalling () {
		if ( n < 300 ) {
			requestIdleCallback (
				//一个在事件循环空闲时即将被调用的函数的引用。函数会接收到一个名为 IdleDeadline 的参数，这个参数可以获取当前空闲时间以及回调是否在超时时间前已经执行的状态。
				deadline => {
					if ( deadline.timeRemaining () > 0 ) {
						let random = Math.random ();
						while ( random < 0.999999 ) {
							random = Math.random ();
						}
						//didTimeout:一个布尔值，如果回调是因为超过了设置的超时时间而被执行的，则其值为 true。
						//timeRemaining ():返回一个浮点数，用来表示当前闲置周期的预估剩余毫秒数。如果闲置期已经结束，则其值为 0。
						console.log ( random , ++ n , deadline.didTimeout , deadline.timeRemaining () );
					}
					freeCalling ();
				} ,
				//如果指定了 timeout,而回调在 timeout 毫秒过后还没有被调用，那么回调任务将放入事件循环中排队，即使这样做有可能对性能产生负面影响。
				{ timeout : 500 } ,
			);
		}
		else {
			n = 0;
		}
	}
</script>
```
