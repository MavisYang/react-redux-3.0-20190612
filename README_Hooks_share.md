
## React Hooks share 总结

**2019/10/29**
== share begin ==
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

欲知后事请听下回分解😊～

#### useCallback 和 useMemo
>使用useCallback，函数完全可以参与到数据流中。

>到处使用useCallback是件挺笨拙的事。当我们需要将函数传递下去并且函数会在子组件的effect中被调用的时候，useCallback 是很好的技巧且非常有用。

**解决：需要一一排除，或者将函数放到effect里，或者提到组件外面，或者用useCallback包一层。useMemo 可以做类似的事情以避免重复生成对象。**


也可以添加函数来实现以来关系，应用useCallback.这样可以确保它不会在每个渲染器上都改变，除非它自己的依赖性也改变了

#### useContext
1. 定义
>useContext，可访问全局状态，避免一层层的传递状态,可以帮助我们跨越组件层级直接传递变量，实现共享。

>需要注意的是useContext和redux的作用是不同的，一个解决的是组件之间值传递的问题，一个是应用中统一管理状态的问题，但通过和useReducer的配合使用，可以实现类似Redux的作用。

2. 应用

(1) `export const AgeContext = createContext()` 创建context

(2) `const age = useContext(AgeContext)` 引用context

**案例**
```
const AgeContext = createContext()
function ChildAge(props) {
    console.log('ChildAge',props)
    const age = useContext(AgeContext)
    return(<h3>通过createContext和useContext实现父子组件的传递：{age}</h3>)

}
 <ChildAge age={18}/>
```


（时间不到的话再将将useLayoutEffect）

== share end ==





