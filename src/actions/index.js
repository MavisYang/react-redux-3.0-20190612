import * as types from './actionTypes'
import {push,replace,go} from 'connected-react-router'

//router
export const goTo = (name) => (push(name))
export const replaceTo = (name)=>(replace(name))
export const directGoTo = (step) => (go(step))

//todolist
export const initToDoList=(data)=>({
    type:types.TODO_INIT,
    data:data
})
export const addToDoList=(data)=>({type:types.TODO_ADD,data:data})
export const editDoList=(id,value)=>({type:types.TODO_EDIT,id:id,value:value})
export const searchToDoList=(value)=>({type:types.TODO_SEARCH,value:value})
export const deleteToDoList=(id,index)=>({type:types.TODO_DELETE,id:id,index:index})

export const getTodoList = () =>{
    return (dispatch)=>{
        // axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList').then((res)=>{
        //     const data = res.data
        //     const actions = addToDoList(data)
        //     dispatch(actions)
        //
        // })
    }
}