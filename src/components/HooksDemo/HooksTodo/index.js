import React, {useState, useEffect, useContext, Fragment, createContext, useReducer} from 'react';
import {Button, Input, List,Popconfirm} from "antd";
import {TodoReducer} from './UseReducers/todosReducer.js'
import '../TodoList/index.scss'

function HooksTodo(props) { //此处传入props值
    // console.log(props,'props')
    const actions = props.actions
    const [inputValue,setIptValue] = useState('');//es6的数组解构
    const [state,dispatch] = useReducer(TodoReducer,{
        todoList:[],
        initList:[]
    })//使用useReducer中的dispatch方式
    const todoLists = state.todoList
    const initLists = state.initList
    // console.log(state,'state===useReducer')

    function addList(){
        if(inputValue!==''){
            let item = {
                id: Math.random().toString().slice(2),
                value: inputValue
            }
            dispatch({
                type:'TODO_ADD',
                data:item
            })
            setIptValue('')
        }
    }

    function onSearch(value) {
        if(value!==''){
            dispatch({
                type:'TODO_SEARCH',
                value:value
            })
        }else{//还原
            dispatch({
                type:'TODO_INIT',
                data:initLists
            })
        }
    }

    function searchOnchange(e) {
        if(e.target.value===''){
            dispatch({
                type:'TODO_INIT',
                data:initLists
            })
        }
    }
    //编辑
    const [editItem,setEditItem] = useState({editStatus:false,editId:'',editValue:''})

    function handleEdit(editStatus,item){
        setEditItem({
            editStatus,
            editId:item.id,
            editValue:item.value
        })
    }

    function editOnChange(e) {
        setEditItem({
            editStatus:editItem.editStatus,
            editId:editItem.editId,
            editValue:e.target.value
        })
    }

    function confrimEdit(){
        dispatch({
            type:'TODO_EDIT',
            id:editItem.editId,
            value:editItem.editValue
        })
        setEditItem({editStatus:false,editId:'',editValue:''})
    }

    //删除
    function deleteItem(id,index) {
        dispatch({
            type:'TODO_DELETE',
            id:id,
            index:index
        })

    }

    return (
        <div className='hooks_todo_list todo_list_containter'>
            <Button onClick={()=>{actions.goTo('/v2/tdscope/hooks')}} style={{marginBottom:'20px'}}>hooks demo</Button>
            <h3>Hooks To do List(useReducer)</h3>
            <Fragment>
                <div className='tl_input'>
                    <div className="add">
                        <Input placeholder={'输入'} className='add_ipt'
                               value={inputValue}
                               onChange={(e)=>setIptValue(e.target.value)}
                               onKeyUp={(e)=>e.keyCode===13&&addList()}
                        />
                        <Button type="primary" onClick={addList}>增加</Button>
                    </div>
                    <Input.Search
                        className="search"
                        placeholder="input search text"
                        onSearch={onSearch}
                        onChange={(e)=>{searchOnchange(e)}}
                        style={{width: 280}}
                        enterButton
                        allowClear
                    />
                </div>
                <List
                    size="small"
                    bordered
                    dataSource={todoLists}
                    renderItem={(item, index) => <ToDoItem item={item}
                                                           deleteItem={() => deleteItem(item.id, index)}
                                                           editItem={editItem}
                                                           handleEdit={handleEdit}
                                                           confrimEdit={confrimEdit}
                                                           editOnChange={editOnChange}
                    />
                    }
                />

            </Fragment>




        </div>

    )

}


export default HooksTodo


function ToDoItem(props) {
    return(
        <List.Item>
            {
                props.editItem.editStatus && props.editItem.editId === props.item.id
                    ? <Fragment>
                        <Input placeholder={'输入'} className='add_ipt' value={props.editItem.editValue}
                               onChange={(e) => {
                                   props.editOnChange(e)
                               }}
                        />
                        <Button type="primary" onClick={props.confrimEdit}>确定修改</Button>
                    </Fragment>
                    : <Fragment>{props.item.value}</Fragment>
            }
            <div className='operate'>
                <span className="operate_edit" onClick={() => props.handleEdit(true, props.item)}>编辑</span>
                <span className="operate_line">|</span>
                <Popconfirm
                    placement="topRight"
                    title={'确定删除该list吗？'}
                    onConfirm={props.deleteItem}
                    okText="确定"
                    cancelText="取消"
                >
                    <span className="operate_delete">删除</span>
                </Popconfirm>

            </div>
        </List.Item>
    )
}
