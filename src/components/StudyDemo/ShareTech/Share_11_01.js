import React, {Fragment, useCallback, useEffect, useMemo, useReducer, useRef, useState} from "react";
import {Button, Input} from "antd";
import axios from 'axios'
import {fetchDataAxios} from '../Fetch'
export default function Share_11_01() {
    const [count, setCount] = useState(0)

    //告诉 React 如何对比 Effects
    //虽然 React 在 DOM 渲染时会 diff 内容，只对改变部分进行修改，而不是整体替换，但却做不到对 Effect 的增量修改识别。
    // 因此需要开发者通过 useEffect 的第二个参数告诉 React 用到了哪些外部变量：
    useEffect(() => {
        const timer = setInterval(() => {
            // setCount(count+1)//需要依赖count
            setCount(c => c + 1)
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])


    //如果非要把 Function 写在 Effect 外面呢？就用 useCallback 吧！

    return (
        <Fragment>
            <h2>React Hooks(2019.11.01)</h2>
            <div>计时器：{count}</div>
            <h3>1.每一次渲染都有它自己的 Props and State</h3>
            <h3>2.每一次渲染都有它自己的事件处理函数</h3>
            <CountAlert/>
            <h3>3.每次渲染都有它自己的Effects</h3>
            <h3>4.使用refs在effect的回调函数里读取最新的值而不是捕获的值</h3>
            <h3>5.告诉React去比对你的Effects,选对依赖</h3>
            <h3>6.解耦来自Actions的更新</h3>
            <CountActions/>
            <h3>7.useReducer是Hooks的作弊模式</h3>
            <ReducerCounter step={1}/>
            <h3>8.把函数移到Effects里</h3>
            <SearchResults/>
        </Fragment>

    )
}


const CountAlert = () => {
    const [count, setCount] = useState(0)

    const latestCount = useRef(count)
    useEffect(() => {
        document.title = `You clicked ${count} times`;

        // Set the mutable latest value
        latestCount.current = count
        setTimeout(() => {
            // console.log(`每次渲染都有它自己的Effects:You clicked ${count} times`);
            // Read the mutable latest value
            // console.log(`模拟了class中的行为:you clicked ${latestCount.current} times`)
        }, 300)
    })

    function handleAlertClick() {
        setTimeout(() => {
            alert('You clicked on: ' + count)
        }, 3000)
    }

    return (
        <Fragment>
            <div>You clicked {count} times</div>
            <Button onClick={() => setCount(count + 1)}>click me</Button>
            <Button onClick={handleAlertClick}>show alert</Button>
            <div style={{lineHeight: '28px'}}>
                点击增加counter到3 <br/>
                点击一下 “Show alert” (3s之后弹出一次3)<br/>
                点击增加 counter到5并且在定时器回调触发前完成 (5s时弹出五次5)<br/>
                所以实际上，每一次渲染都有一个“新版本”的handleAlertClick。每一个版本的handleAlertClick“记住” 了它自己的 count<br/>
                <strong>如果我点击了很多次并且在effect里设置了延时，打印出来的结果会是什么呢？（打印： 0，1，2，3，4，5）</strong><br/>
                在componentDidUpdate中，每次打印输出都是5<br/>
                想在effect的回调函数里读取最新的值而不是捕获的值。最简单的实现方法是使用refs.
            </div>


        </Fragment>
    )
}


const CountActions = () => {
    const [count, setCount] = useState(0);
    const [step, setStep] = useState(1);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + step);
        }, 1000);
        return () => clearInterval(id);
    }, [step])

    return (
        <Fragment>
            <div>来自Actions的更新:{count}</div>
            <Input style={{width: '200px', marginBottom: '20px'}} value={step}
                   onChange={e => setStep(Number(e.target.value))}/>
        </Fragment>
    )
}


function ReducerCounter({step}) {
    //这种模式会使一些优化失效，所以你应该避免滥用它，不过如果你需要你完全可以在reducer里面访问props。
    const [count, dispatch] = useReducer(reducer, 0)

    function reducer(state, action) {
        switch (action.type) {
            case 'tick':
                return state + step
            default:
                return state;
        }
    }

    useEffect(() => {
        const timer = setInterval(() => {
            dispatch({type: 'tick'})
        }, 1000)

        return () => clearInterval(timer)

    }, [dispatch])


    return (
        <div>
            useReducer是Hooks的作弊模式:{count}
        </div>
    )
}

// function getFetchUrl(query) {
//     return 'https://hn.algolia.com/api/v1/search?query=' + query;
// }
function SearchResults() {

    const [data, setData] = useState([])
    const [data1, setData1] = useState([])

    // const getFetchUrl = useCallback((query)=> {
    //     return 'https://hn.algolia.com/api/v1/search?query=' + query;
    // },[])

    useEffect(() => {
        // console.log(1)
        // async function fetchData() {
        //     const result = await axios(getFetchUrl('react'))
        //     // console.log(result,'react')
        //     setData(result.data.hits)
        // }
        // fetchData();
        //
        // console.log(2)
        // async function fetchData_redux() {
        //     const result = await axios(getFetchUrl('redux'))
        //     // console.log(result,'redux')
        //     setData1(result.data.hits)
        // }
        // fetchData_redux()


        fetchDataAxios('react').then(res=>{
            console.log(1)
            setData(res.hits)
        })

        fetchDataAxios('redux').then(res=>{
            console.log(2)
            setData1(res.hits)
        })
    }, [])


    return (
        <Fragment>
            <h4>react</h4>
            {
                data.slice(0, 5).map((v, i) => <a style={{display:'block'}} href={v.url} target='_blank' key={i}>{v.title}</a>)
            }
            <h4>redux</h4>
            {
                data1.slice(0, 5).map((v, i) => <a style={{display:'block'}} href={v.url} target='_blank' key={i}>{v.title}</a>)
            }
            <Parent/>
        </Fragment>
    )


}

function Parent() {
    const [color,setColor] = useState('orange')
    const style = useMemo(()=>(color),[color])
    const [query, setQuery] = useState('');
    // ✅ Preserves identity until query changes
    const fetchData = useCallback((query) => {
        const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
        // ... Fetch data and return it ...
        async function fetchData_redux() {
            const result = await axios(url)
            return result.data
        }
        return fetchData_redux()

    }, [query]);  // ✅ Callback deps are OK

    return <Child fetchData={fetchData} style={style}/>
}

function Child({ fetchData,style }) {
    let [data, setData] = useState([]);

    useEffect(() => {
        console.log(3)
        fetchData('router').then(res=>{
            setData(res.hits)
        })
    }, [fetchData]); // ✅ Effect deps are OK

    return(
        <Fragment>
            <h4>Child:router</h4>
            {
                data.slice(0, 5).map((v, i) => <a
                    style={{color:style,display:'block'}} href={v.url} target='_blank' key={i}>{v.title}</a>)
            }
        </Fragment>
    )
}