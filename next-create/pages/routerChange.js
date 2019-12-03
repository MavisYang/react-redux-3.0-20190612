/*
 * @Author: lidandan
 * @Date: 2019-11-10 17:58:12
 * @LastEditors: lidandan
 * @LastEditTime: 2019-11-11 15:14:17
 * @Description:
 */

import Router from 'next/router'
// import { withRouter} from 'next/router'
import axios from 'axios'
import Link from 'next/link'


const routerChange = ({ router }) => {
    Router.events.on('routeChangeStart', (...args) => {
        console.log('1.routeChangeStart->路由开始变化,参数为:', ...args)
    })

    Router.events.on('routeChangeComplete', (...args) => {
        console.log('2.routeChangeComplete->路由结束变化,参数为:', ...args)
    })

    Router.events.on('beforeHistoryChange', (...args) => {
        console.log('3,beforeHistoryChange->在改变浏览器 history之前触发,参数为:', ...args)
    })

    Router.events.on('routeChangeError', (...args) => {
        console.log('4,routeChangeError->跳转发生错误,参数为:', ...args)
    })

    Router.events.on('hashChangeStart', (...args) => {
        console.log('5,hashChangeStart->hash跳转开始时执行,参数为:', ...args)
    })

    Router.events.on('hashChangeComplete', (...args) => {
        console.log('6,hashChangeComplete->hash跳转完成时,参数为:', ...args)
    })
    return (
        <div>
            routerChange页面<br />
            <Link href="/"><a>返回首页</a></Link><br />
            <div>
                <Link href="#hash"><a>hash</a></Link>
            </div>
            <div>
                <Link href="/indexA?name=ldd"><a>indexA</a></Link>
            </div>
        </div>
    )
}


// routerChange.getInitialProps = async () => {
//     const promise = new Promise((resolve) => {
//         axios('https://www.easy-mock.com/mock/5dc0d5b143ff8e61fd932abe/example/query').then(
//             (res) => {
//                 console.log('远程数据结果：', res)
//                 resolve(res.data.data)
//             }
//         )
//     })
//     return await promise

// }
export default routerChange