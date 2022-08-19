import compose from "./compose";

// 接收很多中间件，返回enhancer（加强器）函数给createStore
export default function applyMiddleware(...middlewares) {
    // 返回enhancer
    // enhancer接收参数createStore和reducer
  return (createStore) => (reducer) => {
    // 最终返回的store
    // enhancer加强dispatch --- dispatch来自store --- 最终返回store
    const store = createStore(reducer);
    let dispatch = store.dispatch; //初始值，后面加强

    // todo 加强dispatch
    // 中间件加强dispatch
    // logger能打印状态值，但是状态值存在createStore中 --- 而中间件和redux是分开的库 --- 如何产生关联 --- redux开放权限 --- 把get、set当参数传给中间件

    const midAPI = {
      getState: store.getState,
    //   不能把原版的dispatch传出去 --- 中间件之间若使用compose产生联系（上个函数的返回值 是下个函数的参数）--- 每次都传的是原版dispatch --- 等于没加强
    // 包一层 --- 变成当前上下文的dispatch，就能加强了
      dispatch: (action, ...args) => dispatch(action, ...args),
    };

    // 加强dispatch
    // 执行所有中间件
    // map --- 返回新的中间件数组，传midAPI（权限）
    const middlewareChain = middlewares.map((middleware) => middleware(midAPI));

    // 加强版的dispatch
    // 含义：把所有的中间件的函数都执行了，同时还执行store.dispatch --- 最终修改状态值还是要通过原版的dispatch
    // middleware在dispatch时执行
    // 执行用compose
    dispatch = compose(...middlewareChain)(store.dispatch);

    // 最终返回store：enhancer加强dispatch --- dispatch来自store --- 最终返回store
    return {
      ...store,
      // 加强版的dispatch
      dispatch,
    };
  };
}