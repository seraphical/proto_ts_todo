# mvc 模式

## 目录结构

- router(路由)
- controller
- app.ts(入口文件)
- model
- config
- static(管理静态文件)
- utils(工具函数, 使用类书写)
- view(视图层)

# 错误记录

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
