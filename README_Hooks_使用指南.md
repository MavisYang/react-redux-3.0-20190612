
## React Hooks 使用指南

### 目录
- [useEffect完整指南](#useEffect完整指南)
- [useMemo与useCallback使用指南](#useMemo与useCallback使用指南)

**2019.10.29**
### useEffect完整指南

- [useEffect完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)
- [useEffect使用指南](https://zhuanlan.zhihu.com/p/65773322)
##### 解答一（摘要）

- 🤔 如何用useEffect模拟componentDidMount生命周期？
- 🤔 如何正确地在useEffect里请求数据？[]又是什么？
- 🤔 我应该把函数当做effect的依赖吗？
- 🤔 为什么有时候会出现无限重复请求的问题？
- 🤔 为什么有时候在effect里拿到的是旧的state或prop？

(结论：useEffect的不作为componentDidUnmount的话，传入第二个参数时一定注意：第二个参数不能为引用类型，引用类型比较不出来数据的变化，会造成死循环)

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

>React会记住你提供的effect函数，并且会在每次更改作用于DOM并让浏览器绘制屏幕后去调用它。


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


```
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

7.同步， 而非生命周期

>React会根据我们当前的props和state同步到DOM。“mount”和“update”之于渲染并没有什么区别。

8.告诉React去比对你的Effects

>你如果想要避免effects不必要的重复调用，你可以提供给useEffect一个依赖数组参数(deps)：

9.关于依赖项不要对React撒谎
10.如果设置了错误的依赖会怎么样呢？
>依赖发生了变更，所以会重新运行effect。
设置了错误的依赖，依赖没有变，所以不会再次运行effect。

传入了错误的依赖，只会递增一次:设置[]为依赖会引入一个bug。React会对比依赖，并且跳过后面的effect：
```
useEffect(() => {
    const timer = setInterval(()=>{
        setCount(count+1)
    },1000)

    return()=>{
        clearInterval(timer)
    }
}, [])
}, [count])
```

11.两种诚实告知依赖的方法
> 第一种策略是在依赖中包含所有effect中用到的组件内的值。让我们在依赖中包含count.

> 第二种策略是修改effect内部的代码以确保它包含的值只会在需要的时候发生变更。

12.让Effects自给自足
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

13.函数式更新 和 Google Docs
>然而，即使是setCount(c => c + 1)也并不完美。如果我们有两个互相依赖的状态，或者我们想基于一个prop来计算下一次的state，它并不能做到。

>幸运的是， setCount(c => c + 1)有一个更强大的姐妹模式，它的名字叫useReducer。

14.解耦来自Actions的更新
>当你想更新一个状态，并且这个状态更新依赖于另一个状态的值时，你可能需要用useReducer去替换它们。

>我们用一个dispatch依赖去替换effect的step依赖：
```
const [state, dispatch] = useReducer(reducer, initialState);
const { count, step } = state;

useEffect(() => {
  const id = setInterval(() => {
    dispatch({ type: 'tick' }); // Instead of setCount(c => c + step);
  }, 1000);
  return () => clearInterval(id);
}, [dispatch]);

```
15.为什么useReducer是Hooks的作弊模式
16.把函数移到Effects里
>如果我们忘记去更新使用这些函数（很可能通过其他函数调用）的effects的依赖，我们的effects就不会同步props和state带来的变更。这当然不是我们想要的。

17.函数是数据流的一部分吗？
>在class组件中，函数属性本身并不是数据流的一部分。

>使用useCallback，函数完全可以参与到数据流中。

>到处使用useCallback是件挺笨拙的事。当我们需要将函数传递下去并且函数会在子组件的effect中被调用的时候，useCallback 是很好的技巧且非常有用。

18.说说竞态

19.提高水准

>在useEffect的思维模型中，默认都是同步的

>目前为止，useEffect主要用于数据请求。但是数据请求准确说并不是一个同步问题。因为我们的依赖经常是[]所以这一点尤其明显。那我们究竟在同步什么？
 
>长远来看， Suspense用于数据请求 会允许第三方库通过第一等的途径告诉React暂停渲染直到某些异步事物（任何东西：代码，数据，图片）已经准备就绪。


**2019.10.30**
### [useMemo与useCallback使用指南](https://zhuanlan.zhihu.com/p/66166173)

1. 基于class的形式创建的组件，性能优化会通过在shouldComponentUpdate中判断前后的props和state，如果没有变化，则返回false来阻止更新。
2. 基于hooks创建的函数组件中，react不在区分mount和update两个状态，这意味着函数组件的每一次调用都会执行其内部的所有逻辑，
那么会带来较大的性能损耗。因此useMemo和useCallback就是解决性能问题的杀手锏。
3. useMemo和useCallback都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数。

4. useMemo的用法与useEffect非常相似，如果第二个参数为空则函数组件每次被渲染，useMemo内的逻辑都会被执行。
如果第二个参数为一个空数组，那么仅会在组件第一次被渲染时执行。其他的情况都是在数组内元素完全相同时才不执行。
5. useEffect是在渲染之后完成的,useMemo是在渲染期间完成的
6. `useMemo( ()=>{fn} ) 等价于 useCallback(fn)`

#### useMemo 
>useMemo返回缓存的变量

用法：
>const fnA = useMemo(fnB, [a])

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

#### useCallback

> useCallback返回缓存的函数

用法:
>const fnA = useCallback(fnB, [a])

应用场景：
>所有依赖本地状态或props来创建函数，需要使用到缓存函数的地方，都是useCallback的应用场景。

例如：
>使用场景是：有一个父组件，其中包含子组件，子组件接收一个函数作为props；通常而言，如果父组件更新了，子组件也会执行更新；
>但是大多数场景下，更新是没有必要的，我们可以借助useCallback来返回函数，然后把这个函数作为props传递给子组件；这样，子组件就能避免不必要的更新。





