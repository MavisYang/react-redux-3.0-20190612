import React, {
    forwardRef,
    Fragment, useCallback,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from "react";
import {Button,Input} from "antd";

function FatherComponent() {
    const [name1,setName1] = useState('小红')
    const [name2,setName2] = useState('小明')

    const [inputValue,setValue]= useState('')
    //======6:useRef=======
    const iptEl = useRef(null)
    console.log(useRef(),'iptEl')
    useEffect(()=>{
    })

    const onFocus=()=> {
        // `current` points to the mounted text input element
        iptEl.current.focus()
    }

    return (
        <div>
            <h3>useMemo 优化性能</h3>
            <Button onClick={()=>setName1(new Date().getTime())}>{name1}</Button>
            <Button onClick={()=>setName2(new Date().getTime())}>{name2}</Button>
            <ChildrenComponent name={name1}>
                {name2}
            </ChildrenComponent>

            <h3>useRef获取DOM元素和保存变量</h3>

            <Input ref={iptEl} onChange={(e)=>setValue(e.target.value)} style={{width:'200px'}}/>
            <span>value:{inputValue}</span>
            <Button onClick={onFocus}>Focus the input</Button>


            <MeasureExample/>

            <Counter/>
        </div>
    )

}

export default FatherComponent;


//子组件状态更新，父组件也会更新
//======5：useMemo====替代：shouldCompnentUpdate===
//没有加useMemo时，不论是触发按钮1还是按钮2，方法都会执行，出现性能问题。
//解决：给useMemo传递第二个参数，参数匹配成功才会执行方法。
function ChildrenComponent({name,children}) {

    function handleFunc(name) {
        console.log('小红来了')
        return name + '来了'
    }

    //5：useMemo
    const funcConst = useMemo(()=> handleFunc(name),[name])


    return(
        <Fragment>
            <div>{funcConst}</div>
            <div> {children}</div>
        </Fragment>
    )
}
//======9:useCallback===
function MeasureExample() {
    const [height, setHeight] = useState(0);

    const measuredRef = useCallback(node => {
        if (node !== null) {
            setHeight(node.getBoundingClientRect().height);
        }
    }, []);

    return (
        <div>
            <h1 style={{color:"red"}}>--useCallback--</h1>
            <h4 ref={measuredRef}>Hello, world</h4>
            <h4>The above header is {Math.round(height)}px tall</h4>
        </div>
    );
}

//=====7:useImperativeHandle 这个不懂=======
function FancyInput (props,ref){
    const inputRef = useRef()
    console.log(inputRef,'inputRef')
    useImperativeHandle(ref,()=>({
        focus:()=>{
            inputRef.current.focus()
        }
    }));
    return <input type="text" placeholder={'useImperativeHandle'} ref={inputRef}/>
}

FancyInput = forwardRef(FancyInput)

function Counter() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside
        }, 1000);
        return () => clearInterval(id);
    }, []); // ✅ Our effect doesn't use any variables in the component scope

    return <Fragment>
        <h2>--如果依赖关系变化太频繁怎么办？--</h2>
        <div>
            setCount相当于setState（setCount(count + 1)）,但也是个函数（setCount(c => c + 1)）
        </div>
        <h3>{count}</h3>
    </Fragment>;
}