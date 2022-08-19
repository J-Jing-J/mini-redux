// compose
// 返回一个函数
// 也是react源码中的一个函数
export default function compose(...funcs) {
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
        // 函数本身有参数
        (...args) => 
            // 返回一个聚合函数
            a(b(...args))
  );
}