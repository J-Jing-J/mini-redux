// 信息很多不能存到一个reducer中
// createStore创建的时候顺便做合并

// 接收对象，里面有很多reducer
export default function combineReducers(reducers) {
    // combineReducers返回一个总的reducer，reducer统一参数：(prevState, action)=>nextState 
    // 默认值：组件需要默认值，加在reducer上 --- dispatch在createStore中默认执行一次（为了取默认值）--- 写reducer函数时记得加default
    // combination的默认值是对象，key区分reducer函数，value一开始是默认值
    return function combination(state = {}, action) {
      let nextState = {};
      let hasChanged = false; // 当前状态值有没有发生改变
  
    //   遍历所有reducer，修改默认值
      for (const key in reducers) {
        const reducer = reducers[key];
        // 修改当前reducer的状态值：根据reduce修改 --- 传入上次的状态值和本次的action --- 返回新状态值
        nextState[key] = reducer(state[key], action);
        // 上面每次返回新对象，永远不相等
        // 一旦dispatch，就去执行subscribe订阅的事件，而订阅的事件就会让组件更新，不合理
        // 判断状态值到底有没有改变，改变了返回新的，没改变返回旧的
        hasChanged = hasChanged || nextState[key] !== state[key];
      }
  
      // {a:1, b:1} {a:1}
    //   每个key值都一样，但是新增了value，也改变了 --- 比较length
      hasChanged =
        hasChanged || Object.keys(nextState).length !== Object.keys(state).length;
  
        // 一开始返回默认值，结构和传入的一样{count: defaultxx, ...}
      return hasChanged ? nextState : state;
    };
  }