import { ITodo } from './typeings';
//? 为什么不能使用 ts 导入
(() => {
  const btn: HTMLButtonElement = document.querySelector('button')!;
  const inp: HTMLInputElement = document.querySelector('input')!;
  const wrapper: HTMLDivElement = document.querySelector('#app')!;

  const todoData: Array<ITodo> = [
    {
      id: 1,
      content: 'hello',
      finish: false,
    },
  ];

  init();
  function init(): void {
    bindEvent();
  }

  function bindEvent(): void {
    wrapper.addEventListener('click', clickHandler);
  }

  function clickHandler(e: Event) {
    //?事件对象的类型有点不清楚
    //? e.target 应该是什么, 是 dom 才有 nodeName,tagName 什么的吧

    if ((e.target as HTMLElement).tagName === 'BUTTON') {
      alert('aaa');
    }
  }
})();
