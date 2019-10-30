import React, {Fragment, useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import {Button, Input} from "antd";
import axios from "axios";
import ReducerContext from '../HooksDemo/HooksTodo/ReducerContext'
export default function React_1030() {

    return (
        <div>
            <h2>React Hooks(useMemo与useCallback使用指南)</h2>
            <h3>useMemo</h3>
            <WithoutMemo/>
            <h3>reducer+context</h3>
            <ReducerContext/>
        </div>

    )
}


const set = new Set()
function WithoutMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');


    // const expensive =()=> {
    //     console.log('compute');
    //     let sum = 0;
    //     for (let i = 0; i < count * 100; i++) {
    //         sum += i;
    //     }
    //     return sum;
    // }
    //在没有使用useMemo时，无论是修改count还是val，由于组件的重新渲染，都会触发expensive的执行
    //但需求是只在count的值修改时，执行expensive计算
    const expensive = useMemo(()=>{
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) { //需要的依赖count
            sum += i;
        }
        return sum;
    },[count])
    //使用useMemo来执行昂贵的计算，然后将计算值返回，并且将count作为依赖值传递进去。这样，就只会在count改变的时候触发expensive执行，在修改val的时候，返回上一次缓存的值。


    const callback = useCallback(()=>{
        console.log(count,'count')
        return count
    },[count])
    set.add(callback)


    return <div>
        <h4>{count}-{val}-{expensive}</h4>
        <h4>set.size:{set.size}</h4>
        <div>
            <Button onClick={() => setCount(count + 1)}>+c1</Button>
            <Input style={{width:'200px',marginLeft:'10px'}} value={val} onChange={event => setValue(event.target.value)}/>
        </div>
        <Child callback={callback} countProps={count}/>



    </div>;
}



function Child({ callback,countProps }) {
    const [count, setCount] = useState(()=>callback());
    const [status,setStatus] = useState(false)

    useEffect(() => {
        console.log(callback(),'Child')
        setCount(callback())

    }, [callback]); // ✅ Effect deps are OK

    function handleChange() {
        setStatus(!status)
    }

    return(
        <div style={{marginTop:'10px'}}>
            <h4>Child:{count}</h4>
            <h4>{countProps}</h4>
            <p>{status?'是':'否'}</p>
            <Button onClick={()=>handleChange()}>change</Button>
        </div>

    )
}

