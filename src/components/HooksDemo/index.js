import React,{Component} from "react";
import HooksTodo from "./HooksTodo";
import DragAndDrop from './DragAndDrop'
import TodoList from "./TodoList";
import InterScroll from './InterScroll'
import RemarksClass from './FriendsRemarks0/RemarksClass'
import './index.scss'

export default class HooksDemo extends Component{
    render() {
        const {actions,todosReducer} = this.props
        return(
            <div className='container'>
                <TodoList actions={actions} todosReducer={todosReducer}/>
                <HooksTodo actions={actions} todosReducer={todosReducer}/>
                <RemarksClass/>
                <DragAndDrop/>
                <InterScroll list={MY_ENDLESS_LIST} height={195}/>

            </div>
        )
    }
}




const MY_ENDLESS_LIST = [
    {
        key: 1,
        value: 'A'
    },
    {
        key: 2,
        value: 'B'
    },
    {
        key: 3,
        value: 'C'
    },
    {
        key: 4,
        value: 'D'
    },{
        key: 5,
        value: 'E'
    },{
        key: 6,
        value: 'F'
    },{
        key: 7,
        value: 'G'
    },{
        key: 8,
        value: 'H'
    },{
        key: 9,
        value: 'I'
    },{
        key: 10,
        value: 'J'
    },{
        key: 11,
        value: 'K'
    },
]