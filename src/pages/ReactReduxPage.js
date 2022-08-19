import { Component } from "react";
// import { connect } from "react-redux";
import { connect } from "../react-redux/";
// import { bindActionCreators } from "redux";
import { bindActionCreators } from "../redux";

// HOC高阶组件（higer order Component）本质是函数：接受组件作为参数，返回新的组件
// connect包裹：高阶组件，返回新组件
// 接收两个函数：mapStateToProps、mapDispatchToProps：状态值/dispatch函数映射到新组件上
// 或者用到哪些就解构哪些，比如下面的({ count }) => ({ count }),
// mapStateToProps可以接收第二个参数ownProps，是传给当前页面的props，需要处理的话可以接收

// mapDispatchToProps
// 默认就传了dispatch
// 也可以接收对象，接收对象的话，props上没有dispatch，而是对象（{add: fun, minus: fun}）
// 原理：react-redux库背后，执行对象里传的函数，加了dispatch

export default connect(
  mapStateToProps,
    (state, ownProps) => {
      console.log("ownProps", ownProps); //sy-log

      return state;
    },
//   ({ count }) => ({ count }),
//   mapDispatchToProps function|object

//   {
//     add: () => ({ type: "ADD" }),
//     minus: () => ({ type: "MINUS" }),
//   }

    (dispatch) => {
    // 直接传对象的话，react-redux会帮你加，但是这样自己写，就要自己包一层dispatch或者bindActionCreators

      let creators = {
        add: () => ({ type: "ADD" }),
        minus: () => ({ type: "MINUS" }),
      };

      creators = bindActionCreators(creators, dispatch);

      return { dispatch, ...creators };
    }

)(
  class ReactReduxPage extends Component {
    render() {
      console.log("props", this.props); //sy-log
      const { count, dispatch, add, minus } = this.props;
      return (
        <div>
          <h3>ReactReduxPage</h3>
          <button
            onClick={() => {
              dispatch({ type: "ADD" });
            }}
          >
            dispatch:{count}
          </button>
          <button onClick={add}>add: {count}</button>
        </div>
      );
    }
  }
);