import { useReducer } from "react";
import { countReducer } from "../store";
 
// reducer的第三个参数，该函数接收第二个参数，对第二个参数初始值操作，形成最终初始值，最后返回的才是最终的值
const init = (initArg) => initArg - 0; 

export default function HooksPage(props) { 
    // hook为什么返回数组，而不是对象？
// 返回对象名字就写死了，类组件状态值名字写死，函数组件希望状态值颗粒度更细，让我们自己定义名字
  const [state, dispatch] = useReducer(countReducer, "0", init); 
//   useState和useReducer的区别就是：useReducer接收了一个reducer函数，不用像useState那样写if else 条件了
// useLayoutEffect在操作DOM、订阅的时候用，先订阅再渲染，不然渲染时就漏掉了那个依赖
  return ( 
    <div> 
      <h3>HooksPage</h3> 
      <button onClick={() => dispatch({ type: "ADD" })}>{state}</button> 
    </div> 
  ); 
} 
