import {useState} from "react";

/**
 *  利用 useState 创建 Redux
 * 这就是 Redux
 * useReducer 已经作为一个内置 Hooks 了，在这里可以查阅所有 内置 Hooks。
 * 不过这里需要注意的是，每次 useReducer 或者自己的 Custom Hooks 都不会持久化数据
 * 如果要真正实现一个 Redux 功能，也就是全局维持一个状态，任何组件 useReducer 都会访问到同一份数据，可以和 useContext 一起使用。
 * */
function useReducer(reducer,initialState) {
    const [state,setState] = useState(initialState)

    function dispatch(action){
        const nextState = reducer(state,action)
        setState(nextState)
    }

    return [state,dispatch];
}


export default useReducer;