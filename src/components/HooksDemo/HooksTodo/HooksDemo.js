import React,{Fragment,useState,useEffect,createContext,useContext,useReducer} from "react";
import {Button} from "antd";
import {ParamsContext} from './UseContext'
import ReducerCount from './ReducerRedux/ReducerCount'
import FatherComponent from './UseOther'
import ReducerRedux from './ReducerRedux'

//======3:useContext======
const AgeContext = createContext()
function ChildAge(props) {
    console.log('ChildAge',props)
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
    useEffect(()=>{
        /**
         * useEffect替代生命周期函数
         * useEffect在react首次渲染和之后的每次渲染都会被调用，相当于首次渲染(componentDidMount)和更新导致的重新渲染(componentDidUpdate)
         * 通过返回一个函数的形式进行解绑，相当于(componentWillUnmount)
         */
        console.log(age)
        onShow('componentDidMount')
        return ()=>{
            console.log('====================')
            onShow('componentWillUnmount')
        }
    },[])

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
        console.log(state)
    }

    return(
        <div>
            <Button onClick={()=>props.actions.goTo('/v2/tdscope')}>go back</Button>
            <h1 style={{marginTop:'20px'}}>hook学习demo</h1>
            <h1 style={{color:'red'}}>--useState,useEffect--</h1>
            <div onClick={()=>setAge(age+1)}>年龄：{age}岁</div>
            <div onClick={()=>setSex(sex==="男"?'女':'男')}>性别：{sex}</div>

            <h1 style={{color:'red'}}>--createContext,useContext--</h1>
            <AgeContext.Provider value={age} >
                <ChildAge age={age}/>
            </AgeContext.Provider>

            <ParamsContext.Provider value={params}>
                <ChildParams/>
            </ParamsContext.Provider>

            <h1 style={{color:'red'}}>--useReducer--</h1>
            <Fragment>
                <Button onClick={()=>setCount({type:'add'})}>+</Button>
                <span style={{margin:'0 20px'}}> 数字：{count}</span>
                <Button onClick={()=>setCount({type: 'sub'})}>-</Button>
            </Fragment>

            <ReducerCount initialCount={{count:0}}/>

            <h1 style={{color:'red'}}>--useMemo,useRef--</h1>
            <FatherComponent/>

            <ReducerRedux/>
        </div>
    )

}

export default HooksDemo;


