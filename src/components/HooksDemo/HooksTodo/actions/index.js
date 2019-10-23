import * as types from './actionsTypes'


export const changeColor = (color) => ({type:types.UPDATE_COLOR,color:color})


//todolist
export const initToDoList = (data) => ({
    type: types.TODO_INIT,
    data: data
})
export const addToDoList=(data)=>({type:types.TODO_ADD,data:data})
export const editDoList=(id,value)=>({type:types.TODO_EDIT,id:id,value:value})
export const searchToDoList=(value)=>({type:types.TODO_SEARCH,value:value})
export const deleteToDoList=(id,index)=>({type:types.TODO_DELETE,id:id,index:index})
