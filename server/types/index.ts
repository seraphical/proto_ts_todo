export interface IRes {
  code: number;
  msg: string;
  result: any;
}

export interface IData {
  id: number;
  content: string;
  finish?: boolean;
}
