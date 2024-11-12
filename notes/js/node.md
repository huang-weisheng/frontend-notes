# NodeJs

## 1.Node.js介绍

基于 Chrome 的V8 JS 解析引擎之上，解放了Javascript的编程能力，为 Javascript 提供了 后端编程的能力；
所以说，Node.js 是 一个让javascript进行后端编程的一个运行平台；

> Chromium V8是google开源的JavaScript引擎，用于执行JavaScript，类似JVM执行java字节码。在node.js诞生之前，V8是内置于Chromium中的，现在也内置于node.js中。
>

## 环境变量

#### 什么是环境变量

Path环境变量的作用：能够让我们在终端通过命令行的形式，快速启动一些应用程序；

#### 系统环境变量和用户环境变量的区别

1. 用户环境变量，是每个用户私有的，用户之间不会共享；
2. 全局环境变量，是共享的，只要你能登录这台计算机，就能访问到全局的环境变量；【今后在配置环境变量的时候，推荐直接配置到系统环境变量】

## nodejs的组成部分

### 浏览器的组成部分

EcmaScript+dom+bom

### nodejs里面的组成部分

1.模块 nodejs会把每个独立的js当成是一个模块

2.EcmaScript + 模块成员(fs url path...)+全局成员(settimeout clearTimeout __dirname  __filename console...)

小提示:在cmd命令里面 输入cls 可以清空当前cmd里面的诸多命令

## CommonJS模块

现在的模块化语法:commonJS EsModule

定义了模块的语法

1.什么是commonJS

- commonjs就是为了实现javascript模块化,而制定的一套规范,只能应用在node环境之中,传统浏览器不支持
- require()   module.exports exports()

2.为什么要使用commoJs

- 传统html通过引入的方式相互关联,代码耦合度高,对模块化来说非常不友好,所以需要一套模块化语法,统一模块的引用和导出
- 模块化的好处 低耦合 代码易维护 复用性强


## 16.Node 中的 Web 快速开发框架 - Express koa

定义什么是Express：

1. 基于 Node.js 后端Javascript平台之上，开发出来的一套Web开发框架；
2. Express中，基于 原生Node的特性，做了进一步的封装，提供了一些更加好用的方法，来提高Web开发的体验；
3. Express中，并没有覆盖或者删除原生的http模块方法；

**警告:项目发给别人的时候 要删除node_modules,因为里面文件太多了,把需要依赖的三方模块在 cnpm install的时候 一定要 --save 保存到依赖 ,别人拿到项目,首先直接 cnpm i (npm i )补齐依赖**

#### yarn 是facebook提供的一个非常好用的包管理工具

##17.express 框架的安装和基本使用

1. 直接运行 npm install express-generator -g 或者 yarn global add express-generator 就可以安装Express框架了

2. express my-app

3. cd my-app

4. npm i 或者 yarn 补齐依赖

5. npm start 启动项目

6. 使用express简单搭建一个服务,通过postman测试接口

   ```js
   const express = require("express");
   const app = express();

   app.get('/',(req,res)=>{
       res.send("success")
   })

   app.listen(3000,'localhost',()=>{
       console.log("localhost:8080")
   })
   ```

   文件目录 增加views->home.html 当路径为/home的时候 sendFile()给前端 注意路径问题

## 18.使用 express 快速托管静态资源

1. 如果我们网站中，有很多静态资源需要被外界访问，此时，使用 res.sendFile 就有点力不从心了，这时候，express 框架，为我们提供了一个 内置的（中间件）  `express.static('静态资源目录')`  ， 来快速托管指定目录下的所有静态资源文件；

2. 用法： `app.use(express.static('public'));`

    - 其中， `express.static` 是一个express的内置中间件；
    - `app.use() `方法，是专门用来注册 中间件；

3. 当使用 第二步中的方法，把指定目录托管为静态资源目录之后，那么，这一层被托管的目录，不应该出现在 资源访问的 URL地址中；

4. 在一个Web项目中，我们可以多次调用`app.use(express.static())`

5. 在多次调用 express.static 的时候，如果文件名称有重复的，则以先注册的中间件为主！

6. 如果项目要部署了，推荐大家配置一个叫做`compression`的中间件，它能够开启服务器的GZip压缩功能；

##19.为 express 框架配置模板引擎渲染动态页面

1. 安装 ejs 模板引擎

​      ` npm i ejs -S`    -S(保存到依赖) -D(保存到开发依赖)

2. 使用 app.set() 配置默认的模板引擎
   `app.set('view engine', 'ejs')`
3. 使用 app.set() 配置默认模板页面的存放路径
   `app.set('views', './views')`
4. 使用 res.render() 来渲染模板页面
   `res.render('index.ejs', { 要渲染的数据对象 })`，注意，模板页面的 后缀名，可以省略不写！

### 循环语法

```jsx
      <!-- ejs文件 -->
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Document</title>
      </head>
      <body>
        <%for(var i=0;i<json.arr.length;i++){%>
          <div>user:<%=json.arr[i].user%> pass:<%=json.arr[i].pass%><div>
        <%}%>
      </body>
      </html>
```

##转义输出

```
 <%= 变量名 %>
```

这个是转义输出,可以把变量名替换成自己需要的东西.
我们可以这么使用.

```jsx
 // js文件
  ejs.renderFile('./views/test.ejs',{name:'wzz'},function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
    }
  });
  <!-- ejs文件 -->
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <%=name%>
  </body>
  </html>
```

### 不转义输出

  ```
  <%- 变量名%>
  ```

不转义输出可以把定义的字符串不转义的输出.
我们可以这么用,这边我们省略了第二个不使用的json数据

  ```jsx
  // js文件
  ejs.renderFile('./views/test.ejs',function(err,data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
    }
  });
  <!-- ejs文件 -->
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Document</title>
  </head>
  <body>
    <% var str='<div><div>'; %>
    <%-str %>
    <%=str %>
  </body>
  </html>
  ```

## 20.使用 express 框架中提供的路由来分发请求(路由)

1. 什么叫做路由：路由就是请求不同的路径,响应不同的资源

2. 在Express中，路由主要负责 分发请求处理的；

3. 在Express中，如何 定义并使用路由呢？

```js
  // 1. 封装单独的 router.js 路由模块文件
  const express = require('express')
  // 创建路由对象
  const router = express.Router()

  router.get('/', (req, res)=>{})
  router.get('/movie', (req, res)=>{})
  router.get('/about', (req, res)=>{})

  // 导出路由对象
  module.exports = router
```

1. express创建的 app 服务器，如何使用 路由模块呢？

```js
  // 导入自己的路由模块
  const router = require('./router.js')
  // 使用 app.use() 来注册路由
  app.use(router)
```
