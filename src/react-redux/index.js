// redux是纯js状态管理库，纯js实现，和react无关
// react-redux是桥接库

// 为什么要用？
// 直接用redux：getState获取状态、dispatch修改、订阅、取消订阅，都要手动操作、若多个页面用redux，要写的太多了
// react-redux帮我们做这件事
// 现在：所有状态在store，store在组件最顶层，provider
// 本质是context的跨组件传递数据

// Context传值 跨组件层级传递数据

import React, {
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useReducer,
    useState,
    useSyncExternalStore,
  } from "react";
  import { bindActionCreators } from "../redux";
  
  // ! 1. 创建context对象
  const Context = React.createContext();
  
  // ! 2. Provider组件传递value （store）
  export function Provider({ store, children }) {
    return <Context.Provider value={store}>{children}</Context.Provider>;
  }
  
  // ! 3.后代消费Provider传递下来的value
  // * contextType 只能用在类组件，只能订阅单一的context来源
  // * useContext 只能用在函数组件或者自定义Hook中
  // * Consumer 没有组件限制，注意使用方式，使用方式麻烦一些
  
//   HOC
// props是WrappedComponent组件自身的属性，记得传给返回的组件
  export const connect =
    (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => (props) => {
      const store = useContext(Context);
      const { getState, dispatch, subscribe } = store;
  
    // 默认的dispatch，没传mapDispatchToProps时就是这个
      let dispatchProps = { dispatch };  
    //   函数版：传入dispatch，用户返回的结果就是
      if (typeof mapDispatchToProps === "function") {
        dispatchProps = mapDispatchToProps(dispatch);
    // 对象版：给对象的方法加dispatch
      } else if (typeof mapDispatchToProps === "object") {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      }
  
      // const [, forceUpdate] = useReducer((x) => x + 1, 0);
  
      const forceUpdate = useForceUpdate();
  
    //   让dispatch使组件更新
    //   组件的订阅要用useLayoutEffect，先订阅，再更新
      // useLayoutEffect(() => {
      //   const unsubscribe = subscribe(() => {
      //     forceUpdate();
      //   });
      //   return () => {
      //     unsubscribe();
      //   };
      // }, [subscribe]);
  
      // useSyncExternalStore：react18的API
      // 用于外部数据的读取与订阅
      // 参数一：subscribe：注册store改变后的回调函数 --- 这里传了forceUpdate
      // 参数二：返回最新的store，通过这个判断是否需要执行回调
      // 参数三：SSR相关
      // 代替useLayoutEffect订阅
      // rudex内部换成这个了，但是做了兼容处理
      const state = useSyncExternalStore(() => {
        subscribe(forceUpdate);
      }, getState);
  
      // console.log("checked", state === getState()); //sy-log
  
      // getState拿到的是所有的状态值
      // 只需要拿自己那部分就行了 --- 执行传入的mapStateToProps，传入全部state，由外面 控制返回需要的state
      // const stateProps = mapStateToProps(getState()); --- useSyncExternalStore的执行返回本次状态state，可以把getState()换为state
      const stateProps = mapStateToProps(state);
  
    //   返回新的组件
      return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
    };
  
    // 实现函数组件的forceUpdate，这样就不用每次写这个逻辑了
  function useForceUpdate() {
    const [state, setState] = useState(0);

    // update函数可能会被传递，函数每次都不同，可能会造成UI更新 --- useCallback缓存函数
    const update = useCallback(() => {
      setState((prev) => prev + 1);
    }, []);

    return update;
  }
  


  // 接收函数，返回状态值
  export function useSelector(selector) {
    const store = useContext(Context);
  
    const { getState, subscribe } = store;
    
    // const selectedState = selector(getState());
  
    // 订阅
    // 状态变了如何告诉组件更新自己
    // class组件的更新在connect中实现，函数组件的更新在useSelector中实现
    const forceUpdate = useForceUpdate();
    const state = useSyncExternalStore(() => {
      subscribe(forceUpdate);
    }, getState);
  
    // 执行传进来的函数，给它传入所有的状态值，他就能自己在外面解构出需要的
    const selectedState = selector(state);
  
    return selectedState;
  }
  
  // 返回dispatch
  export function useDispatch() {
    const store = useContext(Context);
  
    const { dispatch } = store;
  
    return dispatch;
  }