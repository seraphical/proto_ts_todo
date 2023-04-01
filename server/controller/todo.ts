import { query } from '../model';
export const delHandler = (req: any, res: any) => {
  console.log(req, res);

  res.send('我是删除的接口');
};
export const helloHandler = async (req: any, res: any) => {
  let SQL = 'SELECT * FROM `test`';
  const result = await query(SQL);
  res.send(result);
  // res.send('hello');
};
