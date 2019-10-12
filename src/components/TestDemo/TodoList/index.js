import React, {Component,Fragment} from "react";
import {Input, Button, List} from 'antd'
import './index.scss'

export default class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            editItem:{
                editStatus:false,
                editId:'',
                editValue:''
            }

        }
    }

    addList = () => {
        let {actions} = this.props
        let item = {
            id: Math.random().toString().slice(2),
            value: this.state.inputValue
        }
        actions.addToDoList(item)
        this.setState({inputValue: ''})
    }

    keyupHandle = (e) => {
        if (e.keyCode === 13) {
            this.addList()
        }
    }
    onChange = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    onSearch = (value) => {
        let {actions,todosReducer} = this.props
        if(value!==''){
            actions.searchToDoList(value)
        }else{
            actions.initToDoList(todosReducer.initList)
        }

    }

    deleteItem = (id,index) => {
        this.props.actions.deleteToDoList(id,index)
    }

    handleEdit=(editStatus,item)=>{
        this.setState({
            editItem:{
                editStatus:editStatus ,
                editId:item.id,
                editValue :item.value
            }
        })
    }

    confrimEdit=()=>{
        const {editItem} = this.state
        this.props.actions.editDoList(editItem.editId,editItem.editValue)
        this.setState({
            editItem:{
                editStatus:false,
                editId:'',
                editValue:''
            }
        })
    }

    editOnChange=(e)=>{
        let {editItem} = this.state
        editItem.editValue = e.target.value
        this.setState({editItem})
    }

    render() {
        const {todosReducer} = this.props
        const {editItem} = this.state
        // console.log(todosReducer,'todosReducer')
        return (
            <div className={'todo_list_containter'}>
                <h3>todoList(Redux应用)</h3>
                <div className='tl_input'>
                    <div className="add">
                        <Input placeholder={'输入'} className='add_ipt' value={this.state.inputValue}
                               onChange={this.onChange} onKeyUp={this.keyupHandle}/>
                        <Button type="primary" onClick={this.addList}>增加</Button>
                    </div>
                    <Input.Search
                        className="search"
                        placeholder="input search text"
                        onSearch={this.onSearch}
                        style={{width: 280}}
                        enterButton
                        allowClear

                    />
                </div>
                <List
                    size="small"
                    bordered
                    dataSource={todosReducer.todoList}
                    renderItem={(item,index) => <ToDoItem item={item}
                                                  deleteItem={() => this.deleteItem(item.id,index)}
                                                  editItem={editItem}
                                                  handleEdit={this.handleEdit}
                                                  confrimEdit={this.confrimEdit}
                                                  editOnChange={this.editOnChange}
                    />}
                />

            </div>

        )
    }
}

//无状态组件
const ToDoItem = ({item, deleteItem,editItem,handleEdit,confrimEdit,editOnChange}) => {
    return (
        <List.Item>
            <div>
                {
                    editItem.editStatus && editItem.editId === item.id
                        ? <Fragment>
                            <Input placeholder={'输入'} className='add_ipt' value={editItem.editValue}
                                   onChange={(e) => {editOnChange(e)}}
                            />
                            <Button type="primary" onClick={confrimEdit}>确定修改</Button>
                        </Fragment>
                        : <Fragment>{item.value}</Fragment>
                }
            </div>
            <div className='operate'>
                <span className="operate_edit" onClick={()=>handleEdit(true,item)}>编辑</span>
                <span className="operate_line">|</span>
                <span className="operate_delete" onClick={deleteItem}>删除</span>
            </div>
        </List.Item>
    )
}