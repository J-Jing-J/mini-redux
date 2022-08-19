import { Component } from "react";
import store from '../store'

export default class ReduxPage extends Component {
    componentDidMount() {
        // 订阅：dispatch后不会自动更新
        // 告诉redux，一旦state变化（dispatch），就执行的事件
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        })
    }

    componentWillUnmount() {
        // 取消订阅和订阅要成对出现
        this.unsubscribe()
    }

    add = () => {
        store.dispatch({type: "ADD"})
    }

    render() {
        return (
            <div>
                <h3>1231231</h3>
                <p>{store.getState()}</p>
                <button onClick={this.add}>add</button>
            </div>
        )
    }
}