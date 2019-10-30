import React, {createContext, useContext, useEffect, useReducer, useState} from "react";
import {Button} from 'antd'

const ParamsContext = createContext();

const initState = {
    name: 'mao',
    permit: true
}
const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'init':
            return action.data;
        case 'add':
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }

}

export default function ReducerContext() {
    const [data, dispatch] = useReducer(reducer, initState)
    return (
        <div className='container'>
            <ParamsContext.Provider value={{data, dispatch}}>
                <Child/>
                <DeepChild/>
            </ParamsContext.Provider>
        </div>
    )
}


function Child(props) {
    //console.log(props,'props') //{dispatch: ƒ () data: {name: "miao"}}
    const context = useContext(ParamsContext)
    // console.log(context,'useContext')

    const changePermit = () => {
        context.dispatch({
            type: 'add',
            data: {
                permit: !context.data.permit
            }
        })
    }
    return (
        <div>
            <p>Child</p>
            <p>name:{context.data.name && context.data.name} </p>
            <p>权限:{context.data.permit && context.data.permit ? '我是有权限的' : '我没有权限'} </p>
            <Button onClick={changePermit}>开启用户权限</Button>
        </div>
    )
}

function DeepChild() {
    const context = useContext(ParamsContext)
    const [text, setText] = useState('没有权限')
    useEffect(() => {
        const permit = context.data.permit
        permit ? setText('有权限') : setText('没有权限')
    }, [text])

    return (
        <div>
            静态值：{text}
        </div>
    )

}