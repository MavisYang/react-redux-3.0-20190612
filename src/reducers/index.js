import {combineReducers} from 'redux'// 引入combineReducers
import {connectRouter} from 'connected-react-router'
import todosReducer from './todosReducer'
import naviMetaData from './naviMetaData'
import userInfo from "./userInfo";

const createRootReducer = (history) => combineReducers({//使用combineReducers 将两个reducer变为一个
    router: connectRouter(history),//添加路由reducer通过传递history给connectRouter
    todosReducer, naviMetaData, userInfo,// rest of your reducers

})
export default createRootReducer;