
## React Hooks

### 目录
- [Hooks](#Hooks)
- [HooksTodoList](#HooksTodoList)
- [useEffect完整指南](#https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [useMemo与useCallback使用指南](https://zhuanlan.zhihu.com/p/66166173)

### 参考链接
- [官网](https://reactjs.org/docs/hooks-reference.html)
- [中文网](http://react.html.cn/docs/hooks-faq.html)
- [一文看懂 react hooks](https://juejin.im/post/5d985deae51d4577f9285c2f)
- [React Hooks的几个问题](https://juejin.im/post/5d9c5f935188251e3a06bbbb#heading-2)

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
4. useEffect的第二个参数：那到底要如何实现类似componentWillUnmount的效果那?
   这就需要请出useEffect的第二个参数，它是一个数组，数组中可以写入很多状态对应的变量，意思是当状态值发生变化时，我们才进行解绑。
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

const AgeContext = createContext()

<AgeContext.Provider value={age} >
    <ChildAge/>
</AgeContext.Provider>

function ChildAge() {
    const age = useContext(AgeContext)
    return(<h3>通过createContext和useContext实现父子组件的传递：{age}</h3>)

}

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
**2019.11.01**

### useMemo 
>useMemo 会「记住」一些值，同时在后续 render 时，将依赖数组中的值取出来和上一次记录的值进行比较，如果不相等才会重新执行回调函数，否则直接返回「记住」的值。

- [问题三：该不该使用 useMemo？](https://juejin.im/post/5d9c5f935188251e3a06bbbb#heading-2)

##### 一、应该使用 useMemo 的场景

1. 保持引用相等
    * 对于组件内部用到的 object、array、函数等，如果用在了其他 Hook 的依赖数组中，或者作为 props 传递给了下游组件，应该使用 useMemo。
自定义 Hook 中暴露出来的 object、array、函数等，都应该使用 useMemo 。以确保当值相同时，引用不发生变化。
使用 Context 时，如果 Provider 的 value 中定义的值（第一层）发生了变化，即便用了 Pure Component 或者 React.memo，仍然会导致子组件 re-render。这种情况下，仍然建议使用 useMemo 保持引用的一致性。

2. 成本很高的计算

    * 比如 cloneDeep 一个很大并且层级很深的数据

##### 二、无需使用 useMemo 的场景

1. 如果返回的值是原始值： string, boolean, null, undefined, number, symbol（不包括动态声明的 Symbol），一般不需要使用 useMemo。
2. 仅在组件内部用到的 object、array、函数等（没有作为 props 传递给子组件），且没有用到其他 Hook 的依赖数组中，一般不需要使用 useMemo。


**2019.10.16**
### useReducer代替Redux

1. useContext：可访问全局状态，避免一层层的传递状态。这符合Redux其中的一项规则，就是状态全局化，并能统一管理。
2. useReducer：通过action的传递，更新复杂逻辑的状态，主要是可以实现类似Redux中的Reducer部分，实现业务逻辑的可行性。

### useMemo优化React Hooks程序性能
1. useMemo主要用来解决使用React hooks产生的无用渲染的性能问题。useMemo返回缓存的变量
2. useMemo 优化性能: 只要使用useMemo，然后给她传递第二个参数，参数匹配成功，才会执行。
>使用function的形式来声明组件，失去了shouldCompnentUpdate（在组件更新之前）这个生命周期，也就是说我们没有办法通过组件更新前条件来决定组件是否更新。
>而且在函数组件中，也不再区分mount和update两个状态，这意味着函数组件的每一次调用都会执行内部的所有逻辑，就带来了非常大的性能损耗。
>useMemo和useCallback都是解决上述性能问题的


**另一种说法:**
1. 基于class的形式创建的组件，性能优化会通过在shouldComponentUpdate中判断前后的props和state，如果没有变化，则返回false来阻止更新。
2. 基于hooks创建的函数组件中，react不在区分mount和update两个状态，这意味着函数组件的每一次调用都会执行其内部的所有逻辑，
那么会带来较大的性能损耗。因此useMemo和useCallback就是解决性能问题的杀手锏。
3. useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。

```
 const funcConst = useMemo(()=> handleFunc(name),[name])
```
```
useEffect(()=>{
    // MumSort()
    return()=>{
    }
},[])
const [values,setValues] = useState([0,3,2,7,4,8,1])
const MumSort = ()=>{
    values.sort((a,b)=>{
        return a - b
    })
    // setValues(values)
}
console.log(values,'old values') //[0,3,2,7,4,8,1]
useMemo(()=>MumSort(),[values]) //更新render,重新渲染
console.log(values,'new values')//[0, 1, 2, 3, 4, 7, 8]

//打印values的
//[0, 3, 2, 7, 4, 8, 1] "old values"
//[0, 1, 2, 3, 4, 7, 8] "new values"
//[0, 1, 2, 3, 4, 7, 8] "===render"
//应用useMemo之后重新渲染，不需要写在useEffect()中
//[0, 1, 2, 3, 4, 7, 8] "old values"
//[0, 1, 2, 3, 4, 7, 8] "new values"
// [0, 1, 2, 3, 4, 7, 8] "===render"

return (
    <div>
        {
            console.log(values,'===render')
        }
        {values.map(v=><span key={v}>{v}</span>)}
    </div>
)
```

### useCallback

> useCallback返回缓存的函数

用法:
>const fnA = useCallback(fnB, [a])

应用场景：
>所有依赖本地状态或props来创建函数，需要使用到缓存函数的地方，都是useCallback的应用场景。

- 由于函数也具有 Capture Value 特性，经过 useCallback 包装过的函数可以当作普通变量作为 useEffect 的依赖。
- useCallback 做的事情，就是在其依赖变化时，返回一个新的函数引用，触发 useEffect 的依赖变化，并激活其重新执行。
Function Component 中利用 useCallback 封装的取数函数，可以直接作为依赖传入 useEffect，useEffect 只要关心取数函数是否变化，
- 而取数参数的变化在 useCallback 时关心，再配合 eslint 插件的扫描，能做到 依赖不丢、逻辑内聚，从而容易维护。
 
>useCallback(fn, inputs) is equivalent to useMemo(() => fn, inputs).


### useRef获取DOM元素和保存变量

1. 用useRef获取React JSX中的DOM元素，获取后你就可以控制DOM的任何东西了。但是一般不建议这样来作，React界面的变化可以通过状态来控制。
2. 用useRef来保存变量，这个在工作中也很少能用到，我们有了useContext这样的保存其实意义不大，但是这是学习，也要把这个特性讲一下。

避免重新创建useRef()初始值
```
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
### [useImperativeHandle](https://zh-hans.reactjs.org/docs/hooks-reference.html#useimperativehandle)

不懂

>useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。useImperativeHandle 应当与 forwardRef 一起使用
### useLayoutEffect

[useEffect与useLayoutEffect](https://zhuanlan.zhihu.com/p/53077376)

[useEffect和useLayoutEffect区别](https://www.jianshu.com/p/99df10f46198)

>官方解释，这两个hook基本相同，调用时机不同，请全部使用useEffect，除非遇到bug或者不可解决的问题，再考虑使用useLayoutEffect。
>还举了个例子，譬如你想测量DOM元素时候，使用useLayoutEffect。

>个人感觉举例不恰当，测试DOM我也完全可以在useEffect中测量啊。说如果需要在paint前改变DOM，更合适。
我做过测试，譬如一个div尺寸是200 * 200，我想改成100 * 100，如果写在useEffect中，确实会造成页面抖动，写在useLayoutEffect中可以避免。

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
  const fetchProduct = (() => {
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
### HooksTodoList

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












