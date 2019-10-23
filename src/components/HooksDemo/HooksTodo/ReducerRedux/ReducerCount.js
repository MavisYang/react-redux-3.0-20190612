import React, {Fragment, useEffect, useLayoutEffect, useReducer, useRef, useState} from "react";
import {Button} from "antd";


const initialState = {
    count: 0
};

function init(initialCount) {
    return initialCount
}

function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return {count: state.count + 1};
        case 'sub':
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload)
        default:
            break;
    }

}

function ReducerCount({initialCount}) {
    const [state, dispatch] = useReducer(reducer, initialState, init)

    const [text, setText] =useState('')
    const prevCountRef = useRef()
    useEffect(()=>{
        console.log(prevCountRef,'useEffect')
        document.title = `You clicked ${state.count} times`;
        return()=>{
            console.log(prevCountRef,'end useEffect')
            document.title = `remove`;
        }
    })

    //=====8：useLayoutEffect====
    useLayoutEffect(()=>{
        console.log(prevCountRef,'useLayoutEffect')
        document.title = `You clicked ${state.count} times`;
        return()=>{
            console.log(prevCountRef,'end useLayoutEffect')
            document.title += `!!!`;
        }
    })

    console.log('更新Example',state.count)

    //====打印结果===
    //更新Example 2
    // ReducerCount.js:46 {current: input} "end useLayoutEffect"
    // ReducerCount.js:43 {current: input} "useLayoutEffect"
    // ReducerCount.js:37 {current: input} "end useEffect"
    // ReducerCount.js:34 {current: input} "useEffect"

    //点击+或者-或者向input输入内容，会发现每次都会先进行 useEffect与useLayout的清理函数，再执行他们的初始函数。
    // 并且发现useEffect的函数会在最后才执行，它会晚于包含它的父函数。
    return (
        <Fragment>
            <h3>一个js页面应用Reducer</h3>
            <Button onClick={() => dispatch({type: 'add'})}>+</Button>
            <span style={{margin: '0 20px'}}> Reducer 数字：{state.count}</span>
            <Button onClick={() => dispatch({type: 'sub'})}>-</Button>
            <Button onClick={() => dispatch({type: 'reset', payload: initialCount})}>重置</Button>

            <h3>useEffect和useLayoutEffect</h3>

            <div>
                <input type="text" ref={prevCountRef} value={text} onChange={(e)=>setText(e.target.value)}/>
            </div>
        </Fragment>
    )
}

export default ReducerCount;