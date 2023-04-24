# mvc 模式

## 目录结构
```
├─ src                     源码
│  ├─ app                  业务代码
│  │  ├─ controllers       控制器：用于解析用户输入，处理后返回相应的结果
│  │  ├─ models            模型  ：用于定义数据模型
│  │  ├─ services          服务  ：用于编写业务逻辑层，比如连接数据库，调用第三方接口等
│  │  └─ views             视图  ：用于放置模板文件，返回客户端的视图层
│  │
│  ├─ core                 核心代码
│  │  ├─ controller.js     控制器基类
│  │  ├─ model.js          模型基类
│  │  └─ service.js        服务基类
│  │
│  ├─ middlewares          中间件
│  ├─ public               静态资源
│  ├─ router               URL 路由
│  ├─ utils                工具库
│  └─ index.js             入口：用于自定义启动时的初始化工作，比如启动 https，调用中间件、路由等
│  
├─ .eslintrc               eslint 配置文件
├─ nodemon.json            nodemon 配置文件
├─ package.json            npm 配置文件
├─ processes.json          pm2 配置文件
```
后端数据流转流程: 
- router->controller -> 通过数据库进行查找
- 数据库查找过程: controller 对 service 进行操作, model 对数据库进行访问
比如我要查找文章,通过/artical 访问, 进入 artical 的 controller, controller  对数据库进行查询
而数据库进行查询是通过 service 来根据定义好的数据模型(modal)来进行查询
### model
模型  ：用于定义数据模型

 什么叫做数据模型?

 src/app/models/articles.js
```js
module.exports = app => {
  const {ID, SHORT_RELATED_ID, NAME, TITLE, SUBTITLE, DESCRIPTION, CONTENT, PICTURES, ORDER} = app.$model.columns

  return app.$model.define('articles', {
    id: ID,
    category_id: SHORT_RELATED_ID,
    author: NAME,
    title: TITLE,
    subtitle: SUBTITLE,
    description: DESCRIPTION,
    content: CONTENT,
    pictures: PICTURES,
    order: ORDER
  })
}
```
###  服务
src/app/services/articles.js
```js
module.exports = app => {
  return class extends app.$Service {
    constructor () {
      super()

      this.model = app.$models.articles
    }
  }
}

```
### 控制器
src/app/controllers/articles.js
```js
module.exports = app => {
  const service = app.$services.articles

  return class extends app.$Controller {
    async index (ctx, next) {
      await ctx.render('articles', {
        items: await service.find({offset: 0, limit: 10})
      })
    }
  }
}

```
### API
src/app/controllers/apis/v1/articles.js
```js
module.exports = app => {
  const service = app.$services.articles

  return class extends app.$Controller {
    async index (ctx, next) {
      ctx.response.body = ctx.send({
        status: 200,
        data: await service.find({offset: 0, limit: 10})
      })
    }
  }
}
```

# 进度

连接数据库->熟悉查询语句->对数据的增删改进行操作

## @230331

当前构建完基本结构, 熟悉了字段的数据类型,比如 char,int,varchar.
重新理解字节和位的关系
熟悉连接表的语法

```js
let pool = mysql.createPool({ host, port, user, passward, database });
pool.getConnection((err, connect) => {});
pool.query(sql, (err, data) => {});
```

## @230401

熟悉 mysql 各个查询指令

## 230421
昨天写完了大致的接口, 增删改查
那么今天就让前端使用装饰器进行调用吧

# 代码分析

## 泛型
函数表达式使用泛型的时候这样使用

```js
export const delTodo = <T>(id: T): Promise<IRes> => {
  return new Promise(async (resolve) => {
    let SQL = 'DELETE FROM `test` WHERE `id`= ?';
    const result = await query(SQL, [id]);
    resolve(result);
  });
};
```

而命名函数使用泛型则
```js
function <T>fn(name:T):void{
}
```
## 函数的可选参数
```js
function fn(name:string,age?:number)
```
## 函数表达式的类型定义
```js
const getFullName: (name: string) => string = (name: string): string => {
	return `Rainy ${name}`;
}
```


# 错误记录

## ts-node-dev 启动错误

将所有模块改造成 es6 语法之后报错, Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
在 package.json 中添加 type:moudule 之后才行

修改之后继续报错 Error: Must use import to load ES Module:

```js
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import router from './router/index';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//~ req 和 res 的类型是
// app.get('/aaa', (req, res) => {
//   console.log(req.url);
//   console.log(req.query);
//   console.log(req.path);
//   res.send('lalalal');
// });

app.use(router);

app.listen(4000, () => {
  console.log('开启成功,正在监听 4000 端口');
});
```

但是当前代码已经使用了 import 对模块进行导入了啊, 但是为什么还是出错了呢

https://github.com/wclr/ts-node-dev/issues/314
在此 issue 中提出 3 中改进方法

```
We should somehow tell ts-node to use the loader that supports ESM. This can be done in one of the following ways:

1. Specify in tsconfig.json that the ts-node uses ESM loader
{
  "ts-node": {
    "esm": true
  }
}
In this case, you don't need to specify additional arguments in nodemon command:

nodemon src/index.ts
2. Specify the ts-node command with ESM in nodemon:
nodemon --exec ts-node-esm src/index.ts
or

nodemon --exec 'ts-node --esm' src/index.ts
In this case, you don't need to change the tsconfig.json file.

3. Set ts-node with ESM as the node loader
NODE_OPTIONS='--loader ts-node/esm' nodemon src/index.ts
or

nodemon --exec 'node --loader ts-node/esm' src/index.ts
I prefer the first case (set ts-node.esm to true in tsconfig), because it looks cleaner.
```

这里使用第一种方法
