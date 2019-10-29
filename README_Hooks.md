
## React Hooks

### 目录
- [Hooks](#Hooks)
- [Hooks todoList demo](#Hooks todoList demo)

**2019.10.15**

### Hooks
随着React 16.8的发布，React Hooks已经发布！

>Hooks增加了无需编写JavaScript类即可访问状态等功能的功能。Hooks承诺将大大简化React组件所需的代码，并且当前在React alpha版本中可用。
>React Hook让无狀态组件拥有了许多只有有狀态组件的能力，如自更新能力（setState，使用useState），访问ref（使用useRef或useImperativeMethods），
>访问context(使用useContext)，使用更高级的setState设置（useReducer），及进行类似生命周期的阶段性方法（useEffect或useLayoutEffect）。


```
useState： setState
useReducer： setState
useRef: ref
useImperativeMethods: ref
useContext: context
useCallback: 可以对setState的优化
useMemo: useCallback的变形
useLayoutEffect: 类似componentDidMount/Update, componentWillUnmount
useEffect: 类似于setState(state, cb)中的cb，总是在整个更新周期的最后才执行
```
- [官网](https://reactjs.org/docs/hooks-reference.html)
- [中文网](http://react.html.cn/docs/hooks-faq.html)

#### useState
>useState是react自带的一个hook函数，它的作用是用来声明状态变量。
>useState这个函数接收的参数是状态的初始值(Initial state)，它返回一个数组，这个数组的第0位是当前的状态值，第1位是可以改变状态值的方法函数。

useState是react自带的一个hook函数，它的作用是用来声明状态变量。
useState这个函数接收的参数是状态的初始值(Initial state)，它返回一个数组，这个数组的第0位是当前的状态值，第1位是可以改变状态值的方法函数。

多状态声明的注意事项:
React是根据useState出现的顺序来确定的
>useState不能在if...else...这样的条件语句中进行调用，必须要按照相同的顺序进行渲染。如果你还是不理解，你可以记住这样一句话就可以了：
>就是React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序。

```js
function Table(props) {
  // ✅ createRows() is only called once
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
function createRows(props) {
  return props
}
```
### useEffect
>用useEffect函数来代替生命周期函数(componentDidMount,componentDidUpdate,componentWillUnmount)
>类似于setState(state, cb)中的cb，总是在整个更新周期的最后才执行


**useEffect两个注意点**

1. React首次渲染和之后的每次渲染都会调用一遍useEffect函数，而之前我们要用两个生命周期函数分别表示首次渲染(componentDidMount)和更新导致的重新渲染(componentDidUpdate)。
2. useEffect中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而componentDidMount和componentDidUpdate中的代码都是同步执行的。
   个人认为这个有好处也有坏处吧，比如我们要根据页面的大小，然后绘制当前弹出窗口的大小，如果时异步的就不好操作了。
3. useEffect 实现 componentWillUnmount生命周期函数
4. useEffect的第二个参数：那到底要如何实现类似componentWillUnmount的效果那?这就需要请出useEffect的第二个参数，它是一个数组，数组中可以写入很多状态对应的变量，意思是当状态值发生变化时，我们才进行解绑。
   但是当传空数组[]时，就是当组件将被销毁时才进行解绑，这也就实现了componentWillUnmount的生命周期函数
5. 开发者通过 useEffect 的第二个参数告诉 React 用到了哪些外部变量
```js
 /**
     * useEffect替代生命周期函数
     * useEffect在react首次渲染和之后的每次渲染都会被调用，相当于首次渲染(componentDidMount)和更新导致的重新渲染(componentDidUpdate)
     * 通过返回一个函数的形式进行解绑，相当于(componentWillUnmount)
        如果第二个参数不传，会渲染三次：（componentDidUpdate--componentWillUnmount--componentDidMount）
        开发者通过 useEffect 的第二个参数告诉 React 用到了哪些外部变量
     */

useEffect(()=>{
   console.log('start useEffect')
   document.addEventListener('click', props.closeRobotList)
   return()=>{
       console.log('end useEffect')
       document.removeEventListener('click', props.closeRobotList)
   }
},[])

function onShow(state) {
    console.log(state)
}
```
```
useLayoutEffect(()=>{
        console.log(prevCountRef,'useLayoutEffect')
        document.title = `You clicked ${state.count} times`;
        return()=>{
            console.log(prevCountRef,'end useLayoutEffect')
            document.title += `!!!`;
        }
 },[state.count])
 console.log('更新Example',state.count)
    //更新Example 2
    // ReducerCount.js:37 {current: input} "end useEffect"
    // ReducerCount.js:34 {current: input} "useEffect"
```



#### createContext和useContext 让组件之间传值更简单
详见`/components/TestDemo/HooksTodo`
>useContext，它可以帮助我们跨越组件层级直接传递变量，实现共享。
>需要注意的是useContext和redux的作用是不同的，一个解决的是组件之间值传递的问题，一个是应用中统一管理状态的问题，但通过和useReducer的配合使用，可以实现类似Redux的作用。


可以直接在js中创建，也可以在公共js中创建
```
//======3======
import {AgeContext,ParamsContext} from './UseContexts'
或者
const AgeContext = createContext()
function ChildAge() {
    const age = useContext(AgeContext)
    return(<h3>通过createContext和useContext实现父子组件的传递：{age}</h3>)

}


<AgeContext.Provider value={age} >
    <ChildAge/>
</AgeContext.Provider>
```
```
{color: "blue", dispatch:f} // "useContext(ColorContext)"

```

### useReducer介绍和简单使用
>reducer其实就是一个函数，这个函数接收两个参数，一个是状态，一个用来控制业务逻辑的判断参数。

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```
第一个参数：reducer纯函数
第二个参数：state的默认值
```js
const initialState = {count: 0};
```
第三个参数：state的重置
```js
function init(initialCount) {
    return {count: initialCount};
}
```

**可以写在一个js中，在reducer中做数据处理**
```js
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <div>
      Count: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>

        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    <div/>
  );
}

```


```
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
<div>
    <Button onClick={()=>setCount({type:'add'})}>+</Button>
    <span style={{margin:'0 20px'}}> 数字：{count}</span>
    <Button onClick={()=>setCount({type: 'sub'})}>-</Button>
</div>
```
**2019.10.16**
### useReducer代替Redux

1. useContext：可访问全局状态，避免一层层的传递状态。这符合Redux其中的一项规则，就是状态全局化，并能统一管理。
2. useReducer：通过action的传递，更新复杂逻辑的状态，主要是可以实现类似Redux中的Reducer部分，实现业务逻辑的可行性。

### useMemo优化React Hooks程序性能
1. useMemo主要用来解决使用React hooks产生的无用渲染的性能问题。

>使用function的形式来声明组件，失去了shouldCompnentUpdate（在组件更新之前）这个生命周期，也就是说我们没有办法通过组件更新前条件来决定组件是否更新。
>而且在函数组件中，也不再区分mount和update两个状态，这意味着函数组件的每一次调用都会执行内部的所有逻辑，就带来了非常大的性能损耗。
>useMemo和useCallback都是解决上述性能问题的

**useMemo 优化性能: 只要使用useMemo，然后给她传递第二个参数，参数匹配成功，才会执行。**

```js
 const funcConst = useMemo(()=> handleFunc(name),[name])
```

### useCallback
>由于函数也具有 Capture Value 特性，经过 useCallback 包装过的函数可以当作普通变量作为 useEffect 的依赖。
>useCallback 做的事情，就是在其依赖变化时，返回一个新的函数引用，触发 useEffect 的依赖变化，并激活其重新执行。
Function Component 中利用 useCallback 封装的取数函数，可以直接作为依赖传入 useEffect，useEffect 只要关心取数函数是否变化，
>而取数参数的变化在 useCallback 时关心，再配合 eslint 插件的扫描，能做到 依赖不丢、逻辑内聚，从而容易维护。
 
>useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs).


### useRef获取DOM元素和保存变量

1. 用useRef获取React JSX中的DOM元素，获取后你就可以控制DOM的任何东西了。但是一般不建议这样来作，React界面的变化可以通过状态来控制。
2. 用useRef来保存变量，这个在工作中也很少能用到，我们有了useContext这样的保存其实意义不大，但是这是学习，也要把这个特性讲一下。

避免重新创建useRef()初始值
```js
function Image(props) {
  const ref = useRef(null);
    // ✅ IntersectionObserver is created lazily once
    function getObserver() {
      if (ref.current === null) {
        ref.current = new IntersectionObserver(onIntersect);
      }
      return ref.current;
    }
    // When you need it, call getObserver()
    // ...
}
```
**2019.10.18**
### useImperativeHandle 这个不懂

### useLayoutEffect

[useEffect与useLayoutEffect](https://zhuanlan.zhihu.com/p/53077376)

[useEffect和useLayoutEffect区别](https://www.jianshu.com/p/99df10f46198)
>官方解释，这两个hook基本相同，调用时机不同，请全部使用useEffect，除非遇到bug或者不可解决的问题，再考虑使用useLayoutEffect。
>还举了个例子，譬如你想测量DOM元素时候，使用useLayoutEffect。
>个人感觉举例不恰当，测试DOM我也完全可以在useEffect中测量啊。说如果需要在paint前改变DOM，更合适。
我做过测试，譬如一个div尺寸是200 * 200，我想改成100 * 100，如果写在useEffect中，确实会造成页面抖动，写在useLayoutEffect中可以避免。

```js
const a = useRef()
    useEffect(()=>{
        console.log(a,'useEffect')
        document.title = `You clicked ${state.count} times`;
        return()=>{
            console.log(a,'end useEffect')
            document.title = `remove`;
        }
    })

    //=====8：useLayoutEffect====
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

### useDebugValue
### usePrevious


### hooks请求处理

[How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data)
获取数据
```js
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // By moving this function inside the effect, we can clearly see the values it uses.
    async function fetchProduct() {
      const response = await fetch('http://myapi/product' + productId);
      const json = await response.json();
      setProduct(json);
    }

    fetchProduct();
  }, [productId]); // ✅ Valid because our effect only uses productId
  // ...
}
```
数据请求：请求结束之后才能继续下一次请求
```js
useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      if (!ignore) setProduct(json);
    }
    
    fetchProduct();
    return () => { ignore = true };
}, [productId]);
```
也可以添加函数来实现以来关系，应用useCallback.这样可以确保它不会在每个渲染器上都改变，除非它自己的依赖性也改变了

```js
function ProductPage({ productId }) {
  // ✅ Wrap with useCallback to avoid change on every render
  const fetchProduct = useCallback(() => {
    // ... Does something with productId ...
  }, [productId]); // ✅ All useCallback dependencies are specified

  return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct }) {
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ All useEffect dependencies are specified
  // ...
}
```


-  在 context 中传递 dispatch ，而不是在 props(属性) 中单独回调

**2019/10/18**
### Hooks todoList demo

[react hooks踩坑记录](https://juejin.im/entry/5c9aeea9e51d4529b028a39b)

#### 问题一
在添加todolist时，如下代码，添加的数据不能即使渲染
```js
 function addList(){
    let item = {
        id: Math.random().toString().slice(2),
        value: inputValue
    }
    todoLists.push(item)
    setTodo(newTodoList)
}
```
解决：
需要将todolist浅拷贝一下，代码如下
```js
 function addList(){
    if(inputValue!==''){
        const newTodoList = [...todoList]
        let item = {
            id: Math.random().toString().slice(2),
            value: inputValue
        }
        newTodoList.push(item)
        setTodo(newTodoList)
        setIptValue('')
    }
}
```

**2019/10/29**
### 分享hooks

[API](http://react.html.cn/docs/hooks-reference.html)：
Basic Hooks:(基础的)
- useState
- useEffect
- useContext

Additional Hooks:(额外的)
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeMethods
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

#### useEffect
1.定义
>useEffect类似于setState(state, cb)中的cb，总是在整个更新周期的最后才执行,(特别要注意这句话：DOM在渲染完了之后调用effect)
>useEffect函数用来代替生命周期函数(componentDidMount,componentDidUpdate,componentWillUnmount)

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
第一个参数
(1) useEffect在react首次渲染和之后的每次渲染都会被调用，相当于首次渲染(componentDidMount)和更新导致的重新渲染(componentDidUpdate)
(2) 通过返回一个函数的形式进行解绑，相当于(componentWillUnmount)
第二个参数
(3) 第二个参数是需要开发者告诉react用到了哪些外部变量，如果第二个参数不传，会渲染三次：（componentDidUpdate--componentWillUnmount--componentDidMount），
所以，在不需要确定具体的变量时，可以传个[]（空数组），但[]也不是万能的，如出现无限循环时，需要一一排除，或者将函数放到effect里，或者提到组件外面，或者用useCallback包一层。useMemo 可以做类似的事情以避免重复生成对象。
⚠️ []表示effect没有使用任何React数据流里的值，因此该effect仅被调用一次是安全的。[]同样也是一类常见问题的来源，也即你以为没使用数据流里的值但其实使用了。
需要通过一些策略（主要是useReducer 和 useCallback）来移除这些effect依赖，而不是错误地忽略它们。

4.[useEffect完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)

##### 解答一（摘要）

- 🤔 如何用useEffect模拟componentDidMount生命周期？
- 🤔 如何正确地在useEffect里请求数据？[]又是什么？
- 🤔 我应该把函数当做effect的依赖吗？
- 🤔 为什么有时候会出现无限重复请求的问题？
- 🤔 为什么有时候在effect里拿到的是旧的state或prop？

> useEffect会捕获 props和state。所以即便在回调函数里，你拿到的还是初始的props和state。

**问题：怎么理解拿到的是初始的props和state，因为打印出来的count是在变化的**

>useEffect有时候会出现无限重复请求的问题,这个通常发生于你在effect里做数据请求并且没有设置effect依赖参数的情况。

**解决：需要一一排除，或者将函数放到effect里，或者提到组件外面，或者用useCallback包一层。useMemo 可以做类似的事情以避免重复生成对象。**

##### 解答二（正文）

1.每一次渲染都有它自己的 Props and State
>组件在第一次渲染的时候，从useState()拿到count的初始值0。当我们调用setCount(1)，React会再次渲染组件，这一次count是1。如此等等.
>当我们更新状态的时候，React会重新渲染组件。每一次渲染都能拿到独立的count 状态，这个状态值是函数中的一个常量。
>它仅仅只是在渲染输出中插入了count这个数字。这个数字由React提供。当setCount的时候，React会带着一个不同的count值再次调用组件。然后，React会更新DOM以保持和渲染输出一致。
>这里关键的点在于任意一次渲染中的count常量都不会随着时间改变。渲染输出会变是因为我们的组件被一次次调用，而每一次调用引起的渲染中，它包含的count值独立于其他渲染。

2.每一次渲染都有它自己的事件处理函数
>在任意一次渲染中，props和state是始终保持不变的。如果props和state在不同的渲染中是相互独立的，那么使用到它们的任何值也是独立的（包括事件处理函数）。
>它们都“属于”一次特定的渲染。即便是事件处理中的异步函数调用“看到”的也是这次渲染中的count值。

3.每次渲染都有它自己的Effects
抛一个问题给你：effect是如何读取到最新的count 状态值的呢？
>并不是count的值在“不变”的effect中发生了改变，而是effect 函数本身在每一次渲染中都不相同
React会记住你提供的effect函数，并且会在每次更改作用于DOM并让浏览器绘制屏幕后去调用它。


(1)为了确保我们已经有了扎实的理解，我们再回顾一下第一次的渲染过程：

- React: 给我状态为 `0` 时候的UI。
- 你的组件:
    - 给你需要渲染的内容: `<p>You clicked 0 times</p>`。
    - 记得在渲染完了之后调用这个effect: `() => { document.title = 'You clicked 0 times' }`。
-React: 没问题。开始更新UI，喂浏览器，我要给DOM添加一些东西。
- 浏览器: 酷，我已经把它绘制到屏幕上了。
- React: 好的， 我现在开始运行给我的effect
    - 运行 `() => { document.title = 'You clicked 0 times' }`。
    
(2)现在我们回顾一下我们点击之后发生了什么：

- 你的组件: 喂 React, 把我的状态设置为`1`。
- React: 给我状态为 `1`时候的UI。
- 你的组件:
    - 给你需要渲染的内容: `<p>You clicked 1 times</p>`。
    - 记得在渲染完了之后调用这个effect： `() => { document.title = 'You clicked 1 times' }`。
- React: 没问题。开始更新UI，喂浏览器，我修改了DOM。
- Browser: 酷，我已经将更改绘制到屏幕上了。
- React: 好的， 我现在开始运行属于这次渲染的effect
    - 运行 `() => { document.title = 'You clicked 1 times' }`。


4.每一次渲染都有它自己的…所有

5.使用refs在effect的回调函数里读取最新的值而不是捕获的值

**每一个组件内的函数（包括事件处理函数，effects，定时器或者API调用等等）会捕获某次渲染中定义的props和state。**

>在组件内什么时候去读取props或者state是无关紧要的。因为它们不会改变。在单次渲染的范围内，props和state始终保持不变。

>当然，有时候你可能想在effect的回调函数里读取最新的值而不是捕获的值。最简单的实现方法是使用refs，


```js
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
```

6.Effect中的清理

>React只会在浏览器绘制后运行effects。这使得你的应用更流畅因为大多数effects并不会阻塞屏幕的更新。Effect的清除同样被延迟了。上一次的effect会在重新渲染后被清除：

>effect的清除并不会读取“最新”的props。它只能读取到定义它的那次渲染中的props值：









