/**
 * 自定义HOOKS函数
 * */

import React, {useCallback, useEffect, useState} from "react";

export default function WinSizeUseHooks(){
    const size = useWinSize()
    return(
        <div>页面Size:<br/>宽度：{size.width}<br/>高度：{size.height}</div>
    )
}

function useWinSize() {

    const [size,setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })

    const onResize = useCallback((node)=>{
        setSize({
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        })
    },[])

    useEffect(()=>{
        console.log()
        window.addEventListener('resize',onResize)
        return()=>{
            window.removeEventListener('resize',onResize)
        }
    },[])


    return size
}