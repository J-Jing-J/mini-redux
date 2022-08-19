
export default function createStore(reducer, enhancer) {
    // enhancer（加强器）是applyMiddleware返回的函数
    // 没有enhancer只能处理plain object
    // 加强dispatch，而dispatch来自store --- 首先必须有store --- 需要createStore --- 给createStore传reducer
    if(enhancer) {
        // 这样写：函数式编程尽量参数单一性 --- 柯里化思想
        return enhancer(createStore)(reducer)
    }

    // 存储状态
    let currentState
    // 存订阅事件，更新时执行渲染新的视图，比如传forceUpdate
    let currentListeners = []

    // 获取状态
    function getState() {
        return currentState
    }

    // 更新状态
    // 根据reducer修改状态值，(createStore接收reducer，dispatch接收action)
    function dispatch(action) {
        // reducer接收上一次状态值和action，返回新的状态值
        currentState = reducer(currentState, action)
        // 遍历执行订阅函数，更新视图
        currentListeners.forEach(listener => listener())
    }

    // 变更订阅
    // dispatch时遍历执行 --- 更新视图
    function subscribe(listener) {
        currentListeners.push(listener)

        // 取消订阅
        return () => {
            // 找到当前订阅函数的下标，splice删除掉
            const index = currentListeners.indexOf(listener)
            currentListeners.splice(index, 1)
        }
    }

    // 为了显示初始值
    // 为了拿到默认状态 --- 要执行reducer --- 执行dispatch（要跟用户定义的不一样）
    dispatch({type: 'adadad'})
    
    return {
        getState,
        dispatch,
        subscribe,
    }
}