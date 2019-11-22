/**
 * 自定义HOOKS函数
 * */

import React from "react";
import {useWinSize} from '../../ReactScope/Hooks'

export default function WinSizeUseHooks(){
    const size = useWinSize()
    return(
        <div>页面Size:<br/>宽度：{size.width}<br/>高度：{size.height}</div>
    )
}

