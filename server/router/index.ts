import todoRouter from './todo';
const router = require('express').Router();

router.use('/todo', todoRouter);

export default router;
