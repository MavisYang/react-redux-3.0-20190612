/*
 * @Author: lidandan
 * @Date: 2019-11-10 16:22:04
 * @LastEditors: lidandan
 * @LastEditTime: 2019-11-10 16:22:53
 * @Description: 
 */
import { withRouter} from 'next/router'
import Link from 'next/link'

const className = ({router})=>{
    return (
        <>
            <div>欢迎{router.query.name},同学.</div>
            <Link href="/"><a>返回首页</a></Link>
        </>
    )
}

export default withRouter(className)