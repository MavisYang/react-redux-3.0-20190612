
import {createBrowserHistory} from "history";
import { applyMiddleware, compose, createStore } from 'redux'; // 引入createStore方法等
import { routerMiddleware} from 'connected-react-router';
import thunk from "redux-thunk";
import createRootReducer from '../reducers';

export const history =  createBrowserHistory()
//reducers 计算状态的纯函数
//initialState 初始化数据
//enhancers中间件

const enhancers = []
const middleware = [thunk, routerMiddleware(history)]//增加中间件和history


if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__
    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}//在开发环境中使用： 使用Chrome浏览器在"扩展程序"中安装Redux Dev Tools（中间件）。


const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)//利用compose创造一个增强函数，就相当于建立了一个链式函数，

export default function configureStore(preloadedState){
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composedEnhancers,

    )// 创建数据存储仓库

    return store
}


/**
 * 引用
 *
 * import store from './store'
 *
 * constructor(props){
    super(props)
    console.log(store.getState())
   }
 * */

// compose(
//     applyMiddleware(routerMiddleware(history),thunk),//使用routerMiddleware(history)如果需要dispatch history给connectRouter
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )// 其作用是把一系列的函数，组装生成一个新的函数，并且从后到前，后面参数的执行结果作为其前一个的参数。


// import { createBrowserHistory } from 'history'
// import { applyMiddleware, compose, createStore } from 'redux'
// import { routerMiddleware } from 'connected-react-router'
// import createRootReducer from '../reducers'
//
// export const history = createBrowserHistory()
//
// export default function configureStore(preloadedState) {
//     const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
//     const store = createStore(
//         createRootReducer(history),
//         preloadedState,
//         composeEnhancer(
//             applyMiddleware(
//                 routerMiddleware(history),
//             ),
//         ),
//     )
//     return store
// }
