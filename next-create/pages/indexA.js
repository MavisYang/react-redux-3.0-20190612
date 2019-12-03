/*
 * @Author: lidandan
 * @Date: 2019-11-07 15:57:50
 * @LastEditors: lidandan
 * @LastEditTime: 2019-11-11 13:57:05
 * @Description: 
 */
//IndexA.js
import Link from 'next/link'
import { withRouter } from 'next/router'

const IndexA = ({ router }) => (
    <div>
        <div className="name">Index-A page .  name:{router.query.name}</div>
        <p>这是一段文字，很长的一段文字。。。。。</p>
        <Link href="/"><a>返回首页</a></Link>
        <style jsx>
            {
                `
                    .name {
                        color: red;
                    }

                    p {
                        background: pink;
                    }
                `
            }
        </style>
    </div>
)

export default withRouter(IndexA)
