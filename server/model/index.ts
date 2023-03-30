import mysql from 'mysql';
export default class SQL {
  private static _instance;
  private pool;
  constructor() {
    this.pool = mysql.createPool({});
  }
  public connection() {
    return new Promise((resolve) => {
      this.pool.connect((err, connect) => {
        if (err) resolve({ code: -1 });
        resolve({ code: 1, msg: connect });
      });
    });
  }
  public static getInstance() {
    return SQL._instance || (SQL._instance = new SQL());
  }
  public sqlQuery(connect, query) {
    return new Promise((resove) => {
      SQL.getInstance();
    });
  }
}
