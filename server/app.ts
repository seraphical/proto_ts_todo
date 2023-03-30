import express from 'express';
import bodyParser from 'body-parser';
import router from './router/index';

const app = express();

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
