import EventTemplate from './EventTemplate';
import { ITodo } from './typeings';

//todo 根据数据创建 dom 并且插入到 content 中
export default class EventDom extends EventTemplate {
  private content: HTMLElement;
  constructor(contentWrapper: HTMLDivElement) {
    super();
    this.content = contentWrapper;
  }
  protected addDom(data: Array<ITodo>) {
    this.addTemplate(data);
    this.content.innerHTML = this.wrapper;
  }
}
