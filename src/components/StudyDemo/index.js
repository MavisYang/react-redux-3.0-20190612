import React, {Component, Fragment, useEffect, useState} from "react";
import './index.scss'
import {Button} from "antd";
import InterviewQuestion from './InterviewQuestion'

export default class StudyDemo extends Component{

    render() {
        return(
            <div className='intro'>
                <TestCss/>
                <TestJs/>
                <DataStructure/>
                <InterviewQuestion/>
            </div>
        )
    }
}

const TestCss = ()=>{
    return(
        <Fragment>
            <h2>css技巧</h2>
            <div>
                {
                    ['温习一1','文字儿1','文字三1'].map(v=>{
                        return <span className='span' key={v}>{v}</span>
                    })
                }
                <br/>
                {
                    ['温习一','文字儿','文字三'].map(v=>{
                        return <span className='span_map' key={v}>{v}</span>
                    })
                }

                <div className='slider'>
                    使用 max-height 与 overflow hidden 一起来建立纯 CSS 的滑块：
                </div>

                <a href="">a标签</a>
            </div>
            <div className='test_container'>
                div
            </div>
        </Fragment>
    )
}

const TestJs = ()=>{

    const [nestedComments,setNests] = useState([])

    useEffect(()=>{
        //1. all：布尔全等判断
        const all = (arr,fn=Boolean)=> arr.every(fn)
        let flag =  all([1,2,3],x=>x>1)
        console.log(flag)//false

        //2. allEqual：检查数组各项相等
        const allEqual = arr => arr.every(val=>val === arr[0])
        let equal_1 = allEqual([1,2,3])
        let equal_2 = allEqual([1,1,1])
        console.log(equal_1,equal_2)//false true

        //18. intersection：两数组的交集 返回有交集的数组
        const intersection=(a,b)=>{
            const s = new Set(b);//去重
            return a.filter(x=>s.has(x))
        }
        let i = intersection([1,2,3],[2,34])//[2]
        console.log(i)

        //nest：根据parent_id生成树结构（阿里一面真题）
        const comments = [
            {id: 1, parent_id: null, sort: 0, name: '菜单1'},
            {id: 2, parent_id: 1, sort: 0, name: '菜单1-1'},
            {id: 3, parent_id: 1, sort: 0, name: '菜单1-2'},
            {id: 4, parent_id: 2, sort: 2, name: '菜单1-1-2'},
            {id: 5, parent_id: 4, sort: 3, name: '菜单1-1-2-1'},
            {id: 6, parent_id: null, sort: 0, name: '菜单2'},
            {id: 7, parent_id: 6, sort: 0, name: '菜单2-1'},

        ];
        //递归算法
        const nest = (items, id = null, link = 'parent_id') =>
            items
                .filter(item => item[link] === id)
                .map(item => ({...item, children: nest(items, item.id)}))


        const nestedComments = nest(comments); // [{ id: 1, parent_id: null, children: [...] }]
        setNests(nestedComments)
        // console.log(nestedComments,'nestedComments==')

        //.byteSize：返回字符串的字节长度
        const byteSize = str =>new Blob([str]).size
        console.log(byteSize('hello word'),byteSize('😊'))//10 4

    },[])

    return (
        <Fragment>
            <h2>JavaScript 工具函数大全</h2>
            <h3>数组</h3>
            <ul>
                <li>every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。</li>
                <li>reduce()方法对数组中的每个元素执行提供的reducer函数(升序执行)，将其结果汇总为单个返回值。（react+redux+reducer）
                    <p>
                        reducer 函数接收4个参数:
                        Accumulator (acc) (累计器)
                        Current Value (cur) (当前值)
                        Current Index (idx) (当前索引)
                        Source Array (src) (源数组)
                    </p>
                </li>
                <li>
                    <p>compact：去除数组中的无效/无用值</p>
                    <p>
                        在使用delete删除数组时，会多一个[empty, 23, 4] empty的数组，所以需要将清除
                        const compact = arr => arr.filter(Boolean);
                        compact([empty, 23, 4])
                    </p>
                    <p>或者用lodash中的_.compact</p>
                </li>
                <li>endsWith()方法用来判断当前字符串是否是以另外一个给定的子字符串“结尾”的，根据判断结果返回 true 或 false。</li>
                <li>
                    <p>some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。</p>
                    <br/>
                    <p>
                        files.some((file) =>
                        !formats.some((format) =>
                        file.name.toLowerCase().endsWith(format.toLowerCase())
                        )
                        )
                    </p>
                </li>
                <li>intersection：两数组的交集</li>
                <li>
                    <p style={{color:'red'}}>nest：根据parent_id生成树结构（阿里一面真题）:递归算法</p>
                    <ul>


                        {
                            nestedComments.map(v=>{
                                return <Fragment key={v.id}>
                                    <p>{v.name}</p>
                                    {
                                        v.children&&v.children.map(i=>{
                                            return <Fragment key={i.id}>
                                                <p style={{marginLeft:'20px'}}>{i.name}</p>
                                                {
                                                    i.children&&i.children.map(val=>(<p key={val.id} style={{marginLeft:'40px'}}>{val.name}</p>))
                                                }
                                            </Fragment>
                                        })
                                    }
                                </Fragment>
                            })
                        }
                    </ul>

                </li>
            </ul>

            <h3>函数</h3>
            <h3>字符串</h3>
            <h3>对象</h3>
        </Fragment>
    )
}


const DataStructure = ()=>{

    const [array,setArray] = useState([])

    const handlePush=()=>{
        let newArray = [...array]
        newArray.push({name:'Push 将元素添加到数组的顶部',id:'push'+ Math.random()})
        setArray(newArray)
    }

    const handlePop=()=>{
        let newArray = [...array]
        newArray.pop({name:'Pop从底部往顶部删除。',id:'pop'+ Math.random()})
        setArray(newArray)
    }

    const handleUnshift=()=>{
        let newArray = [...array]
        newArray.unshift({name:'unshift 将元素添加到数组的底部',id:'unshift'+ Math.random()})
        setArray(newArray)
    }

    const handleShift=()=>{
        let newArray = [...array]
        newArray.shift({name:'shift从顶部往底部删除。',id:'shift'+ Math.random()})
        setArray(newArray)
    }


    useEffect(()=>{

    },[])
    return (
        <div className='button_right'>
            <h2>中高级前端」窥探数据结构的世界- ES6版</h2>
            <ul>
                <p> 1.2 八大常见的数据结构</p>
                <li> 数组：Array</li>
                <li> 堆栈：Stack</li>
                <li> 队列：Queue</li>
                <li>链表：Linked Lists</li>
                <li> 树：Trees</li>
                <li> 图：Graphs</li>
                <li>字典树：Trie</li>
                <li> 散列表（哈希表）：Hash Tables</li>
            </ul>
            <h3>堆栈：Stack</h3>
            <p>数组unshift和shift方法代替push和pop</p>

            <Button onClick={()=>handlePush()}>Push从底部添加</Button>
            <Button onClick={()=>handlePop()}>Pop从底部往顶部删除</Button>
            <Button onClick={()=>handleUnshift()}>unshift从顶部添加</Button>
            <Button onClick={()=>handleShift()}>shift从顶部往底部删除</Button>
            {
                array.map(v=>(<p key={v.id}>{v.name}-{v.id}</p>))
            }
        </div>
    )
}
