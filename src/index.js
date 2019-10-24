import React,{Suspense,lazy} from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import configureStore,{history} from "./store";
import {Provider} from "react-redux";
import {ConnectedRouter} from "connected-react-router";
import {Switch,Route,Redirect} from "react-router";
import './index.scss';
import 'antd/dist/antd.min.css';

import PageLoading from './components/shareComponents/Loading/PageLoading'
import {NaviData,UserInfoData} from './Layout/Datas'

const store = configureStore()

const Loading = <PageLoading/>
const App = lazy(() => import('./App'))
const LoginScope = lazy(() => import('./containers/LoginScope'))
const TestScope = lazy(() => import('./containers/TestScope'))
const AntdScope = lazy(() => import('./containers/AntdScope'))
const StudyScope = lazy(() => import('./containers/StudyScope'))
const IQScope = lazy(() => import('./components/SaasScope/IQScope'))
const ReactScope = lazy(() => import('./components/SaasScope/ReactScope'))


const MainScope = ({location, history}) => {
    //存储store数据
    const reduxStore = store.getState()

    if (reduxStore.naviMetaData.naviList.length === 0) {
        store.dispatch({
            type: 'NAVILIST_INIT',
            data: NaviData.resultContent
        })
    }

    if(reduxStore.userInfo.info.userinfo===undefined){
        store.dispatch({
            type:'USERINFO_INIT',
            data:UserInfoData.resultContent
        })
    }


    return (
        <div className='mainLayout'>
            <Switch>
                <Route path={'/v2/tdscope'} component={TestScope}/>
                <Route path={'/v2/antd'} component={AntdScope}/>


                <Route path={'/v2/syscope/react'} component={ReactScope}/> {/*react*/}
                <Route path={'/v2/syscope/iqscope'} component={IQScope}/>{/*面试题*/}
                <Route exact path={'/v2/syscope/jscss'} component={StudyScope}/>

            </Switch>
        </div>
    )
}
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Suspense fallback={Loading}>
                <Switch>
                    <Route exact path={'/login'} component={LoginScope}/>
                    <Route path={'/app'} component={App}/>
                    <Route path={'/'} component={MainScope}/>

                </Switch>
            </Suspense>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
