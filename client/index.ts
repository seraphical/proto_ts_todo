import { ITodo } from './typeings';
import EventData from './EventData';
//? 为什么不能使用 ts 导入
(() => {
  const btn: HTMLButtonElement = document.querySelector('button')!;
  const inp: HTMLInputElement = document.querySelector('input')!;
  const contentWrapper: HTMLDivElement = document.querySelector('.content')!;

  const todoData: Array<ITodo> = [
    {
      id: 1,
      content: 'hello',
      finish: false,
    },
  ];

  //#  声明的时候写类型, 调用的时候就不用写类型了
  const dataTier = new EventData(todoData, contentWrapper);

  init();
  function init(): void {
    bindEvent();
  }

  function bindEvent(): void {
    btn.addEventListener('click', btnClickHandler);
    contentWrapper.addEventListener('click', contentClickHandler);
  }

  function btnClickHandler(e: Event) {
    //?事件对象的类型有点不清楚
    //? e.target 应该是什么, 是 dom 才有 nodeName,tagName 什么的吧
    const content: string = inp.value?.trim();
    if (!content) return alert('不能添加空值');
    const data: ITodo = { id: Date.now(), content, finish: false };
    dataTier.addData(data);
    inp.value = '';
  }
  function contentClickHandler(e: MouseEvent): void {
    console.log('content');
    if ((e.target as HTMLElement).nodeName === 'BUTTON') {
      // ~ 为删除
      //? 类型“Element”上不存在属性“dataset”
      dataTier.delData(
        //@ts-ignore
        (e.target as HTMLElement).previousElementSibling!.dataset.id,
      );
    } else if ((e.target as HTMLElement).nodeName === 'INPUT') {
      dataTier.toggleData(
        //@ts-ignore
        (e.target as HTMLElement).nextElementSibling!.dataset.id,
      );
    }
  }
})();
