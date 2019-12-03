/*
 * @Author: lidandan
 * @Date: 2019-11-07 16:03:20
 * @LastEditors: lidandan
 * @LastEditTime: 2019-11-11 15:27:55
 * @Description: 
 */
//IndexB.js

import Link from 'next/link'
import {Button} from 'antd'
import { withRouter} from 'next/router'

 const IndexB = ({router})=>(
    <>
        <div className="Index-B">Index-B page . name: {router.query.name} </div>
        <Link href="/"><a>返回首页</a></Link>
        <div><Button>我是Antd按钮</Button></div>
    </>
)

export default withRouter(IndexB)

