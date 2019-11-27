import React, {useState, useReducer} from 'react';
import {Button} from "antd";
import TodoReducer, {
    initialState,
    TODO_ADD,
    TODO_DELETE,
    TODO_EDIT,
    TODO_INIT,
    TODO_SEARCH
} from './UseReducers/todosReducer.js'
import TodoListUi from '../TodoList/TodoListUi'
import '../TodoList/index.scss'

function HooksTodo(props) { //此处传入props值
    // console.log(props,'props')
    const actions = props.actions
    const [state, dispatch] = useReducer(TodoReducer, initialState)//使用useReducer中的dispatch方式
    // const todoLists = state.todoList
    const initLists = state.initList
    // console.log(state,'state===useReducer')

    const [inputValue, setIptValue] = useState('');//es6的数组解构
    function addList() {
        if (inputValue !== '') {
            let item = {
                id: Math.random().toString().slice(2),
                value: inputValue
            }
            dispatch({
                type: TODO_ADD,
                data: item
            })
            setIptValue('')
        }
    }

    function onSearch(value) {
        if (value !== '') {
            dispatch({
                type: TODO_SEARCH,
                value: value
            })
        } else {//还原
            dispatch({
                type: TODO_INIT,
                data: initLists
            })
        }
    }

    function searchOnchange(e) {
        if (e.target.value === '') {
            dispatch({
                type: TODO_INIT,
                data: initLists
            })
        }
    }

    //编辑
    const [editItem, setEditItem] = useState({editStatus: false, editId: '', editValue: ''})

    function handleEdit(editStatus, item) {
        setEditItem({
            editStatus,
            editId: item.id,
            editValue: item.value
        })
    }

    function editOnChange(e) {
        setEditItem({
            editStatus: editItem.editStatus,
            editId: editItem.editId,
            editValue: e.target.value
        })
    }

    function confrimEdit() {
        dispatch({
            type: TODO_EDIT,
            id: editItem.editId,
            value: editItem.editValue
        })
        setEditItem({editStatus: false, editId: '', editValue: ''})
    }

    //删除
    function deleteItem(id, index) {
        dispatch({
            type: TODO_DELETE,
            id: id,
            index: index
        })

    }

    function keyupHandle(e) {
        if (e.keyCode === 13) {
            addList()
        }
    }

    function onChange(e) {
        setIptValue(e.target.value)
    }

    return (
        <div className='hooks_todo_list todo_list_containter'>
            <Button onClick={() => {
                actions.goTo('/v2/tdscope/hooks')
            }} style={{marginBottom: '20px'}}>hooks demo</Button>
            <h3>Hooks To do List(useReducer)</h3>
            <TodoListUi todosReducer={state}
                        inputValue={inputValue}
                        onChange={onChange}
                        onKeyUp={keyupHandle}
                        addList={addList}
                        onSearch={onSearch}
                        searchOnchange={searchOnchange}
                        deleteItem={deleteItem}
                        editItem={editItem}
                        handleEdit={handleEdit}
                        confrimEdit={confrimEdit}
                        editOnChange={editOnChange}
            />
        </div>

    )

}


export default HooksTodo

