import React, {Fragment} from "react";
import {Button, Input, List} from "antd";

//无状态组件，直接收传入的props值，不做逻辑处理
//ui和逻辑分离
const TodoListUi = (props) => {
    return (
        <Fragment>
            <div className='tl_input'>
                <div className="add">
                    <Input placeholder={'输入'} className='add_ipt' value={props.inputValue}
                           onChange={props.onChange}
                           onKeyUp={props.onKeyUp}/>
                    <Button type="primary" onClick={props.addList}>增加</Button>
                </div>
                <Input.Search
                    className="search"
                    placeholder="input search text"
                    onSearch={props.onSearch}
                    style={{width: 280}}
                    enterButton
                    allowClear

                />
            </div>
            <List
                size="small"
                bordered
                dataSource={props.todosReducer.todoList}
                renderItem={(item, index) => <ToDoItem item={item}
                                                       deleteItem={() => props.deleteItem(item.id, index)}
                                                       editItem={props.editItem}
                                                       handleEdit={props.handleEdit}
                                                       confrimEdit={props.confrimEdit}
                                                       editOnChange={props.editOnChange}
                />}
            />
        </Fragment>
    )
}


export default TodoListUi;


//无状态组件
const ToDoItem = ({item, deleteItem, editItem, handleEdit, confrimEdit, editOnChange}) => {
    return (
        <List.Item>
            <div>
                {
                    editItem.editStatus && editItem.editId === item.id
                        ? <Fragment>
                            <Input placeholder={'输入'} className='add_ipt' value={editItem.editValue}
                                   onChange={(e) => {
                                       editOnChange(e)
                                   }}
                            />
                            <Button type="primary" onClick={confrimEdit}>确定修改</Button>
                        </Fragment>
                        : <Fragment>{item.value}</Fragment>
                }
            </div>
            <div className='operate'>
                <span className="operate_edit" onClick={() => handleEdit(true, item)}>编辑</span>
                <span className="operate_line">|</span>
                <span className="operate_delete" onClick={deleteItem}>删除</span>
            </div>
        </List.Item>
    )
}