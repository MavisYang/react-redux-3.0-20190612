import React, {Fragment, useEffect, useRef, useState} from "react";
import {Button} from "antd";

export default function Share_11_01() {

    //告诉 React 如何对比 Effects
    //虽然 React 在 DOM 渲染时会 diff 内容，只对改变部分进行修改，而不是整体替换，但却做不到对 Effect 的增量修改识别。
    // 因此需要开发者通过 useEffect 的第二个参数告诉 React 用到了哪些外部变量：
    // useEffect(() => {
    //
    //     // const timer = setInterval(()=>{
    //     //     setCount(count+1)
    //     // },1000)
    //     //
    //     // return()=>{
    //     //     clearInterval(timer)
    //     // }
    //
    //
    // }, [count])


    //如果非要把 Function 写在 Effect 外面呢？就用 useCallback 吧！

    return (
        <Fragment>
            <h2>React Hooks(2019.11.01)</h2>
            <h3>1.每一次渲染都有它自己的 Props and State</h3>
            <h3>2.每一次渲染都有它自己的事件处理函数</h3>
            <CountAlert/>
            <h3>3.每次渲染都有它自己的Effects</h3>
            <h3>4.使用refs在effect的回调函数里读取最新的值而不是捕获的值</h3>

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
            console.log(`每次渲染都有它自己的Effects:You clicked ${count} times`);
            // Read the mutable latest value
            console.log(`模拟了class中的行为:you clicked ${latestCount.current} times`)
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