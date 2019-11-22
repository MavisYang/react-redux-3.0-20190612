import React, {Component, Fragment,lazy} from "react";
import React_1024 from './React_1024'
import React_1025 from './React_1025'
import HOC from './HOC'
import {Switch,Route} from "react-router";
import {Link} from "react-router-dom";
import {Button} from 'antd'
const LazyCompoent = lazy(()=>import('./React_1029'))
const React_1030 = lazy(()=>import('./React_1030'))
const React_1114 = lazy(()=>import('./React_1114'))
const navList = [
    {
        name:'React_1024(基础)',
        code:'React_1024',
        path:'/v2/syscope/react/1024'
    },
    {
        name:'React_1025(生命周期)',
        code:'React_1025',
        path:'/v2/syscope/react/1025'
    },
    {
        name:'React_1029(useEffect使用指南)',
        code:'React_1029',
        path:'/v2/syscope/react/1029'
    },
    {
        name:'React_1030(使用指南)',
        code:'React_1030',
        path:'/v2/syscope/react/1030'
    },
    {
        name:'React_1114(自定义hook)',
        code:'React_1114',
        path:'/v2/syscope/react/1114'
    },
    ]

const judgeByCodeFunc=()=>{
    if(window.location.pathname.includes('/v2/syscope/react/1024')){
        return 'React_1024'
    }else if(window.location.pathname.includes('/v2/syscope/react/1025')){
        return 'React_1025'
    }
    else if(window.location.pathname.includes('/v2/syscope/react/1029')){
        return 'React_1029'
    }
    else if(window.location.pathname.includes('/v2/syscope/react/1030')){
        return 'React_1030'
    }
    else if(window.location.pathname.includes('/v2/syscope/react/1114')){
        return 'React_1114'
    }
    return null;
}
export default function ReactScope(prop) {

    let judgeByCode = judgeByCodeFunc()
    return (
        <div className='container'>
            {
                navList.map(v=>{
                    return <Link key={v.code} to={v.path}>
                        <Button type={judgeByCode&&judgeByCode===v.code?'primary':''} style={{marginRight:'10px',marginBottom:'20px'}}>{v.name}</Button>
                    </Link>
                })
            }
            <Switch>
                <Route path={'/v2/syscope/react/1114'} render={(props)=><React_1114 {...props} actions={prop.actions}/>}/>
                <Route path={'/v2/syscope/react/1030'} render={(props)=><React_1030 {...props} actions={prop.actions}/>}/>
                <Route path={'/v2/syscope/react/1029'} render={(props)=><LazyCompoent {...props} actions={prop.actions}/>}/>
                <Route path={'/v2/syscope/react/1025'} render={(props)=><React_1025 {...props} actions={prop.actions}/>}/>
                <Route path={'/v2/syscope/react/1024'} render={(props)=><React_1024 {...props} actions={prop.actions}/>}/>
            </Switch>

            {
                window.location.pathname.includes('/v2/syscope/react/1024')&& <HOC value={'高阶组件'}/>
            }

        </div>
    )

}

