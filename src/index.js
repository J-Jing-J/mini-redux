import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
// import { Provider } from "react-redux";
import { Provider } from "./react-redux";

import store from "./store";

// 直接用redux：getState获取状态、dispatch修改、订阅、取消订阅，都要手动操作、若多个页面用redux，要写的太多了
// react-redux帮我们做这件事
// 现在：所有状态在store，store在组件最顶层，provider
// 本质是context的跨组件传递数据
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// const array1 = [1, 2, 3, 4];
// const reducer = (accumulator, currentValue) => accumulator + currentValue;

// // 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer));
// // expected output: 10

// // 5 + 1 + 2 + 3 + 4
// console.log(array1.reduce(reducer, 5));
// // expected output: 15


function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg;
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}

// 不建议这样做 --- 啰嗦
f1("omg");
f2("omg");
f3("omg");

// 强制一个规律：上一个函数的返回值是下一个函数的参数

// 洋葱模型
// 缺点：可读性差
const res1 = f1(f2(f3("omg")));

// 改进
// compose返回一个函数，然后再传参执行
const res2 = compose(f1, f2, f3)("omg");

// compose
// 返回一个函数
// 也是react源码中的一个函数
function compose(...funcs) {
    // 没传，但不让报错
  if (funcs.length === 0) {
    return (arg) => arg;
  }

//   只传了一个函数，返回函数本身
  if (funcs.length === 1) {
    return funcs[0];
  }

//   聚合多个函数
// 上一个函数的返回值是下一个函数的参数 --- reduce
  return funcs.reduce(
    // a：上次聚合函数， b：本次遍历到的函数
    (a, b) => 
        // 函数有参数 --- 传下去
        (...args) => 
            // 返回一个聚合函数，类似于在内部柯里化
            a(b(...args))
  );
}

