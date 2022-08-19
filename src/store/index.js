// reducer：类似于useReducer接收的第一个参数
// (previousState, action) => newState
// 纯函数，值得信赖，结果稳定
// 很多组件都要用状态值，并且组件之间没有明显的关系，将组件值交给组件本身管理不好，应该统一管理  --- 第三方状态管理库（纯函数reducer最可靠）

// redux：js应用的状态容器，保证程序行为一致性，易于测试


// 状态值太多了 --- 定义store管理
// 仓库
import {createStore} from redux
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { applyMiddleware } from 'redux';

// 定义规则 --- reducer纯函数值得信赖
function countReducer(state = 0, action) {
    switch (action, type) {
        case "ADD":
            return state + 1;
        case "MINUS":
            return state - 1;
        default: 
            return state;
    }
}

// 把规则传给createStore
// const store = createStore(countReducer);

// redux本身的dispatch只能接受一个plain object（普通对象），不能处理函数 --- 中间件
// 异步场景：修改状态值、与服务端交互
// compose、柯里化：
// 柯里化：react函数式编程，通常比较精炼，实现复杂功能要将函数聚合在一起 --- 参数多不方便聚合函数 --- 尽量保证函数的参数单一 --- 方便聚合

// 创建store
// 中间件的顺序不能乱，react源码中是用compose处理的 --- 先后顺序
// logger规则：要放在最后一个（值先变了再打印才有意义）
const store = createStore(
    // countReducer,
    combineReducers({
      count: countReducer, // 通过key区分不同reducer
    //   user: userReducer,
    }),
    applyMiddleware(
      promise,
      thunk
      //  logger
    )
  );


export default store


function logger({getState, dispatch}) {
    // 执行中间件用的是compose函数 --- reduce
    // 所以此次中间件，要接收上次聚合函数，并返回本次聚合后的函数
    // next：上次聚合函数
    // action：当前遍历到的函数
    return next => action => {
        console.log('--------');
        // 获取上次（当前）状态值
        const prevState = getState()

        // next(action)修改状态值
        const returnValue = next(action)

        // 获取下次状态值 --- dispatch之后就有了 --- 执行下一次的聚合函数 ---（next(action)之后就是了）
        const nextState = getState()
        console.log('--------');
        // 上一个函数的返回值是下一个函数的参数，记得返回
        return returnValue
    }
}

function thunk({ getState, dispatch }) {
    return (next) => (action) => {
        // thunk专门处理函数
      if (typeof action === "function") {
        return action(dispatch, getState);
      }
    //   如果不是函数，正常执行next，action不是函数则是参数
      return next(action);
    };
  }

//   处理promise
  function promise({ getState, dispatch }) {
    return (next) => (action) => {
        // 如果是promise，就执行then
      return isPromise(action) ? action.then(dispatch) : next(action)
    //   源码还会检查是不是FSA版本的参数
    // FSA：原来的flux标准的action
    };
  }
