
## 搭建的react+redux+router项目
>最新版本，最新搭建方式

### 目录
- [Redux应用](#Redux应用)
- [Redux-thunk中间件](#Redux-thunk中间件)
- [react-redux](#react-redux)
- [React-router](#React-router)
- [Hooks](#Hooks)
- [Hooks todoList demo](#Hooks todoList demo)

### 项目记录
1. 左侧和右侧都有导航条
2. 熟练应用redux

**2019.10.11**

### Redux应用

详见`/components/TestDemo/TodoList`

**Redux三要素：（个人理解）**

- Action:   存储函数方法 
- Store:    存储数据的仓库
- Reducer:  数据处理仓库,必须是纯函数

技巧：
1. 把Action Types 单度写入一个文件 `/actions/actionTypes.js`
```$xslt
actions.js 引入 import * as types from './actionTypes.js'

reducer.js  引入import {TODO_INIT, TODO_ADD} from '../actions/actionTypes.js'
```
2. 编写actionCreators.js文件 `/actions/indexUI.js`


**通过store.getState()获取存储store数据**

**通过dispatch添加store数据**
```
store.dispatch({
    type:'USERINFO_INIT',
    data:UserInfoData.resultContent
})

```
但深层的组件中一般不直接使用这两个方法。

**只有store能改变自己的内容，Reducer不能改变**

>Reudcer只是返回了更改的数据，但是并没有更改store中的数据，store拿到了Reducer的数据，自己对自己进行了更新。

**Reducer必须是纯函数**

> 它的返回结果，是完全由传入的参数state和action决定的，这就是一个纯函数

### 拆分UI组件

>分工合作，一人写样式，一人写逻辑。

### 无状态组件

>直接收传入的props值，不做逻辑处理

### 利用easy-mock创建模拟数据

>地址：https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList

### Redux-thunk中间件

>在实际工作中你可以使用中间件来进行日志记录、创建崩溃报告，调用异步接口或者路由。

>Redux-thunk是对Redux中dispatch的加强。


**配置Redux-thunk组件**

1.引入applyMiddleware,如果你要使用中间件，就必须在redux中引入applyMiddleware.
2.引入redux-thunk库
3.直接把thunk放到createStore里的第二个参数就可以了
4.详见`/store/index`

**2019.10.12**
### [redux-saga中间件](https://jspang.com/posts/2019/06/20/redux.html#p18-%E8%BF%9B%E9%98%B6-redux-saga%E7%9A%84%E5%AE%89%E8%A3%85%E5%92%8C%E9%85%8D%E7%BD%AE)

1.`npm install --save redux-saga`
2. 创建sagas.js文件并引入，`sagaMiddleware.run(mySagas)`
>function* mySaga() {} 
 export default mySaga;

3. 比Redux-thunk复杂一点,更适合于大的项目
4. sage中需要用到generator函数

ES6的新特性：
```
function* mySaga() { //Generator Function(生成器函数)。
    //等待捕获action
    yield takeEvery(GET_MY_LIST, getList) //关键字yield——迭代器生成器
}
```

### 报错：Invariant failed: You should not use <Link> outside a <Router>

排查之后的react-scripts版本有关
"react-scripts": "^3.0.1",升不了级
最新："react-scripts": "3.2.0",
重新构建一个就好了 （死办法）
```$xslt
 "antd": "^3.23.6",
    "axios": "^0.19.0",
    "connected-react-router": "^6.5.2",
    "history": "^4.10.1",
    "prop-types": "^15.7.2",
    "react": "^16.10.2",
    "react-dom": "^16.8.6",
    "react-redux": "^7.1.1",
    "react-router": "^5.1.2",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.0.1",
    "redux": "^4.0.4",
    "redux-thunk": "^2.3.0"
```

npm install history react-router-dom react-router react-redux react-dom redux react connected-react-router prop-types -S

**2019.10.12**
### 报错：不能根目录引入scss
```$xslt
./src/Layout/index.scss (./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--6-oneOf-5-3!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./src/Layout/index.scss)
@import "style/public.scss";
^
      File to import not found or unreadable: style/public.scss.
      in /Users/mavis/gitHub/react_2019/redux-link/src/Layout/index.scss (line 2, column 1)

```
**解决**
1.添加jsconfig.json
```$xslt
{
    "compilerOptions": {
      "baseUrl": "src"
    },
    "include": ["src"]
  }
```
2.在安装插件时，最好将服务器关闭

### react-redux
react-redux中用到两个只是：provider和connect

1.Provider提供器
>Provider是一个提供器，只要使用这个组件，组件里的其他所有组件都可以使用`store`了，这也是React-redux的核心组件了。

```
import {Provider} from "react-redux";
ReactDOM.render(
    <Provider store={store}>
      <TodoList/>
    </Provider>, document.getElementById('root'));

```
2.connect连接器
>connects是一个连接器，链接`state`和`dispatch`,这个可以简单的获取到`store`中的数据了。
>connect的作用是把UI组件（无状态组件）和业务逻辑代码的分开，然后通过connect再链接到一起，让代码更加清晰和易于维护。这也是React-Redux最大的有点。

```
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';//引入连接器
import * as TodoActions from '../actions'

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    todosReducer: state.todosReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestScope)


```

- [react-redux中的provider和connect](https://jspang.com/posts/2019/06/20/redux.html#p21-进阶-react-redux中的provider和connect)

### React-router

1. exact 精确匹配
2. 动态传值
>这个设置是以:开始的，然后紧跟着你传递的key（键名称）名称
`<Route exact path='/v2/tdscope/build/id:?/type:?' render={props=><TodoList {...props} actions={actions}/>}/>`

3. Link上传递值
`<Link to="/list/123">列表</Link>`

4. 在组件上接收并显示传递值
`this.props.match` 包括三个部分:
- patch:自己定义的路由规则，可以清楚的看到是可以产地id参数的。
- url: 真实的访问路径，这上面可以清楚的看到传递过来的参数是什么。
- params：传递过来的参数，key和value值。

5. ReactRouter重定向`Redirect`使用
大致两种知识点：重定向，即跳转页面,直接跳转。
- 标签式重定向:就是利用<Redirect>标签来进行重定向，业务逻辑不复杂时建议使用这种。
`<Redirect to={'/app'}/>`
- 编程式重定向:这种是利用编程的方式，一般用于业务逻辑当中，比如登录成功挑战到会员中心页面。直接在构造函数constructor中加入下面的重定向代码。
` this.props.history.push("/home/")`
⚠️：重定向和跳转有一个重要的区别，就是跳转式可以用浏览器的回退按钮返回上一级的，而重定向是不可以的。

6. 嵌套路由

**2019.10.14**

[实参和形参区别- 简书](https://www.jianshu.com/p/51b8fc5dd158)

- 形式参数：定义函数时函数名后括号中的变量名！
- 实际参数：调用函数时函数名后括号中的表达式！

>平时用的变量名传递都是形参

实参
```
try {
    getRobot(callback)
} catch (error) {
    console.log(err)
}
function getRobot(callback){
    var url = `${API_PATH}/lizcloud/api/liz-activitymain-api/noauth/activitymain/activity/assist/detail?tenantId=${params.tenantId}&userId=${params.userId}&activityId=${params.activityId}`
    PromiseXHR(url,null,null,'get').then(res=>{
        callback(res)
    })
}

function callback(res) {
    var resData = JSON.parse(res)
    console.log('----)
}

```

### Skeleton骨架屏(antd)
[skeleton骨架屏](https://ant.design/components/skeleton-cn/)

###  ReactDOM.createPortal
>Portals 提供了一种很好的方法，将子节点渲染到父组件 DOM 层次结构之外的 DOM 节点。
>第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 片段(fragment)。第二个参数（container）则是一个 DOM 元素。

```js
 ReactDOM.createPortal(child, container)
```

[Portals](https://zh-hans.reactjs.org/docs/portals.html)
### 自定义事件的触发dispatchEvent

```js
//创建一个全局监听事件
export const sendEvent = (key, vals) => {
    var event = new Event(key);
    event.vals = vals;
    window.dispatchEvent(event);
}
```
- [自定义事件的触发dispatchEvent](https://www.jianshu.com/p/5f9027722204)

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

#### useEffect两个注意点
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
创建
const AgeContext = createContext() 

使用
<AgeContext.Provider value={age} >
    <ChildAge/>
</AgeContext.Provider>

获取:引入后写一个CounterChildAge组件，只是显示上下文中的age变量代码如下：
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
**2019.10.16**
### useReducer和useContext代替Redux功能

1. useContext：可访问全局状态，避免一层层的传递状态。这符合Redux其中的一项规则，就是状态全局化，并能统一管理。
2. useReducer：通过action的传递，更新复杂逻辑的状态，主要是可以实现类似Redux中的Reducer部分，实现业务逻辑的可行性。

查看项目：`/HooksDemo/HooksTodo/ReducerContext/indexUI.js`

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


