import React, {Fragment, useEffect, useReducer} from "react";
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
    useEffect(() => {
        document.title = `You clicked ${state.count} times`;
        return () => {
            document.title = `remove`;
        }
    }, [state.count])

    return (
        <Fragment>
            <h3 style={{color: 'red'}}>一个js页面应用Reducer</h3>
            <Button onClick={() => dispatch({type: 'add'})}>+</Button>
            <span style={{margin: '0 20px'}}> Reducer 数字：{state.count}</span>
            <Button onClick={() => dispatch({type: 'sub'})}>-</Button>
            <Button onClick={() => dispatch({type: 'reset', payload: initialCount})}>重置</Button>
        </Fragment>
    )
}

export default ReducerCount;