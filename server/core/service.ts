// ! 此处进行定义,返回 Promise<T> ,  这种如何进行声明, 调用的时候如何调用
/* const getFullName: (name: string) => string = (name: string): string => {
	return `Rainy ${name}`;
} */
import { IRes } from '../types';
import { pool } from './model';
// 基类

export const query = (sql: string, arr?: Array<any>): Promise<IRes> => {
  return new Promise((resolve) => {
    console.log(sql, 'sql');

    pool.query(sql, arr, (err, data) => {
      if (err)
        return resolve({
          code: 700,
          msg: '系统错误,请稍后再试,或联系管理人员',
          result: null,
        });
      resolve({ code: 200, msg: '操作成功', result: data });
    });
  });
};
