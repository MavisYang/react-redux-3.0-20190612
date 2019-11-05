import React, {Component, Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useState} from "react";
import {Button} from 'antd'

// export default class BooksJs extends Component {
//     state = {
//         values: [0, 3, 2, 7, 4, 8, 1]
//     }
//
//     componentDidMount() {
//         this.MumSort()
//     }
//
//
//     MumSort = () => {
//         let newV = this.state.values.sort((a, b) => {
//             return a - b
//         })
//         console.log(newV, 'newV')
//         this.setState({
//             values: newV
//         })
//     }
//
//
//     render() {
//
//         const {values} = this.state
//         console.log(values, 'render')
//         return (
//             <div>
//                 {
//                     console.log(values, '===render')
//                 }
//                 {
//
//                     values.map(v => <span key={v}>{v}</span>)
//                 }
//             </div>
//         )
//     }
// }

export default function BooksJs(props) {

    useEffect(()=>{
        // console.log(useless(getText) === text)
        // console.assert(useless(getText) === text)
        // console.log('1')

        // MumSort()
        return()=>{
            console.log(2)
        }
    },[])

    return(
        <div className='container'>
            <JS_1101/>
            <JS_1104/>
        </div>
    )

}

const JS_1101 = ()=>{
    const text = 'DOMO'
    function useless(callback) {
        return callback()
    }

    function getText() {
        return text
    }

    const [values,setValues] = useState([0,3,2,7,4,8,1])
    const MumSort = ()=>{
        values.sort((a,b)=>b - a)

    }
    useMemo(()=>MumSort(),[values]) //更新render,重新渲染

    useEffect(()=>{
        function multiMax(first,second,...remainingMumbers) {//剩余参数以...作为前缀
            const sorted = remainingMumbers.sort((a,b)=>a-b)
            // console.log(first,second,remainingMumbers,'remainingMumbers')
        }
        multiMax(1,3,21,6)

        const a =(()=>'Tomoe')(); //Tomoe
        const b = (()=>{'Toshi'})();//undefined
        // console.log({a,b})

        function sum() { //大多数情况下可以使用剩余参数来代替arguments参数
            let sum = 0
            for(let i=0;i<arguments.length;i++){
                sum +=arguments[i]
            }
            return sum
        }
        sum(1,2,3)

        function what() {
            console.log(this===window) //this指向what()函数
            this.skulk =  function() {
                return this;//'构造函数'
            }
        }

        let newWhat = new what()
        console.log(newWhat,'newWhat')//{skulk: ƒ}skulk: ƒ ()__proto__: Object


        function getSamurai(samurai) {
            "use strict"
            arguments[0] = 'IShida'
            return samurai
        }

        function getNinja(ninja) {
            arguments[0] = 'Funma'
            return ninja

        }
        console.log(getSamurai('Toyotomi'),'arguments===1')//Toyotomi
        console.log(getNinja('Yoshi'),'arguments===2')//Yoshi

        function WhoAmi1() {
            "use strict";
            return this
        }

        function WhoAmi2() {
            return this
        }

        console.log(WhoAmi1(),WhoAmi1()===window,'WhoAmi===1')//undefined false
        console.log(WhoAmi2(),WhoAmi2()===window,'WhoAmi===2')//undefined false

        let ninja1 ={
            WhoAmi:function () {
                return this
            }
        }

        let ninja2 = {
            WhoAmi:ninja1.WhoAmi
        }

        console.log(ninja1.WhoAmi(),'ninja===1')//{WhoAmi: ƒ}
        console.log(ninja2.WhoAmi(),'ninja===2')//{WhoAmi: ƒ}


    },[])


    return (
        <Fragment>
            <h3>理解函数(2019.11.01)</h3>
            <ul className='container'>
                <li>对象、原型、函数和闭包的紧密结合组成了JavaScript.</li>
                <li>
                    <div>包含在函数内的代码叫做函数代码，而在所有函数意外的代码叫做全局代码。</div>
                    <div>全局代码由JavaScript引擎以一种直接的方式自动执行，每天遇到这样的代码就一行接一行之执行</div>
                </li>
                <li>
                    <div>在js中，函数是第一类对象。函数也是对象，唯一的特殊之处在于他是可以调用的，奇函数会被用以执行某项动作。</div>
                </li>
                <li><h4>函数式编程</h4></li>
                <li>
                    <h4>回调函数（callback）</h4>
                    <div>
                        "回过来调用"， 将函数作为另一个函数的参数，随后通过参数来调用该函数<br/>
                        回到函数的应用：使用比较器排序：{values.map(v=><span key={v}>{v}</span>)}
                    </div>
                </li>
                <li>
                    <h4>断言函数assert</h4>
                    <div>布尔断言打印：console.assert()</div>
                </li>
                <li>
                    <h4>函数定义</h4>
                    <div>
                        1.函数声明和函数表达式<br/>
                        2.函数构造函数<br/>
                        3.箭头函数（es6）<br/>
                        4.生成器函数(es6） <br/>
                    </div>
                </li>
                <li>
                    <h4>函数的实参和行参</h4>
                    <div>
                        1. 行参是我们定义函数时所列举的变量；（函数定义时指定的值）<br/>
                        2. 实参是我们调用函数时所传递给函数的值。（函数调用时所传给函数的值）
                    </div>
                    <h4>剩余参数（剩余参数以...作为前缀）</h4>
                    <h4>默认参数 (给函数的行参赋值：function performAction(state,action = 'skulking') {})</h4>
                </li>

            </ul>
            <h3>理解函数调用(2019.11.01)</h3>
            <ul>
                <li>
                    <h4>隐式函数参数</h4>
                    <div>
                        1. arguments参数是传递给函数的所有参数集合；（大多数情况下可以使用剩余参数来代替arguments参数）<br/>
                        2. this参数代表函数调用相关联的对象，通常成为函数上下文（使用apply和call方法设置函数上下文）。
                        全局代码中的this指向全局window对象；箭头函数中的this指向全局window对象
                    </div>
                </li>
                <li>
                    <h4>函数上下文的问题</h4>
                    <div>
                        1. 使用箭头函数绕过函数上下文；（箭头函数没有单独的this值，箭头函数的this与声明所在的上下文相同）<br/>
                        2. bind方法（bind方法创建的函数与原始函数的函数体相同）
                    </div>
                </li>
            </ul>
        </Fragment>
    )
}



const JS_1104 = ()=>{

    useEffect(()=>{

        function* helloWorldGenerator() {
            yield 'hello'
            yield 'world'
            return 'ending';
        }

        const hw = helloWorldGenerator()
        // const hnwxt = hw.next()
        // if(hnwxt.value==='hello'&&hnwxt.done){
        //     console.log('生成器生成了～')
        // }
        console.log(hw.next(),'helloWorldGenerator---111')//返回对象 {value: "hello", done: false}
        console.log(hw.next(),'222')
        console.log(hw.next(),'333')
        // {value: "hello", done: false} "helloWorldGenerator---111"
        // index.js:240 {value: "world", done: false} "222"
        // index.js:241 {value: "ending", done: true} "333"

        for(let i of helloWorldGenerator()){
            console.log(i)//hello  world
        }

       



    },[])

    return(
        <Fragment>
            <h3>精通函数：闭包和作用域(2019.11.04)</h3>
            <ul className='container'>
                <li>
                    当在外部函数中声明内部函数时，不仅定义了函数的声明，而且还创建了一个闭包。
                </li>
            </ul>
            <h3>生成器(Generator)和Promise(2019.11.04)</h3>
            <ul className='container'>
                <li>
                    Generator 函数是一个普通函数，但是有两个特征：<br/>
                    一是，function关键字与函数名之间有一个星号 *；<br/>
                    二是，函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。<br/>
                </li>
                <li>
                    调用生成器之后，会创建一个迭代器（iterator）.迭代器用于控制生成器的执行,最基本的接口是next方法。 <br/>
                    next方法返回一个对象，它的value属性就是当前yield表达式的值hello，done属性的值false，表示遍历还没有结束。<br/>
                    在迭代器上使用yield*操作符，程序会跳转到另外一个生成器上执行。
                </li>
                <li>
                    <h4>yield表达式就是暂停标志</h4>
                </li>
            </ul>
        </Fragment>
    )

}