import EventDom from './EventDom';
import { ITodo } from './typeings';
export default class EventData extends EventDom {
  //# 写一下这里修饰的逻辑, 默认给 public, 如果要给子类用就写 protected, 只能自己用就 private
  private todoData: Array<ITodo>;
  constructor(todoData: Array<ITodo>, wrapper: HTMLDivElement) {
    super(wrapper);
    this.todoData = todoData;
    this.initList();
  }
  private initList() {
    this.addDom(this.todoData);
  }
  public addData(data: ITodo) {
    this.todoData.push(data);
    this.addDom(this.todoData);
  }
  public delData(id: number) {
    this.todoData = this.todoData.filter((item) => item.id != id)!;
    this.addDom(this.todoData);
  }
}
