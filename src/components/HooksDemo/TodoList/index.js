import React, {Component} from "react";
import TodoListUi from "./TodoListUi";
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
        console.log('keyupHandle')
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
    searchOnchange = (e)=> {
        const {actions,todosReducer} = this.props
        if(e.target.value===''){
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
        const {actions,todosReducer} = this.props
        const {editItem,inputValue} = this.state
        return (
            <div className={'todo_list_containter'}>
                <h3>todoList(Redux应用)</h3>
                <TodoListUi todosReducer={todosReducer}
                              inputValue={inputValue}
                              onChange={this.onChange}
                              onKeyUp={this.keyupHandle}
                              addList={this.addList}
                              onSearch={this.onSearch}
                              searchOnchange={this.searchOnchange}
                              deleteItem={this.deleteItem}
                              editItem={editItem}
                              handleEdit={this.handleEdit}
                              confrimEdit={this.confrimEdit}
                              editOnChange={this.editOnChange}
            />
            </div>

        )
    }
}
