import React, {Fragment, useState, useEffect, createContext, useContext, useReducer, useRef} from "react";
import {Button} from "antd";
import {ParamsContext} from './UseContext'
import ReducerCount from './ReducerRedux/ReducerCount'
import FatherComponent from './UseOther'
import ReducerRedux from './ReducerRedux'
import WinSizeUseHooks from '../WinSizeUseHooks'
//======3:useContext======
const AgeContext = createContext()
function ChildAge(props) {
    // console.log('ChildAge',props)
    const age = useContext(AgeContext)
    return(<h3>通过createContext和useContext实现父子组件的传递：{age}</h3>)

}

function ChildParams() {
    const context  = useContext(ParamsContext)
    return(
        <Fragment>
            <h3>{context.title}</h3>
            <h3>{context.des}</h3>
        </Fragment>
    )

}

function HooksDemo(props) {

    //=====1:useState======
    const [age,setAge] = useState(18)//es6的数组解构
    const [sex,setSex] = useState('男')
    const [params] = useState({
        title:'这是一个params的title',
        des:'这是一个params的des'
    })

    //=====2:useEffect======
    const [text, setText] =useState('')

    const prevCountRef = useRef()
    useEffect(()=>{
        /**
         * useEffect替代生命周期函数
         * useEffect在react首次渲染和之后的每次渲染都会被调用，相当于首次渲染(componentDidMount)和更新导致的重新渲染(componentDidUpdate)
         * 通过返回一个函数的形式进行解绑，相当于(componentWillUnmount)
         */
        console.log(prevCountRef,'useEffect')
        document.title = `You clicked ${age} times`;
        onShow('useEffect--componentDidMount')
        return ()=>{
            // console.log('====================')
            console.log(prevCountRef,'end useEffect')
            document.title = `remove`;
            onShow('useEffect--componentWillUnmount')
        }
    },[age])


    //=====8：useLayoutEffect====
    // useLayoutEffect(()=>{
    //     console.log(prevCountRef,'useLayoutEffect')
    //     document.title = `You clicked ${age} times`;
    //     return()=>{
    //         console.log(prevCountRef,'end useLayoutEffect')
    //         document.title += `!!!`;
    //     }
    // })

    // console.log('更新Example',age)

    //====打印结果===
    //更新Example 18
    // ReducerCount.js:46 {current: input} "end useLayoutEffect"
    // ReducerCount.js:43 {current: input} "useLayoutEffect"
    // ReducerCount.js:37 {current: input} "end useEffect"
    // ReducerCount.js:34 {current: input} "useEffect"

    //会打印三次的原因是没有加第二个参数
    //点击+或者-或者向input输入内容，会发现每次都会先进行 useEffect与useLayout的清理函数，再执行他们的初始函数。
    // 并且发现useEffect的函数会在最后才执行，它会晚于包含它的父函数。

    //======4:useReducer========
    const [count,setCount] = useReducer((state,action)=>{
        switch (action.type) {
            case 'add':
                return state + 1;
            case 'sub':
                return state - 1;
            default:
                break;
        }
    },0)

    function onShow(state) {
        // console.log(state)
    }

    return(
        <div className='container'>
            <Button onClick={()=>props.actions.goTo('/v2/tdscope')}>go back</Button>
            <h2>hook学习demo</h2>
            <h3 style={{color:'red'}}>--useState,useEffect--</h3>
            <div onClick={()=>setAge(age+1)}>年龄：{age}岁</div>
            <div onClick={()=>setSex(sex==="男"?'女':'男')}>性别：{sex}</div>

            <h3 style={{color:'red'}}>--useEffect,useLayoutEffect--</h3>
            <div>
                <input type="text" ref={prevCountRef} value={text} onChange={(e)=>setText(e.target.value)}/>
            </div>

            <h3 style={{color:'red'}}>--createContext,useContext--</h3>
            <AgeContext.Provider value={age} >
                <ChildAge age={age}/>
            </AgeContext.Provider>

            <ParamsContext.Provider value={params}>
                <ChildParams/>
            </ParamsContext.Provider>

            <h3 style={{color:'red'}}>--useReducer--</h3>
            <Fragment>
                <Button onClick={()=>setCount({type:'add'})}>+</Button>
                <span style={{margin:'0 20px'}}> 数字：{count}</span>
                <Button onClick={()=>setCount({type: 'sub'})}>-</Button>
            </Fragment>

            <ReducerCount initialCount={{count:0}}/>

            <h3 style={{color:'red'}}>--useMemo,useRef--</h3>
            <FatherComponent/>

            <h3 style={{color:'red'}}>--useReducer+useContext实现redux功能--</h3>
            <ReducerRedux/>

            <h3 style={{color:'red'}}>--自定义hooks--</h3>
            <WinSizeUseHooks/>
        </div>
    )

}

export default HooksDemo;


