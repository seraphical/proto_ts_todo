import { ITodo } from './typeings';
export default class EventData {
  private todoData: Array<ITodo>;
  constructor(todoData: Array<ITodo>) {
    this.todoData = todoData;
  }
  public addData() {}
}
