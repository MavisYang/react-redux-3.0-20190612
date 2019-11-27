// import {TODO_ADD, TODO_DELETE, TODO_EDIT, TODO_INIT, TODO_SEARCH} from "../actions/actionsTypes";
export const TODO_ADD = "todoReducer/TODO_ADD";
export const TODO_DELETE = "todoReducer/TODO_DELETE";
export const TODO_EDIT = "todoReducer/TODO_EDIT";
export const TODO_INIT = "todoReducer/TODO_INIT";
export const TODO_SEARCH = "todoReducer/TODO_SEARCH";
export const initialState={
    todoList:[],
    initList:[]
}

export default function TodoReducer(state=initialState,action){
    // console.log(action,'action')
    switch (action.type) {
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
                // todoList: state.todoList.splice(action.index,1),//splice删除返回的是删除的数组
                // initList: state.initList.splice(action.index,1),
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

