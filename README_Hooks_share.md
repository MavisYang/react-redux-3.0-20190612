## React Hooks share 总结

**2019/10/29**
### 分享hooks

[API](http://react.html.cn/docs/hooks-reference.html)：

**Basic Hooks:(基础的)**
- useState
- useEffect
- useContext

**Additional Hooks:(额外的)**
- useReducer
- useCallback
- useMemo
- useRef
- useLayoutEffect

#### Hooks好处
* React Hooks增加了无需编写JavaScript类即可访问状态等功能的功能,也就是让无狀态组件拥有了许多只有有狀态组件的能力，
    * 如自更新能力（setState，使用useState），
    * 访问ref（使用useRef或useImperativeMethods），
    * 访问context(使用useContext)，
    * 使用更高级的setState设置（useReducer），
    * 及进行类似生命周期的阶段性方法（useEffect或useLayoutEffect）
   
#### useState
1.定义
>useState代替this.state和this.setState,是react 自带的一个hook 函数，它的作用是用来生命状态变量。

2.应用

```js
const [state,setState] = useState('');
```
3.参数
>useState接收的参数是状态的初始值，它返回一个数组，这个数组的第0位是当前的状态值，第1位是可以改变状态值的方法函数。

**注意：state定义的初始值类型和setState的类型要一致！**

```js
const [initType,setType] = useState([1])
function changTypes() {
    // console.log(initType,'initType---1')//初始值是个字符串：init
    // setType({name:1}) //set一个对象，是不成功的，必须要匹配定义的类型
    // console.log(initType,'initType---2') //返回：init
    console.log(initType,'initType---1')//初始值是个字符串：[1]
    setType('2')
    console.log(initType,'initType---2') //返回：[1]

}
```
#### useEffect
1.定义
>useEffect类似于setState(state, cb)中的cb，总是在整个更新周期的最后才执行,(特别要注意这句话：DOM在渲染完了之后调用effect)
>可以将useEffect函数看做componentDidMount,componentDidUpdate,componentWillUnmount这三个生命周期函数的组合

2.应用
`useEffect(fn, [])`
```
useEffect(()=>{
    console.log('useEffect=componentDidMount/componentDidUpdate')
    document.addEventListener('click',props.handleHideStatus)
    return()=>{
        console.log('useEffect=componentWillUnmount')
        document.removeEventListener('click',props.handleHideStatus)
    }
},[])

useEffect(()=>{
    const timer = setInterval(()=>{
        setCount(count+1)
    },1000)

    return()=>{
        clearInterval(timer)
    }
},[count])
```

3.参数
第一个参数:

- (1) useEffect在react首次渲染和之后的每次渲染都会被调用，相当于首次渲染(componentDidMount)和更新导致的重新渲染(componentDidUpdate)
- (2) 通过返回一个函数的形式进行解绑，相当于(componentWillUnmount)

第二个参数:

- (3) 第二个参数是需要开发者告诉react用到了哪些外部变量，如果第二个参数不传，会渲染三次：（componentDidUpdate--componentWillUnmount--componentDidMount），
所以，在不需要确定具体的变量时，可以传个[]（空数组），但[]也不是万能的，如果依赖传错，会引起bug.

⚠️ 
    - []表示effect没有使用任何React数据流里的值，因此该effect仅被调用一次是安全的。[]同样也是一类常见问题的来源，也即你以为没使用数据流里的值但其实使用了。
    - 如出现无限循环时，需要一一排除，或者将函数放到effect里，或者提到组件外面，或者用useCallback包一层。useMemo 可以做类似的事情以避免重复生成对象。来移除effect依赖，而不是错误地忽略它们。

🍐 每秒递增的计数器

```
useEffect(() => {
    const timer = setInterval(()=>{
        setCount(count+1)
    },1000)

    return()=>{
        clearInterval(timer)
    }
}, [])
```
这个例子中，最后渲染的是什么？

>在Class组件中，我们的直觉是：“开启一次定时器，清除也是一次”，当用useEffect的方式时，直觉上会设置依赖为[]，“我只想运行一次effect”。

>然而，这个例子只会递增一次。（设置[]为依赖会引入一个bug。React会对比依赖，并且跳过后面的effect）

**正确的做法是**
(1) 使用正确的依赖
```
useEffect(() => {
    const timer = setInterval(()=>{
        setCount(count+1) //count是一个必需的依赖。
    },1000)

    return()=>{
        clearInterval(timer)
    }
}, [count])
```
**(2) 让Effects自给自足**
```
useEffect(() => {
    const timer = setInterval(() => {
        setCount(c => c + 1)//需要告知React的仅仅是去递增状态 - 不管它现在具体是什么值。这正是setCount(c => c + 1)做的事情。
    }, 1000)

    return () => {
        clearInterval(timer)
    }
}, [])
```

>然而，即使是setCount(c => c + 1)也并不完美。如果我们有两个互相依赖的状态，或者我们想基于一个prop来计算下一次的state，它并不能做到。

>幸运的是， setCount(c => c + 1)有一个更强大的姐妹模式，它的名字叫useReducer。

- [useEffect使用指南](https://zhuanlan.zhihu.com/p/65773322)

欲知后事请听下回分解😊～

#### useContext
1. 定义
>useContext，可访问全局状态，避免一层层的传递状态,可以帮助我们跨越组件层级直接传递变量，实现共享。

>需要注意的是useContext和redux的作用是不同的，一个解决的是组件之间值传递的问题，一个是应用中统一管理状态的问题，但通过和useReducer的配合使用，可以实现类似Redux的作用。

2. 应用

(1) `export const AgeContext = createContext()` 创建context

(2) `<AgeContext.Provider value={age} >
         <ChildAge/>
     </AgeContext.Provider>`  传递context

(3) `const age = useContext(AgeContext)` 引用context


**案例**
```
const AgeContext = createContext()
<AgeContext.Provider value={age} >
    <ChildAge/>
</AgeContext.Provider>

function ChildAge() {
    const age = useContext(AgeContext)
    return(<h3>通过createContext和useContext实现父子组件的传递：{age}</h3>)
}
```

额外将一点：

#### useLayoutEffect
#### useEffect与useLayoutEffect

>官方解释，useLayoutEffect与useEffect这两个hook基本相同，调用时机不同，请全部使用useEffect，除非遇到bug或者不可解决的问题，再考虑使用useLayoutEffect。

useLayoutEffect要在useEffect之前调用。
```
const a = useRef()
useEffect(()=>{
    console.log(a,'useEffect')
    document.title = `You clicked ${state.count} times`;
    return()=>{
        console.log(a,'end useEffect')
        document.title = `remove`;
    }
})

useLayoutEffect(()=>{
    console.log(a,'useLayoutEffect')
    document.title = `You clicked ${state.count} times`;
    return()=>{
        console.log(a,'end useLayoutEffect')
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

```

### 分享后的总结
今天做了hooks的分享，再次感觉到了自己的缺点，不会说，尤其是话术语。
提到问题没法回答或者提到的问题：
1. useState()中state定义的初始值类型和setState的类型要一致！
2. Effects中依赖多的话怎么办？
3. useEffect会出现无限循环
4. 每次渲染useEffect都会被调用
5. deps依赖过多怎么办？如果依赖数组依赖了过多东西，可能导致代码难以维护

=== end one=====

**2019.10.30**

#### useCallback 和 useMemo

### [useMemo与useCallback使用指南](https://zhuanlan.zhihu.com/p/66166173)

1. 基于class的形式创建的组件，性能优化会通过在shouldComponentUpdate中判断前后的props和state，如果没有变化，则返回false来阻止更新。
2. 基于hooks创建的函数组件中，react不在区分mount和update两个状态，这意味着函数组件的每一次调用都会执行其内部的所有逻辑，
那么会带来较大的性能损耗。因此useMemo和useCallback就是解决性能问题的杀手锏。
3. useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。

#### useMemo 
>useMemo返回缓存的变量

>useMemo 会「记住」一些值，同时在后续 render 时，将依赖数组中的值取出来和上一次记录的值进行比较，如果不相等才会重新执行回调函数，否则直接返回「记住」的值。

用法：
>const fnA = useMemo(fnB, [a])

`useMemo( ()=>{fn} ) 等价于 useCallback(fn)`
```
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
    
    const expensive = useMemo(()=>{
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) { //需要的依赖count
            sum += i;
        }
        return sum;
    },[count])

    return <div>
        <h4>{count}-{val}-{expensive}</h4>
        <div>
            <Button onClick={() => setCount(count + 1)}>+c1</Button>
            <Input style={{width:'200px'}} value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}

```

- 在没有使用useMemo时，无论是修改count还是val，由于组件的重新渲染，都会触发expensive的执行,造成性能问题；
- 我们只要在count的值修改时，执行expensive计算。所以要用到useMemo，指定依赖值；
- 使用useMemo来执行昂贵的计算，然后将计算值返回，并且将count作为依赖值传递进去。这样，就只会在count改变的时候触发expensive执行，在修改val的时候，返回上一次缓存的值。


- [问题三：该不该使用 useMemo？](https://juejin.im/post/5d9c5f935188251e3a06bbbb#heading-2)
#### useCallback

> useCallback返回缓存的函数

用法:
>const fnA = useCallback(fnB, [a])

应用场景：
>所有依赖本地状态或props来创建函数，需要使用到缓存函数的地方，都是useCallback的应用场景。

例如：
>使用场景是：有一个父组件，其中包含子组件，子组件接收一个函数作为props；通常而言，如果父组件更新了，子组件也会执行更新；
>但是大多数场景下，更新是没有必要的，我们可以借助useCallback来返回函数，然后把这个函数作为props传递给子组件；这样，子组件就能避免不必要的更新。


=====end two=====

### useRef

>useRef获取DOM元素和保存变量

1. 用useRef获取React JSX中的DOM元素，获取后你就可以控制DOM的任何东西了。但是一般不建议这样来作，React界面的变化可以通过状态来控制。
2. 用useRef来保存变量，这个在工作中也很少能用到，我们有了useContext这样的保存其实意义不大，但是这是学习，也要把这个特性讲一下。

避免重新创建useRef()初始值

用法一：获得焦点
```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <div>
      <Input ref={iptEl} onChange={(e)=>setValue(e.target.value)} style={{width:'200px'}}/>
      <Button onClick={onFocus}>Focus the input</Button>
    <div/>
  );
}

```
用法二：赋值
```
const CountAlert = () => {
    const [count, setCount] = useState(0)
    const latestCount = useRef(count)
    useEffect(() => {
        // Set the mutable latest value
        latestCount.current = count
        setTimeout(() => {
            // Read the mutable latest value
            console.log(`模拟了class中的行为:you clicked ${latestCount.current} times`)
        }, 300)
    })
}
```
用法三：判断
``` 
function Image(props) {
  const ref = useRef(null);
    // ✅ IntersectionObserver is created lazily once
    function getObserver() {
      if (ref.current === null) {
        ref.current = 'new current';
      }
      return ref.current;
    }
   
}
```
### useReducer
>reducer其实就是一个函数，这个函数接收两个参数，一个是状态，一个用来控制业务逻辑的判断参数。

查看 :
1.HOOks to do List `/HooksDemo/index.js`
2. `/HooksDemo/HooksTodo/ReducerCount.js`

useReducer有三个参数(一般用到前两个)
- 第一个参数：reducer纯函数
- 第二个参数：state的默认值
- 第三个参数：state的重置


```
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
    useEffect(()=>{
        document.title = `You clicked ${state.count} times`;
        return()=>{
            document.title = `remove`;
        }
    },[state.count])

    return (
        <Fragment>
            <h3 style={{color:'red'}}>一个js页面应用Reducer</h3>
            <Button onClick={() => dispatch({type: 'add'})}>+</Button>
            <span style={{margin: '0 20px'}}> Reducer 数字：{state.count}</span>
            <Button onClick={() => dispatch({type: 'sub'})}>-</Button>
            <Button onClick={() => dispatch({type: 'reset', payload: initialCount})}>重置</Button>
        </Fragment>
    )
}

export default ReducerCount;

```


### useReducer和useContext实现Redux功能

1. useContext：可访问全局状态，避免一层层的传递状态。这符合Redux其中的一项规则，就是状态全局化，并能统一管理。
2. useReducer：通过action的传递，更新复杂逻辑的状态，主要是可以实现类似Redux中的Reducer部分，实现业务逻辑的可行性。

```
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
```