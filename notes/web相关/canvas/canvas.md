# canvas (可替换元素)

1. 默认尺寸:Canvas 的默认大小是 300 像素宽 * 150 像素高。
2. 尺寸设置:Canvas 的尺寸应该使用 HTML 属性或 CSS 像素值来设置,而不是百分比。
3. 图形类型:Canvas 支持两种基本的图形绘制方式:
   - 矩形:可以直接绘制矩形。
   - 路径:由一系列点连接而成的线段，可以用来创建各种复杂形状。
4. 复杂图形:所有其他类型的图形（如圆形、椭圆、多边形等）都是通过组合一条或多条路径来创建的。
5. 像素操作:Canvas 可以被视为一个位图图像，允许直接操作像素数据。
6. 动态性:Canvas 内容是即时渲染的，不会保存在 DOM 中，这使得它特别适合动画和游戏开发。

## 初始化一个canvas元素

该元素可以使用CSS来定义大小,但在绘制时图像会伸缩以适应它的框架尺寸:如果 CSS 的尺寸与初始画布的比例不一致,它会出现扭曲。

```html
<canvas id = "tutorial" width = "1000"	height = "500" ></canvas >
```

使用 document.getElementById() 方法来为 canvas 元素得到 DOM 对象。有了对象后,可以通过使用它的 getContext() 方法来访问绘画上下文。

```js
var canvas = document.getElementById ( 'tutorial' );//为 <canvas> 元素得到 DOM 对象。
var ctx = canvas.getContext ( '2d' );//获得渲染上下文和它的绘画功能,接受一个参数,即上下文的类型。
```

## canvas绘制方式

canvas只支持两种形式的图形绘制:矩形和路径(由一系列点连成的线段)。所有其他类型的图形都是通过一条或者多条路径组合而成的。

### 矩形(清除)

canvas 提供了三种方法绘制矩形:

```js

/* fillRect()方法绘制一个填充了内容的矩形,参数为(x,y,width,height)。
 此方法直接在画布上绘制填充,并不修改当前路径,后面调用 fill() 或者stroke()方法并不会对这个方法有影响。 */
ctx.fillStyle='red';
ctx.fillRect ( 20 , 10 , 150 , 100 );

/* strokeRect()方法绘制一个描边矩形,参数为(x,y,width,height)。
 此方法直接绘制到画布而不修改当前路径,因此任何后续fill() 或stroke()调用对它没有影响。 */
ctx.strokeStyle='green';
ctx.strokeRect(220,10,160,100);

/* clearRect() 清除画布指定区域,参数为(x,y,width,height)*/
ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );
```

### 路径

1. 图形的基本元素是路径。
2. 路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合。
3. 本质上,路径是由很多子路径构成,这些子路径都是在一个列表中
4. 所有的子路径(线、弧形、等等)构成图形。
5. 使用路径绘制图形需要一些步骤。

	1. 列表清空重置,创建路径起始点,重新绘制新的图形。(beginPath)
	2. 使用moveTo()设置起点。可以用来绘制不连续的路径。
	3. 然后使用命令去画出路径。(moveTo,lineTo,arc,quadraticCurveTo,bezierCurveTo,rect)
	4. 一旦路径生成,你就能通过描边或填充路径区域来渲染图形。(stroke,fill)
	5. 填充路径时若未闭合,则自动闭合。(closePath)

```js
//一个基本示例
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(200,20);
ctx.lineTo(20,200);
ctx.closePath();
ctx.fill();
```

#### beginPath (初始化路径)

`void ctx.beginPath()` 清空子路径列表开始一个新路径。

#### moveTo (移动画笔)

`void ctx.moveTo(x, y)` 将画笔移动到指定的坐标点。

#### lineTo (线)

使用直线连接子路径的终点到 x,y 坐标的方法(并不会真正地绘制)。stroke () 才绘制

`ctx.lineTo ( 150 , 100 )`

#### arc (圆弧)

绘制圆弧路径的方法。

`void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise?)`

- x 圆心的 x 轴坐标。
- y 圆心的 y 轴坐标。
- radius 圆的半径。
- startAngle 圆弧的起点弧度。
- endAngle 圆弧的终点弧度。
- anticlockwise 可选的Boolean值,如果为 true,逆时针绘制圆弧,反之,顺时针绘制。

#### arcTo (圆角连接)

在起始点到控制点一再到控制点二的夹角上画一个与两条夹角线都相切的圆弧。然后圆弧起点连接第一条线的切点

`void ctx.arcTo(x1, y1, x2, y2, radius)`

- x1 第一个控制点的 x 轴坐标。
- y1 第一个控制点的 y 轴坐标。
- x2 第二个控制点的 x 轴坐标。
- y2 第二个控制点的 y 轴坐标。
- radius 圆角的半径。

#### ellipse (椭圆弧)

绘制椭圆弧路径的方法。

`void ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, counterclockwise?)`

- x 椭圆圆心的 x 轴（水平）坐标。
- y 椭圆圆心的 y 轴（垂直）坐标。
- radiusX 椭圆长轴的半径。必须为非负数。
- radiusY 椭圆短轴的半径。必须为非负数。
- rotation 椭圆的旋转角度，以弧度表示。
- startAngle 椭圆弧的起始偏心角，从正 x 轴沿顺时针测量，用弧度表示。
- endAngle 椭圆弧的结束偏心角，从正 x 轴沿顺时针测量，用弧度表示。
- anticlockwise 可选的Boolean值,如果为 true,逆时针绘制圆弧,反之,顺时针绘制。

#### quadraticCurveTo (二次贝塞尔曲线)

二次贝塞尔曲线路径的方法。起始点是当前路径最新的点,可以使用 moveTo() 方法改变起始点。

`void ctx.quadraticCurveTo(cpx, cpy, x, y)`

- cpx 控制点的 x 轴坐标。
- cpy 控制点的 y 轴坐标。
- x 终点的 x 轴坐标。
- y 终点的 y 轴坐标。

#### bezierCurveTo (三次贝赛尔曲线)

绘制三次贝赛尔曲线路径的方法。起始点是当前路径最新的点,可以通过调用 moveTo() 修改起始点。

`void ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`

- cp1x 第一个控制点的 x 轴坐标。
- cp1y 第一个控制点的 y 轴坐标。
- cp2x 第二个控制点的 x 轴坐标。
- cp2y 第二个控制点的 y 轴坐标。
- x 终点的 x 轴坐标。
- y 终点的 y 轴坐标。

#### rect (矩形)

创建一个矩形路径，其起始点位于 (x, y)，大小由 width 和 height 指定。

`void ctx.rect(x, y, width, height)`

- x 矩形起点的 x 轴坐标。
- y 矩形起点的 y 轴坐标。
- width 矩形的宽度。正值向右，负值向左。
- height 矩形的高度。正值向下，负值向上。

#### roundRect (圆角矩形)

创建一个圆角矩形，其起始点位于 (x, y)，大小由 width 和 height 指定。

`void ctx.roundRect(x, y, width, height, radii)`

- x 矩形起点的 x 轴坐标。
- y 矩形起点的 y 轴坐标。
- width 矩形的宽度。正值向右，负值向左。
- height 矩形的高度。正值向下，负值向上。
- radii 圆角半径。语法同borderRadius。[topLeft,topRight,bottomRight,bottomLeft](值为数字)

#### Path2D (声明路径)

- Path2D 声明一套路径方法,这些方法可以用来创建路径。
- Path2D 接口可以使用画路径的方法,除了 beginPath,stroke,fill。
- 在已有的路径上添加一条路径。
	`path1.addPath(path)` path: 需要添加的Path2D 路径。
- 创建一个Path2D 路径。
	`let path1 =new Path2D()`
	`let path1 =new Path2D(path)` 当传入另一个 Path2D 对象时，会创建一个 path 变量的拷贝。
	`let path1 =new Path2D(d)` 当传入 SVG path 数据构成的字符串时,会根据描述创建一个新的路径。

```js
// 创建第一个Path2D对象
let path1 = new Path2D();
path1.moveTo(50,50);
path1.lineTo(200,100);
// 创建第二个Path2D对象
let path2 = new Path2D();
path1.lineTo(300,50);
// 将path1添加到path2中
path2.addPath(path1);
// 对path2进行描边
ctx.stroke(path2);
// 创建一个新的Path2D对象，使用SVG路径字符串
let p = new Path2D("M10 10 h 80 v 80 h -80 Z");
// 填充这个路径
ctx.fill(p);
```


#### closePath (闭合路径)

`void ctx.closePath()`  若未闭合,通过绘制一条从当前点到开始点的直线来闭合图形。

#### stroke (描边)

使用非零环绕规则,通过线条来绘制图形轮廓。不会自动闭合路径

`void ctx.stroke()`
`void ctx.stroke(path)` path: 需要填充的Path2D 路径。

#### fill (填充)

根据当前的填充样式,填充当前或已存在的路径的方法。采取非零环绕或者奇偶环绕规则。 会自动闭合路径

`void ctx.fill()`
`void ctx.fill(fillRule)`
`void ctx.fill(path,fillRule)`
- path 需要填充的Path2D 路径。
- fillRule 一种算法,决定点是在路径内还是在路径外。 允许的值:
	- `nonzero` 非零环绕规则,默认的规则。
	- `evenodd` 奇偶环绕规则。。


## 使用样式和颜色

### fillStyle (填充颜色)

fillStyle 是 Canvas 2D API 使用内部方式设置图形填充颜色的属性。默认值是 #000 (黑色)。

`ctx.fillStyle = <color>`  color可以是CSS颜色值,渐变对象(CanvasGradient)或者图案对象。

### strokeStyle (描边颜色)

strokeStyle 是 Canvas 2D API 设置图形描边, stroke颜色的属性。默认值是 #000 (黑色)。

`ctx.strokeStyle = <color>`  color可以是CSS颜色值,渐变对象(CanvasGradient)或者图案对象。

### LinearGradient (线性渐变)

`ctx.createLinearGradient(x0, y0, x1, y1)` 方法会根据两个给定的坐标值所构成的线段创建一个线性渐变。
- 参数:起点x,起点y,终点x,终点y
- 返回值: CanvasGradient , 一个根据指定线路初始化的线性 CanvasGradient 对象。
	- CanvasGradient.addColorStop() 添加一个由偏移(offset)和颜色(color)定义的断点到渐变中。

```js
const gradient = ctx.createLinearGradient ( 20 , 0 , 220 , 0 );
ctx.lineWidth = 30;
gradient.addColorStop ( 0 , 'green' );
gradient.addColorStop ( 0.7 , 'red' );
gradient.addColorStop ( 1 , 'yellow' );
ctx.strokeStyle = gradient;
ctx.strokeRect ( 20 , 250 , 250 , 100 );
```

### RadialGradient(径向渐变)

`ctx.createRadialGradient(x0, y0, r0, x1, y1, r1)` 根据两个给定的坐标值所构成的圆创建一个径向渐变。
- 参数:开始圆形的 x,y 轴坐标,半径。结束圆形的 x,y 轴坐标,半径。
- 返回值: CanvasGradient , 一个根据指定线路初始化的径向 CanvasGradient 对象。
	- CanvasGradient.addColorStop() 添加一个由偏移(offset)和颜色(color)定义的断点到渐变中。

```js
const gradient=ctx.createRadialGradient(120,80,30,100,100,70);
ctx.lineWidth=30;
gradient.addColorStop(0,'red');
gradient.addColorStop(0.9,'yellow');
gradient.addColorStop(1,'green');
ctx.strokeStyle=gradient;
ctx.strokeRect(30,50,160,50);
```

### CanvasPattern (图案对象)

`ctx.createPattern(image, repetition)` 在指定的方向上重复图像。此方法返回一个CanvasPattern对象。
- image: 重复图像源的对象 可以是<img>, <video>,<canvas>,<image>
- repetition: 指定如何重复图像
	- repeat: 在水平和垂直方向上重复。
	- repeat-x: 只在水平方向上重复。
	- repeat-y: 只在垂直方向上重复。
	- no-repeat: 不重复。

```js
const img = document.createElement ( 'img' );
img.src = 'https://img.zcool.cn/community/0104c15cd45b49a80121416816f1ec.jpg@1280w_1l_2o_100sh.jpg';
img.onload = () => {
	// 创建一个缓冲 canvas 用来更改图像尺寸
	var bufferCanvas = document.createElement ( 'canvas' );
	var bufferCtx = bufferCanvas.getContext ( '2d' );
	bufferCanvas.width = 150;
	bufferCanvas.height = 200;
	bufferCtx.drawImage ( img , 0 , 0 , bufferCanvas.width , bufferCanvas.height );
	// 创建填充模式
	let pattern = ctx.createPattern ( bufferCanvas , 'repeat' );
	// 使用填充模式填充形状
	ctx.fillStyle = pattern;
	ctx.fillRect ( 0 , 0 , canvas.width , canvas.height );
};
```

### globalAlpha (全局透明度)

设置在 canvas 上绘图之前,设置图形和图片透明度的属性。数值的范围从 0.0(完全透明)到 1.0(完全不透明)。

`ctx.globalAlpha = <number>`  number: 0.0到1.0之间的数值。


### lineWidth (线的宽度)

`ctx.lineWidth = <number>`  number: 线条的宽度。

### lineCap (线段末端样式) lineJoin (线条间接合处的样式)

`ctx.lineCap = <string>`  string: 线段末端的样式。有3个可能的值,分别是:butt(默认), round,square。
	butt: 线段末端以方形结束。
	round: 在线段末端增加了一个直径为线段宽度的半圆。
	square: 线段末端以方形结束,但两端长度增加各增加线宽的一半
`ctx.lineJoin = <string>`  string: 线段连接处样式。有3个可能的值,分别是:miter(默认),round,bevel
	miter: 通过延伸相连部分的外边缘,使其相交于一点,形成一个额外的菱形区域。
	round: 连接处末端是一个半径是线段的宽度扇形圆角。
	bevel: 在相连部分的末端填充一个额外的以三角形为底的区域,每个部分都有各自独立的矩形拐角。
当 ctx.lineJoin = "miter" 时,ctx.miterLimit 属性有效。
`ctx.miterLimit = <number>`  number: 限制斜接长度的属性,默然为10,超过此值则以 " ] "显示

### setLineDash (虚线)

`ctx.setLineDash(segments)`
	- segments: 一个数组。描述交替绘制的线段和间距长度。如果数组长度是奇数,数组的元素会被复制并重复。
	例如: [5, 6, 7] 会变成 [5, 6, 7, 5, 6, 7],(交替描述线段和间距,然后重复)。
`ctx.getLineDash()` 返回一个数组,包含当前的虚线样式。[5, 6, 7] 会变成 [5, 6, 7, 5, 6, 7]
`ctx.lineDashOffset = <number>`  number: 设置虚线偏移量,正数向左偏移,负数向右偏移。


### 阴影 Shadows

shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离,它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸,正值则表示会往下或右延伸,它们默认都为 0。
shadowBlur 用于设定阴影的模糊程度,其数值并不跟像素数量挂钩,也不受变换矩阵的影响,默认为 0。
shadowColor 是标准的 CSS 颜色值,用于设定阴影颜色效果,默认是全透明的黑色。

`ctx.shadowColor = <color>`  color: 设置阴影颜色。
`ctx.shadowOffsetX = <length>`  length: 设置阴影在 X 轴的延伸距离。
`ctx.shadowOffsetY = <length>`  length: 设置阴影在 Y 轴的延伸距离。
`ctx.shadowBlur = <length>`  length: 设置阴影的模糊程度。

```js
// Rectangle
ctx.fillStyle = 'blue';
// Shadow
ctx.shadowColor = 'red';
ctx.shadowOffsetX = 25;
ctx.shadowOffsetY = 15;
ctx.shadowBlur = 10;
ctx.fillRect ( 20 , 20 , 150 , 100 );
```

## 绘制文本 (文本描边)

canvas 提供了两种方法来渲染文本:

`ctx.fillText(文本, x, y [, maxWidth])`  在指定的 (x,y) 位置填充指定的文本,绘制的最大宽度是可选的。
`ctx.strokeText(文本, x, y [, maxWidth])`  在指定的 (x,y) 位置绘制文本边框,绘制的最大宽度是可选的。

```js
ctx.font = "48px serif";
ctx.fillText ( "Hello world" , 10 , 50 );
ctx.strokeText ( "Hello world" , 10 , 100 );
```

### 文本样式

- `ctx.font = <string>`  string: 文本样式。语法同 CSS font 属性。默认的字体是 10px sans-serif。
- `ctx.textAlign = <string>`  string: 文本对齐。可选值包括:start(默认), end, left, right, center。
- `ctx.textBaseline = <string>`  string: 基线对齐,可选值:alphabetic(默认),top,hanging,middle,ideographic, bottom。
- `ctx.direction = <string>`  string: 文本方向。可选值:ltr, rtl, inherit(默认)。

### 获取文本宽度 (measureText)

`let info = ctx.measureText(文本)` 根据文本样式预测获取字符所占宽度,高度等信息。

## 使用图像

### 创建图像

可以使用这些类型中的一种作为图片的源:<img>,<image>,<video>,<canvas>

```js
var img = new Image (); // 创建一个<img>元素
img.src = "myImage.png"; // 设置图片源地址,可以使用data:url方式来引用图像
```

### 绘制图片

`ctx.drawImage(image, dx, dy)` 绘制源图像
- image: 图片源,允许任何的画布图像源
- dx: 源 image 的左上角在目标画布上 X 轴坐标。
- dy: 源 image 的左上角在目标画布上 Y 轴坐标。


`ctx.drawImage(image, dx, dy, dWidth, dHeight)` 缩放源图像
- dWidth: image 在目标画布上绘制的宽度。允许对绘制的图像进行缩放。如果不指定，在绘制时 image 宽度不会缩放。
- dHeight: image 在目标画布上绘制的高度。允许对绘制的图像进行缩放。如果不指定，在绘制时 image 高度不会缩放。

`ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)` 缩放裁剪源图像
- sx: 图片源的裁剪起始坐标x。
- sy: 图片源的裁剪起始坐标y。
- sWidth:图片源的裁剪宽度。使用负值将翻转这个图像。
- sHeight:图片源的裁剪高度。使用负值将翻转这个图像。

### imageSmoothingEnabled (设置图片是否平滑,抗锯齿)

 ```js
const img = new Image ();
img.src = "https://interactive-examples.mdn.mozilla.net/media/examples/star.png";
img.onload = () => {
	const w = img.width ,h = img.height;

	ctx.fillText ( "Source" , w * 0.5 , 20 );
	ctx.drawImage ( img , 0 , 24 );

	ctx.fillText ( "Smoothing = TRUE" , w * 2.5 , 20 );
	ctx.imageSmoothingEnabled = true;
	ctx.drawImage ( img , w , 24 , w * 3 , h * 3 );

	ctx.fillText ( "Smoothing = FALSE" , w * 5.5 , 20 );
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(img,20,20,50,50,w*4,24,w*3,h*3);
}
```

## 状态的保存和恢复

Canvas 的状态就是当前画面应用的所有样式和变形的一个快照。

- `ctx.save()`  当前的状态就被推送到栈中保存。可以调用任意多次
- `ctx.restore()` 每一次调用 restore,一个保存的状态就从栈中弹出,所有设定都恢复。

绘画状态包括以下内容：
1. 当前应用的变形(即移动,旋转和缩放)
2. 以下属性:strokeStyle, fillStyle, globalAlpha, lineWidth, lineCap, lineJoin, miterLimit,
   lineDashOffset, shadowOffsetX,shadowOffsetY, shadowBlur, shadowColor, globalCompositeOperation,
	font,textAlign, textBaseline, direction, imageSmoothingEnabled
3. 当前的裁切路径(clipping path),会在下一节介绍

```js
ctx.fillStyle = '#cd0';//设置1
ctx.fillRect ( 0 , 0 , 150 , 150 ); // 使用设置1绘制一个矩形
ctx.save (); // 保存设置1

ctx.fillStyle = '#09F'; // 设置2
ctx.fillRect ( 15 , 15 , 120 , 120 ); // 使用设置2绘制一个矩形
ctx.save (); // 保存设置2

ctx.fillStyle = '#FFF'; // 设置3
ctx.globalAlpha = 0.5;
ctx.fillRect ( 30 , 30 , 90 , 90 ); // 使用设置3绘制一个矩形

ctx.restore (); // 恢复设置2
ctx.fillRect ( 45 , 45 , 60 , 60 ); // 使用设置2绘制一个矩形

ctx.restore (); // 恢复设置1
ctx.fillRect ( 60 , 60 , 30 , 30 ); // 使用设置1绘制一个矩形
```

## 变形 Transformations (对网格(绘画坐标系)进行矩阵变换)

+ 变形是针对绘画坐标系及原点得缩放,旋转,平移等操作
+ 缩放,旋转,平移等操作是在当前变换的基础上进行变换的。
+ 重置变换:可以使用 resetTransform() 或者 setTransform(1,0,0,1,0,0)或者使用 save 和 restore 方法,

### 平移

对当前网格(绘画坐标系)添加平移变换的方法。

`void ctx.translate(x, y)` x和y分别代表水平方向和垂直方向上的移动距离

```js
for(var i=0;i<5;i++) {
	ctx.fillStyle=`rgb(${50*i}, ${155-50*i}, 155)`;
	ctx.fillRect(0,0,25,25);//绘制填充
	ctx.translate(50,0);//进行坐标系平移
}
ctx.resetTransform();//重置坐标系
ctx.translate(0,50);//重新进行坐标系平移
ctx.fillStyle='red';
ctx.fillRect(0,0,25,25);
```

### 旋转

对当前绘画坐标系增加旋转,旋转中心点一直是 canvas 的起始点。通过 translate() 方法移动坐标系来改变中心点

`void ctx.rotate(angle)` 角度变量表示一个顺时针旋转角度并且用弧度表示。

```js
//在中心点绘制一个圆
ctx.arc ( canvas.width / 2 , canvas.height / 2 , 30 , 0 , 2 * Math.PI );
ctx.fill ();

//移动坐标系到中心点并绘制一个矩形
ctx.translate ( canvas.width / 2 , canvas.height / 2 );
ctx.fillStyle = 'green';
ctx.fillRect ( 100 , 0 , 80 , 20 );

//旋转坐标系并绘制一个矩形
ctx.rotate ( 90 * Math.PI / 180 );
ctx.fillStyle = 'red';
ctx.fillRect ( 100 , 0 , 80 , 20 );
```

### 缩放

当前网格(绘画坐标系)添加缩放变换。

`void ctx.scale(x, y)` 参数x,y分别是水平和垂直方向上的缩放比例,负数表示翻转。

```js
ctx.scale(-3,-3); //坐标系水平垂直翻转并放大3倍
ctx.fillText('Hello world!', -100,-10);
```

### 变形( transform ,setTransform)

`void ctx.transform(a, b, c, d, e, f)` 在当前的变换矩阵基础上进一步变换,六个参数分别表示描述矩阵的六个元素
`void ctx.setTransform(a, b, c, d, e, f)` 直接设置将当前变换矩阵为指定矩阵,六个参数分别表示描述矩阵的六个元素

变换矩阵的描述:

|a c e|
|b d f|
|0 0 1|

- a (m11)      水平缩放。
- b (m12)      垂直倾斜。
- c (m21)      水平倾斜。
- d (m22)      垂直缩放。
- e (dx)      水平移动。
- f (dy)      垂直移动。

### resetTransform ( 重置变形 )

`void ctx.resetTransform()` 重置当前变形为单位矩阵,它和调用 ctx.setTransform(1,0,0,1,0,0) 是一样的。


## 裁切路径和覆盖绘图(清除不规则图形)

ctx.globalCompositeOperation 属性设置要在绘制新形状时应用的合成操作的类型。

`ctx.globalCompositeOperation = 'xor'`
- type 是用于标识要使用的合成或混合模式操作的字符串 [详见mdn](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

 ctx.clip() 将当前创建的路径设置为当前剪切路径,设置后只有裁剪区域内的图形会被绘制。

`void ctx.clip()` 使用当前路径作为裁切路径
`void ctx.clip(path)` 使用指定路径作为裁切路径
`void ctx.clip(fillRule)` 使用当前路径作为裁切路径,并使用指定环绕规则
`void ctx.clip(path, fillRule)` 使用指定路径作为裁切路径,并使用指定环绕规则
- fillRule 环绕规则,这个算法判断一个点是在路径内还是在路径外。 nonzero(非零环绕规则) evenodd(奇偶环绕规则)
- path 需要剪切的 Path2D 路径。

```js
//保存当前状态
ctx.save ();

//裁切区域
ctx.beginPath ();
let path1 = new Path2D ();
path1.arc ( 100 , 75 , 50 , 0 , Math.PI * 2 );
ctx.clip ( path1 , 'nonzero' );

// 在裁切区域内绘图
ctx.fillStyle = 'blue';
ctx.fillRect ( 0 , 0 , 400 , 300 );
ctx.fillStyle = 'orange';
ctx.fillRect ( 0 , 0 , 100 , 100 );

// 恢复之前保存的绘图状态(裁切区域)
ctx.restore ();

ctx.fillStyle = 'red';
ctx.fillRect ( 200 , 50 , 100 , 100 );
```

## 基本动画

动画的基本步骤:

1. 清空 canvas, 除非接下来要画的内容会完全充满 canvas,最简单的做法就是用 clearRect 方法。
2. 保存 canvas 状态, 如果你要改变一些 canvas 状态的设置(样式,变形之类的),又要在每画一帧之时都是原始状态的话
3. 绘制动画图形(animated shapes) 这一步才是重绘动画帧。
4. 恢复 canvas 状态, 如果已经保存了 canvas 的状态,可以先恢复它,然后重绘下一帧。

## 像素操作

### ImageData 对象

ImageData 接口描述 canvas 元素像素数据。使用 ImageData() 构造函数创建或者使用CanvasRenderingContext2D 的 createImageData() 和 getImageData() 方法。也可以使用 putImageData() 设置 canvas 的一部分。

ImageData 对象中存储着 canvas 对象真实的像素数据,它包含以下几个只读属性:

- ImageData.width: 图片宽度,单位是像素
- ImageData.height: 图片高度,单位是像素
- ImageData.data: 是一个Uint8ClampedArray 类型的一维数组,包含着 RGBA 格式的整型数据,范围在 0 至 255,每个像素在数组中占四个连续的位置,分别是R,G,B,A。像素从左到右,然后下一行。左上角像素的R在数组的索引 0 位置。

### 创建一个 ImageData 对象

创建一个新的具体特定尺寸的 ImageData 对象。所有像素被预设为透明黑。

`var myImageData = ctx.createImageData ( width , height )`

### 获取画布像素数据

使用 getImageData() 方法获得一个包含画布场景像素数据的 ImageData 对象

`var myImageData = ctx.getImageData ( left , top , width , height )`

### 根据行、列读取某像素点颜色

根据行、列读取某像素点的 R/G/B/A 值的公式: A的值也为0-255

`imageData.data[ ( ( 行 * ( imageData.width * 4 ) ) + ( 列 * 4 ) ) + 0 / 1 / 2 / 3 ]`

### 在场景中写入像素数据

`putImageData( myImageData , dx , dy )`  对场景进行像素数据的写入。
- dx 和 dy 参数表示你希望在场景内左上角绘制的像素数据所得到的设备坐标。

```js
let myImageData = ctx.createImageData ( canvas.width , canvas.height );
let data = myImageData.data;
// 使用for循环遍历ImageData.data
for ( let i = 0 ; i < data.length ; i ++ ) {
	if ( i % 4 === 0 ) {
		// 处理红色通道
		data.set ( [ 0 ] , i );
	}
}
// 将修改后的数据放回画布
ctx.putImageData ( myImageData , 0 , 0 );
```

## 保存图片

HTMLCanvasElement.toDataURL() 方法返回一个包含图片展示的 data URI。可以使用 type 参数指定其类型，默认为 PNG 格式。图片的分辨率为 96dpi。

`HTMLCanvasElement.toDataURL()`
`HTMLCanvasElement.toDataURL(type)`
`HTMLCanvasElement.toDataURL(type, encoderOptions)`

- type 可选 图片格式,默认为 image/png
- encoderOptions 可选, 在指定图片格式为 image/jpeg 或 image/webp 的情况下,可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围,将会使用默认值 0.92。其他参数会被忽略。
- 返回: 包含 data URI 的字符串。

```js
var canvas = document.getElementById("canvas");
var dataURL = canvas.toDataURL (); //返回dataURI
console.log ( dataURL );
```
