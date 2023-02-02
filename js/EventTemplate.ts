import { ITodo } from './typeings';

//@ 根据整个数组来进行渲染
export default class EventTemplate {
  protected wrapper: string;
  constructor() {}
  //? 使用 dataset 的要怎么定义来着?
  //# 在 dom 上使用 data-xx 来定义, 获取的时候使用 dataset.xx 来获取
  protected addTemplate(data: Array<ITodo>) {
    this.wrapper = data.reduce((pre, item) => {
      return (
        pre +
        `<div> <input type="checkbox"><span data-id="${item.id}" style="width:125px;display:inline-block">${item.content}</span><button>删除</button></div>`
      );
    }, '');
  }
}
