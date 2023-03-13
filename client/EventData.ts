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
    this.renderDom(this.todoData);
  }
  public addData(data: ITodo) {
    this.todoData.push(data);
    this.renderDom(this.todoData);
  }
  public delData(id: number) {
    this.todoData = this.todoData.filter((item) => item.id != id)!;
    this.renderDom(this.todoData);
  }
  public toggleData(id: number) {
    let temp: ITodo = this.todoData.find((item) => item.id == id)!;
    console.log(temp, 'temp');

    temp.finish = !temp.finish;
    console.log(this.todoData, 'this.todoData');

    this.renderDom(this.todoData);
  }
}
