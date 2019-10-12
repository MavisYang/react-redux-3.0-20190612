import React, {useState, useEffect} from 'react';
import todosReducer from '../../../reducers/todosReducer'
import useReducer from "../../../reducers/useReducer";
import Input from '../../shareComponents/Input'

const todoList = [
    {id: 1, text: 'Phoebe'},
    {id: 2, name: 'Rachel'},
    {id: 3, name: 'Ross'},
];

function TodosReducer(params) {
    const [todos, dispatch] = useReducer(todosReducer, [])

    console.log(todos, 'todos');


    // function handleAddClick(data) {
    //   dispatch({ type: 'TODO_INIT', data})
    // }
}

function HooksTodo() {
    const [todo, setTodos] = useState({
        id: Math.random().toString().slice(2, 6),
        text: ''
    })
    useEffect(() => {
        setTimeout(() => {

        }, 1000);


    })

    function iptChangeParams(name, value) {
        console.log(TodosReducer(), name, value);

        setTodos({...todo, text: value})
    }


    return (
        <div className='hooks_todo_list'>
            <h3>Hooks To do List(Hooks应用)</h3>
            <Input
                className='todo'
                placeholder='请输入内容' paramsname='text'
                value={todo.text}
                iptChangeParams={iptChangeParams}/>


        </div>

    )

}

export default HooksTodo;