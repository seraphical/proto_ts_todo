// ? 导入为什么不使用 require
//todo 连接数据库,数据库语法
import express, { Application } from 'express';
import bodyParser from 'body-parser';

const app: Application = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// @ 跨域的两种写法, 一种是使用 cors, 一种是使用三种列举

//~ req 和 res 的类型是
app.get('/aaa', (req, res) => {
  console.log(req.url);
  console.log(req.query);
  console.log(req.path);
  res.send('lalalal');
});

app.listen(4000, () => {
  console.log('开启成功,正在监听 4000 端口');
});
