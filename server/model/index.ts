// 在创建服务之后立即连接数据库
import mysql from 'mysql';
import DB from '../config/dbConfig';
let pool = mysql.createPool({
  host: DB.HOST as string,
  port: DB.PORT as number,
  user: DB.USRER as string,
  password: DB.PWD as string,
  database: DB.DB as string,
});

// export const connect = () => {
//   return new Promise((resolve) => {
//     pool.getConnection((err, connect) => {
//       if (err) return resolve({ code: -1, msg: '连接失败' });
//       resolve({ code: 1, msg: '数据库连接成功' });
//     });
//   });
// };

export const connect = () => {
  pool.getConnection((err, status) => {
    if (err) console.log('数据库连接失败');
    console.log('数据库连接成功');
  });
};
interface IRes {
  code: number;
  msg: string;
  result: any;
}
// ! 此处进行定义,返回 Promise<T> ,  这种如何进行声明, 调用的时候如何调用
export const query = (sql: string): Promise<IRes> => {
  return new Promise((resolve) => {
    pool.query(sql, (err, data) => {
      if (err) return resolve({ code: -1, msg: '', result: null });
      resolve({ code: 1, msg: '操作成功', result: data });
    });
  });
};
