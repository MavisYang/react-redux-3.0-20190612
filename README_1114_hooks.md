![虎鲸](https://user-gold-cdn.xitu.io/2019/11/14/16e67c902f3d1309?w=4032&h=3024&f=jpeg&s=1433799)

## UseEffect
----
[useEffect完整指南](https://overreacted.io/zh-hans/a-complete-guide-to-useeffect/)，[Effect Hook](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/hooks-effect.html)

1. 可以把 useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个生命周期函数的组合。`而不是代替`
3. useEffect会在每次渲染后都执行,`在第一次渲染之后和每次更新之后都会执行,发生在DOM渲染结束之后执行`
4. 需要清除的effect
* **为什么要在 effect 中返回一个函数？**：这是effect可选的清除机制，每个 effect 都可以返回一个清除函数。
* **React 何时清除 effect？**：在组件卸载的时候执行清除操作。因为effect在每次渲染的时候都会执行，所以React会在执行当前effect之前对上一个effect进行清除。 `在计时器demo中，需要在清除函数中clearInterval(timer)`
5. useEffect可以在组件渲染后实现各种不同的副作用，有些副作用需要清除，所以要返回一个函数；有的副作用不必清除，所以不需要返回。
6. effect可以像使用多个state 一样，使用多个effect
7. 挂载和取消挂载，更适合用`UseEffect`。
8. 通过跳过 Effect 进行性能优化，只要传递数组作为 useEffect 的第二个可选参数即可`因为每次渲染effect都会渲染，所以传递第二个参数告诉React,前后值进行比较，如果参数相等，会跳过这个effect渲染，实现性能优化`
9. [**如果我的 effect 的依赖频繁变化，该怎么办？**](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often)
* 启用第二参数，添加依赖
>下面案例中没有添加依赖，在setCount时，拿到的 count 值始终为0,effect对比结果相等，所以跳过。 因此计时器变化到1，不在改变，但是effect 还是会持续的渲染
```
useEffect(() => {
    const timer = setInterval(() => {
        console.log(count,'count')//0 "count"
        setCount(count+1) //这个 effect 依赖于 `count` state
    }, 1000)

    return () => clearInterval(timer)
}, [])// 🔴 Bug: `count` 没有被指定为依赖
```
>添加依赖，或者修改setCount，setCount(c => c + 1)方法,

```
useEffect(() => {
    const timer = setInterval(() => {
        setCount(count+1) 
    }, 1000)
    return () => clearInterval(timer)
}, [count]) 
```
```
useEffect(() => {
    const timer = setInterval(() => {
       setCount(c => c + 1)//✅ 在这不依赖于外部的 `count` 变量
    }, 1000)
    return () => clearInterval(timer)
}, [])//✅ 我们的 effect 不适用组件作用域中的任何变量
```

**注意：**
* 如果你要通过第二个参数优化方式，请确保数组中包含了**所有外部作用域中会随时间变化并且在effect中使用的变量**，否则你的代码会引用到先前渲染中的旧变量。
* 数据请求处理的方式[如何处理函数](https://react-1251415695.cos-website.ap-chengdu.myqcloud.com/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)
    * 将函数移动到你的 effect 内部 
    * 可以尝试把那个函数移动到你的组件之外。
    * 在 effect 之外调用函数， 并让 effect 依赖于它的返回值。
    * 可以 把函数加入 effect 的依赖但 把它的定义包裹进useCallback Hook

```
function getFetchUrl2(query) {
    return 'https://hn.algolia.com/api/v1/search?query=' + query;
}
function SearchResults() {
    const [data, setData] = useState([])
    const [data1, setData1] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    
    const getFetchUrl = useCallback((query)=> {
        return 'https://hn.algolia.com/api/v1/search?query=' + query;
    },[])

    useEffect(() => {
        // console.log(1)
        const result = axios.get(getFetchUrl('react')).then(res=>{
             setData(res.data.hits)
        })
      
        //console.log(2)
        async function fetchData_redux() {
            try{
                const result = await axios(getFetchUrl('redux'))
                setData1(result.data.hits)
            }catch (e) {
                setIsError(true)
            }
            setIsLoading(true)
        }
        fetchData_redux()
    }, [])
}
```

```
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // 把这个函数移动到 effect 内部后，我们可以清楚地看到它用到的值。
    let ignore = false;
    async function fetchProduct() {
      const response = await fetch('http://myapi/product' + productId);
      const json = await response.json();
      if (!ignore) setProduct(json);
    }

    fetchProduct();
  }, [productId]); // ✅ 有效，因为我们的 effect 只用到了 productId
}
```

10. [**那么问题出来了，如果有多个依赖该怎么办？**](https://juejin.im/post/5d9c5f935188251e3a06bbbb#heading-1)
```
const refresh = useCallback(() => {
  // ...
}, [name, searchState, address, status, personA, personB, progress, page, size]);

```
* 依赖数组依赖的值最好不要超过 3 个，否则会导致代码会难以维护。
* 如果发现依赖数组依赖的值过多，我们应该采取一些方法来减少它。

    * 去掉不必要的依赖。
    * 将 Hook 拆分为更小的单元，每个 Hook 依赖于各自的依赖数组。`放到不同 useEffect 中`
    * 通过合并相关的 state，将多个依赖值聚合为一个。`合并成一个state`
    * 通过 setState 回调函数获取最新的 state，以减少外部依赖。`使用setState callback 来减少一些依赖`
    * 通过 ref 来读取可变变量的值，不过需要注意控制修改它的途径。`ref`


11. [**useEffect会有死循环情况？**](https://www.cnblogs.com/lyyguniang/p/11242672.html)

* 知道useEffect会比较前一次渲染和后一次渲染的值，然后我就在想，如果我所设置的data=[],那么即使我后一次渲染的data也为[],那么[]===[]为false,所以才会造成useEffect会一直不停的渲染，所以我把data的初始值改为undefined，试了一下果然可以。
* useEffect在传入第二个参数时一定注意：第二个参数不能为引用类型，引用类型比较不出来数据的变化，会造成死循环。

12. 未完待续...





   