import express from 'express';
import { delHandler, helloHandler } from '../controller/todo';

const todoRouter = express.Router();

todoRouter.get('/', helloHandler);

todoRouter.get('/del', delHandler);

export default todoRouter;
