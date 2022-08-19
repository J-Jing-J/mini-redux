// 给单个函数包dispatch
function bindActionCreator(creator, dispatch) {
    return (...args) => dispatch(creator(...args));
}

// mapDispatchToProps在函数里加了对象，给对象的方法加dispatch
export default function bindActionCreators(creators, dispatch) {
    let obj = {};
  
    // 遍历接收的对象
    for (const key in creators) {
        // 重新生成带dispatch的函数
      obj[key] = bindActionCreator(creators[key], dispatch);
    }
    return obj;
}