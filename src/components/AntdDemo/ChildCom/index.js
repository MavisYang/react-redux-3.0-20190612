import React, {Fragment, useContext} from "react";
import {AntdContext} from "../../SaasScope/ATScope";
import {Button} from "antd";

export default function ChildCom() {
    //2. 使用context,需要传入创建的context
    const context = useContext(AntdContext)
    // console.log(context,'context')

    const handleGoBack =()=>{
        context.goTo('/v2/tdscope')
    }

    return(
        <Fragment>
            <h2>我是子组件,通过useContext调用父父组件的方法</h2>
            <Button onClick={handleGoBack}>点击进入testDemo</Button>
        </Fragment>

    )


}