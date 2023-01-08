import { ITodo } from './typeings';
export default class EventTemplate {
  protected wrapper: string;
  constructor() {}
  //? 使用 dataset 的要怎么定义来着?
  protected addTemplate(data: Array<ITodo>) {
    this.wrapper = data.reduce((pre, item) => {
      return (
        pre +
        `<div> <input type="checkbox"><span data-id="${item.id}" style="width:125px;display:inline-block">${item.content}</span><button>删除</button></div>`
      );
    }, '');
  }
}
