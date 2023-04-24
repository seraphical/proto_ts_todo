import { query } from '../../core/service';
import { IRes, IData } from '../../types';

export const queryTodo = (): Promise<IRes> => {
  return new Promise(async (resolve) => {
    let SQL = 'SELECT * FROM `test`';
    const result = await query(SQL);
    resolve(result);
  });
};

/* 
  @params id
*/
export const delTodo = <T>(id: T): Promise<IRes> => {
  return new Promise(async (resolve) => {
    let SQL = 'DELETE FROM `test` WHERE `id`= ?';
    const result = await query(SQL, [id]);
    resolve(result);
  });
};

export const addTodo = (arr: Array<IData>): Promise<IRes> => {
  return new Promise(async (resolve) => {
    let SQL = 'INSERT INTO `test`(`id`,`content`,`isFinish`) VALUES (?,?,0)';
    const result = await query(SQL, arr);
    resolve(result);
  });
};

export const toggleTodo = (id: number): Promise<IRes | string> => {
  return new Promise(async (resolve) => {
    const { code, result, msg } = await query(
      'SELECT `isFinish` FROM `test` WHERE `id` =?',
      [id],
    );
    if (code !== 200) return resolve(msg);
    const { isFinish } = result[0];

    let SQL =
      'UPDATE `test` SET `isFinish`=' +
      (!isFinish ? 1 : 0) +
      ' WHERE `id` =' +
      id;
    const res = await query(SQL);
    resolve(res);
  });
};
