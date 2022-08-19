import createStore from "./createStore";
import applyMiddleware from "./applyMiddleware";
import compose from "./compose";
import combineReducers from "./combineReducers";
import bindActionCreators from "./bindActionCreators";

export {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
  bindActionCreators,
};



// redux-saga:
// 作用：中间件，用于异步请求，比如网络请求，访问浏览器缓存
// 优点：让副作用管理更容易，执行更高效，测试更简单，处理故障更容易
// 核心：sagas都是generator实现的，使用同步的方式实现异步
// 和thunk比：避开回调地狱

// 一些概念：
// saga：组合所有Effect，共同实现所需的控制流，用generator实现

// effect：一个js对象，包含描述副作用的信息，可以通过yield传达给middleware执行 --- 使saga与仓库创建连接
// 从generator里yield纯js对象以表达saga逻辑，这些js对象就是effect
// 可以通过 react-effect 包里提供的函数创建effect：如take、fork、put

// saga如何与仓库创建连接 ？
// 1. 创建能够运行的saga
// 2. 创建中间件，与thunk不同，saga需要手动执行generator拿到生成器对象
// 3. 把saga中间件与redux-store连接
// 4. 运行saga
