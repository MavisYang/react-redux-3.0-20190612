/* eslint-disable */
// eslint-disable-next-line
import React, {Suspense, lazy} from 'react';
// import * as serviceWorker from './serviceWorker';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import {Switch, Route} from 'react-router'
import {ConnectedRouter,connectRouter} from 'connected-react-router'
import configureStore, {history} from './store'
import PageLoading from './components/shareComponents/Loading/PageLoading'
import {NaviData,UserInfoData} from './Layout/Datas'
import 'antd/dist/antd.min.css';
import './index.scss';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export const store = configureStore(/* provide initial state if any */)

const Loading = <PageLoading/>
const App = lazy(() => import('./App'))
const LoginScope = lazy(() => import('./containers/LoginScope'))
const TestScope = lazy(() => import('./containers/TestScope'))

const MainScope = ({location, history}) => {
    //存储store数据
    const reduxStore = store.getState()

    if (reduxStore.naviMetaData.naviList.length == 0) {
        store.dispatch({
            type: 'NAVILIST_INIT',
            data: NaviData.resultContent
        })
    }

    if(reduxStore.userInfo.info.userinfo==undefined){
        store.dispatch({
            type:'USERINFO_INIT',
            data:UserInfoData.resultContent
        })
    }


    return (
        <div className='mainLayout'>
            <Switch>
                <Route path={'/v2/tdscope'} component={TestScope}/>
            </Switch>

        </div>
    )
}


render(
    <Provider store={store}>
        {/*<Router history={history}>*/}
        {/*    <Link to='/v2/tdscope'>*/}
        {/*        <span>goto</span>*/}
        {/*    </Link>*/}
        {/*</Router>*/}
        <ConnectedRouter history={history}>
            {/*<Link to='/v2/tdscope'>*/}
            {/*    <span>goto</span>*/}
            {/*</Link>*/}
            <Suspense fallback={Loading}>
                <Switch>
                    <Route path={'/app'} component={App}/>
                    <Route path={'/login'} component={LoginScope}/>
                    <Route path={'/'} component={MainScope}/>
                </Switch>
            </Suspense>
        </ConnectedRouter>
    </Provider>


    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
