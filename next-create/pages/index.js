import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import '../static/test.css'

const Home = () => {
  function gotoA() {
    Router.push({
      pathname: '/IndexB',
      query: {
        name: '小红'
      }
    })
  }
  return (
    <div>
      <div>我是首页</div>
      {/* Link链接不支持兄弟标签， */}
      <div><Link href={{pathname:'/indexA',query:{name:'小白'}}}><a>去IndexA页面</a></Link></div>
      <div><button onClick={gotoA}>去IndexB页面</button></div>
      <Link href="/routerChange"><a>routerChange</a></Link>
    </div>
  )
}

export default Home