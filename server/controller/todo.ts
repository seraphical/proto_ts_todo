export const delHandler = (req: any, res: any) => {
  console.log(req, res);

  res.send('我是删除的接口');
};
export const helloHandler = (req: any, res: any) => {
  console.log(req, res);
  res.send('hello');
};
