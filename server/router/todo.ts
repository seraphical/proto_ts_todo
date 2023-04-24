import express from 'express';
import {
  delHandler,
  queryAllHandler,
  addHandler,
  toggleHandler,
} from '../app/controllers/todo';

const todoRouter = express.Router();

todoRouter.get('/', queryAllHandler);

todoRouter.post('/del', delHandler);

todoRouter.post('/add', addHandler);

todoRouter.post('/toggle', toggleHandler);

export default todoRouter;
