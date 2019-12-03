import React, {useState, useEffect, useRef, useReducer, createContext, useCallback, useMemo, useContext} from 'react';
import './index.scss'
import {Button,Input} from "antd";
import {useDataApi,useInputValue} from './Hooks'

const Store = createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'incCount':
            return {
                ...state,
                count: state.count + 1
            }
        case 'incStep':
            return {
                ...state,
                step: state.step + 1
            }
        default:
            return state
    }

}


export default function React_1129() {
    const [state, dispatch] = useReducer(reducer, {count: 0, step: 0})

    return (<div>
        <h2>精读《Function Component 入门》</h2>
        <Store.Provider value={{state, dispatch}}>
            <Count/>
            <Step/>
        </Store.Provider>
        <App/>
    </div>)
}

const Count = () => {
    const {state, dispatch} = useContext(Store)
    console.log( 'Count')

    return useMemo(()=>(
        <Button onClick={() => dispatch({type: 'incCount'})}>incCount {state.count}</Button>
    ),[state.count,dispatch])
}

const Step = () => {
    const {state, dispatch} = useContext(Store)
    console.log( 'Step')
    return useMemo(()=>(
        <Button onClick={() => dispatch({type: 'incStep'})}>incCount {state.step}</Button>
    ),[state.step,dispatch])
}


const App=()=>{
    const [count, forceUpdate] = useState(0);
    const schema = useRef({ b: 1 });
    const {data,isLoading,isError} =useDataApi('https://hn.algolia.com/api/v1/search?query=react',{hits:[]})
    // const [{data, isLoading, isError}, doFetch]=useDataApiFetch('https://hn.algolia.com/api/v1/search?query=react',{hits:[]})

    const {value,onChange} = useInputValue('')


    // useEffect(()=>{
    //     console.log(data,isLoading,isError,'---')
    //
    // },[data,isLoading,isError])
    return(
        <div>
            <Input value={value} onChange={onChange} style={{width:'200px'}}/>
            <Button>获取input的值{value}</Button>
            {
                isLoading? <div>loading....</div>
                    :data.hits.slice(0,3).map(v=>(<p key={v.title}>{v.title}</p>))
            }
            <ChildApp schema={schema.current}/>
            <div onClick={() => forceUpdate(count + 1)}>Count {count}</div>
        </div>
    )
}

const ChildApp = ({schema})=>{
    useEffect(()=>{
        console.log(schema,'schema')
    },[schema])
    return useMemo(()=>(
        <div>child:{schema.b}</div>
    ))
}
