import {TODO_INIT, TODO_ADD, TODO_DELETE, TODO_SEARCH, TODO_EDIT} from '../actions/actionTypes'

const initState = {//默认数据
    initList: [],//用于清除搜索时
    todoList: [
        // {
        //     id:'',
        //     value:''
        // }
    ],
}

export default function todosReducer(state = initState, action) {//就是一个方法函数
    // state: 是整个项目中需要管理的数据信息
    console.log( action, 'action.data')
    switch (action.type) {//Reducer里只能接收state,不能改变state
        case TODO_INIT:
            return {
                ...state,
                todoList: action.data,
                initList: action.data,
            }
        case TODO_ADD:
            return {
                ...state,
                todoList: state.todoList.concat(action.data),
                initList: state.initList.concat(action.data)
            }
        case TODO_EDIT:
            return {
                ...state,
                todoList: state.todoList.map(v => v.id === action.id ? {...v, value: action.value} : {...v}),
                initList: state.initList.map(v => v.id === action.id ? {...v, value: action.value} : {...v})
            }
        case TODO_DELETE:
            return {
                ...state,
                todoList: state.todoList.filter(item => item.id !== action.id),
                initList: state.initList.filter(item => item.id !== action.id)
            }
        case TODO_SEARCH:
            return {
                ...state,
                todoList: state.todoList.filter(v => v.value.includes(action.value)),
                initList: state.initList
            }
        default:
            return state;
    }

}

