import React,{Component,Fragment} from "react";
import {Link} from "react-router-dom";
import './index.scss'
const Header = ({actions,location,naviMetaData,userInfo})=>{
    return(
        <div className='layoutHeader'>
            <div className="left">
                logo
            </div>
            <div className="center">
                {
                    naviMetaData.naviList.map((item,index)=>{
                        return <span key={item.code} onClick={()=>{actions.goTo(item.target)}} className={location.pathname.includes(item.target)?'menu active':'menu'}>{item.name}</span>

                        // return <Link to={item.target} key={item.code}> {item.name}</Link>

                    })
                }
            </div>
            <div className="right">
               <Fragment>
                   <span>{userInfo.info.userinfo.loginName}</span>
                   <span className='drop_out' onClick={()=>{actions.goTo('/login')}}>退出</span>
               </Fragment>
            </div>
        </div>
    )
}

const judgeByCodeFunc = ()=> {//验证没有在NaviData中的列表
    if(window.location.pathname.includes('/v2/gmscope/wmscope/mmlscope')){
        return 'wmscope'
    }else if(window.location.pathname.includes('/v2/system/build')||window.location.pathname.includes('/v2/system/wxmanage')){
        return 'sysscope'
    }
}

const SideNavi=({actions,location,naviMetaData,userInfo})=>{
    let subMenu = naviMetaData.naviList.find(v => location.pathname.includes(v.target))
    return(
        <div className='layoutSideNavi'>
            <div className="menuHeader">{subMenu?subMenu.name:''}</div>
            <div className="menuList">
                {
                    subMenu&&subMenu.children.map((item,index)=>{
                        return  <Fragment key={item.code} >
                            <span className={`icon-menu ${routeMapClass[item.code]}`}/>
                            <span onClick={()=>{actions.goTo(item.target)}}
                                  className={location.pathname.includes(item.target)?'menu active':'menu'}>{item.name}</span>
                        </Fragment>

                    })
                }
            </div>
        </div>
    )
}



export default class MainLayout extends Component{
    render() {
        const {actions,location,naviMetaData,userInfo} = this.props
        return(
            <Fragment>
                <Header naviMetaData={naviMetaData} userInfo={userInfo} actions={actions} location={location}/>
                <SideNavi naviMetaData={naviMetaData} userInfo={userInfo} actions={actions} location={location}/>
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
    'TDScope': 'tdscope',
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
