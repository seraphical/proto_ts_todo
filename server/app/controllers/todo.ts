import { queryTodo, delTodo, addTodo, toggleTodo } from '../services/todo';
export const delHandler = async (req: any, res: any) => {
  const { msg, code, result } = await delTodo(1);
  res.send(msg);
};
export const queryAllHandler = async (req: any, res: any) => {
  //service 应该是吧 sql 和 query 封装在一起了, 这里调用 service
  const result = await queryTodo();
  res.send(result);
  // res.send('hello');
};

export const addHandler = async (req: any, res: any) => {
  const { id, content } = req.body;
  const { msg } = await addTodo([id, content]);
  res.send(msg);
};

export const toggleHandler = async (req: any, res: any) => {
  const { id } = req.body;
  const result = await toggleTodo(id);
  res.send(result);
};
