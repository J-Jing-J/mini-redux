import { useCallback } from "react";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector, useDispatch } from "../react-redux";

export default function ReactReduxHookPage(props) {
    // 返回状态管理库的值 --- 函数组件用useSelector
    // 消费context传下来的value：count
  const count = useSelector(({ count }) => count);

//   获取修改的方法，hook：useDispatch
  const dispatch = useDispatch();

  const add = useCallback(() => {
    dispatch({ type: "ADD" });
  }, []);

  return ( 
    <div> 
      <h3>ReactReduxHookPage</h3> 
      <button onClick={add}>{count}</button> 
    </div> 
  ); 
} 