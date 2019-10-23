import React, {Fragment, useEffect, useRef, useState} from "react";
import './index.scss'

const THRESHOLD = 8 //THRESHOLD 必须》-5
function InterScroll(props){

    /**
     *
     start：当前渲染的列表第一个数据，默认为0
     end: 当前渲染的列表最后一个数据，默认为15
     observer: 当前观察的视图ref元素
     */

    const [start,setStart] = useState(0)
    const [end,setEnd] = useState(THRESHOLD)
    const [observer,setObserver] =useState(null)


    const $bottomElement = useRef()
    const $topElement = useRef()

    useEffect(()=>{
        // 定义观察
        intiateScrollObserver()
        return()=>{
            // 放弃观察
            resetObservation()
        }
    },[end])//因为[end] 是同步刷新，这里用一个就行了。
    // 定义观察
    const intiateScrollObserver = ()=>{
        const options={
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }

        const Observer = new IntersectionObserver(callback,options)
        // 分别观察开头和结尾的元素
        if($topElement.current){
            Observer.observe($topElement.current)
        }

        if($bottomElement.current){
            Observer.observe($bottomElement.current)
        }
        // console.log(Observer,'Observer')
        // 设初始值
        setObserver(Observer)

    }
    // 交叉观察的具体回调，观察每个节点，并对实时头尾元素索引处理
    const callback=(entries, observer)=>{
        // console.log(entries,'entries')
        // console.log( observer,'observer')

        entries.forEach((entry,index)=>{
            // console.log(entry,'entry')
            const listLength = props.list.length;
            // 向下滚动，刷新数据
            if(entry.isIntersecting && entry.target.id === 'bottom'){
                const maxStartIndex = listLength - THRESHOLD;// 当前头部的索引 ：listLength - 1 - THRESHOLD; （减1的话最后一个item出现）
                const maxEndIndex = listLength;//当前尾部的索引：listLength - 1;减1的话最后一个item出现）
                // console.log(maxStartIndex,maxEndIndex)
                const newEnd = (end + 10) <= maxEndIndex ? end + 10 : maxEndIndex;//下一轮增加尾部
                const newStart = (end - 5) <= maxStartIndex ? end - 5 : maxStartIndex;// 在上一轮的基础上计算头部
                // console.log(maxEndIndex,maxEndIndex,'maxEndIndex')
                // console.log(newStart,newEnd,'newStart')
                setStart(newStart)
                setEnd(newEnd)
            }


            // 向上滚动，刷新数据
            if(entry.isIntersecting && entry.target.id === "top"){
                const newEnd = end === THRESHOLD ? THRESHOLD : (end - 10 > THRESHOLD ? end - 10 : THRESHOLD);// 向上滚动尾部元素索引不得小于15
                const newStart = start === 0 ? 0 : (start - 10 > 0 ? start - 10 : 0);// 头部元素索引最小值为0
                // console.log(newStart,newEnd)
                setStart(newStart)
                setEnd(newEnd)
            }

        })
    }

    const resetObservation=()=>{
        observer&&observer.unobserve($bottomElement.current)
        observer&&observer.unobserve($topElement.current)
    }

    // 渲染时，头尾ref处理
    const getReference=(index,isLastIndex)=>{
        if(index===0){
            return $topElement
        }
        if(isLastIndex){
            return $bottomElement
        }
        return null

    }

    const {list,height} = props;//list 数据 height： 第二块li的top值
    const updatedList = list.slice(start,end)
    // console.log(updatedList,start,end,'updatedList')
    const lastIndex = updatedList.length -1
    return(
        <Fragment>
            <h3>15个元素实现无限滚动</h3>
            <ul className='scroll_ul'>
                {
                    updatedList.map((item,index)=>{
                        const top = (height *(index+start))+'px'// 基于相对 & 绝对定位 计算
                        const refVal= getReference(index,index===lastIndex)// map循环中赋予头尾ref
                        const id = index === 0 ? 'top' : (index === lastIndex ? 'bottom' : ''); // 绑ID
                        return <li ref={refVal} style={{top}} className='li-card' key={item.key} id={id}>{item.value}</li>
                    })
                }
            </ul>
        </Fragment>
    )

}


export default InterScroll;
