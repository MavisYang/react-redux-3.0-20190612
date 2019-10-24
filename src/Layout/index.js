import React,{Component,Fragment} from "react";
import {Link} from "react-router-dom";
import './index.scss'
const Header = ({location,naviMetaData,userInfo})=>{
    return(
        <div className='layoutHeader'>
            <div className="left">
                logo
            </div>
            <div className="center">
                {
                    naviMetaData.naviList.map((item,index)=>{
                        return <Link to={item.target} key={item.code}  className={location.pathname.includes(item.target)?'menu active':'menu'}>
                            {item.name}
                        </Link>

                    })
                }
            </div>
            <div className="right">
               <Fragment>
                   <span>{userInfo.info.userinfo.loginName}</span>
                   <Link className='drop_out' to='/login'>退出</Link>
               </Fragment>
            </div>
        </div>
    )
}

const judgeByCodeFunc = ()=> {//验证没有在NaviData中的列表
    if(window.location.pathname.includes('/v2/syscope/iqscope')){
        return 'iqscope'
    } else if(window.location.pathname.includes('/v2/system/build')||window.location.pathname.includes('/v2/system/wxmanage')){
        return 'sysscope'
    }
//    /v2/syscope/react
}

const SideNavi=({location,naviMetaData,userInfo})=>{
    let subMenu = naviMetaData.naviList.find(v => location.pathname.includes(v.target))
    let judgeByCode = judgeByCodeFunc()
    return(
        <div className='layoutSideNavi'>
            <div className="menuHeader">{subMenu?subMenu.name:''}</div>
            <div className="menuList">
                {
                    subMenu&&subMenu.children.map((item,index)=>{
                        return <Link  key={item.code}  className={(judgeByCode?judgeByCode===item.code.toLowerCase():location.pathname.includes(item.target))?'menu active':'menu'} to={item.target}>
                                <span className={`icon-menu ${routeMapClass[item.code]}`}/>
                                <span> {item.name}</span>
                            </Link>
                    })
                }
            </div>
        </div>
    )
}



export default class MainLayout extends Component{
    render() {
        const {location,naviMetaData,userInfo} = this.props
        return(
            <Fragment>
                <Header naviMetaData={naviMetaData} userInfo={userInfo} location={location}/>
                <SideNavi naviMetaData={naviMetaData} userInfo={userInfo} location={location}/>
                <div className="layoutContent">
                    {
                        this.props.children
                    }
                </div>
            </Fragment>
        )
    }
}


const routeMapClass = {
    'TDScope':'tdScope',
    'GMScope': 'gmscope',
    'GIScope': 'giscope',
    'Welcome': 'welcome',
    'ARScope': 'arscope',
    'Protect': 'protect',
    'MTScope': 'mtscope',
    'MMScope': 'mmscope',
    'GBScope': 'gbscope',
    'Dashboard': 'dashboard',
    'GDScope': 'gdscope',
    'HWScope': 'hwscope',
    'MLScope': 'mlscope',
    'CWScope': 'cwscope',
    'GFmanage': 'gfmanage',
    'WMscope': 'wmscope',
    'SysScope': 'sysscope',
    'UCScope': 'ucscope',
    'Lbscope': 'lbscope',
    'MGScope': 'mgscope',
    'Cmscopemanage': 'cmscope',
    'Customertag': 'customertag',
    'Customergroup': 'customergroup'
}
