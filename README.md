
## 搭建的react+redux+router项目

>最新版本，最新搭建方式

### 项目记录
1. 左侧和右侧都有导航条
2. 熟练应用redux

**2019.10.11**

### Redux应用

详见`/components/TestDemo/TodoList`

**Redux三要素：（个人理解）**

- Action：存储函数方法 
- Store:存储数据的仓库
- Reducer:数据处理仓库,必须是纯函数

技巧：
1. 把Action Types 单度写入一个文件 `/actions/actionTypes.js`
```$xslt
actions.js 引入 import * as types from './actionTypes.js'

reducer.js  引入import {TODO_INIT, TODO_ADD} from '../actions/actionTypes.js'
```
2. 编写actionCreators.js文件 `/actions/index.js`


**通过store.getState()获取存储store数据**

**通过dispatch添加store数据**
```
store.dispatch({
    type:'USERINFO_INIT',
    data:UserInfoData.resultContent
})

```
但深层的组件中一般不直接使用这两个方法。

**只有store能改变自己的内容，Reducer不能改变**

>Reudcer只是返回了更改的数据，但是并没有更改store中的数据，store拿到了Reducer的数据，自己对自己进行了更新。

**Reducer必须是纯函数**

> 它的返回结果，是完全由传入的参数state和action决定的，这就是一个纯函数

### 拆分UI组件

>分工合作，一人写样式，一人写逻辑。

### 无状态组件

>直接收传入的props值，不做逻辑处理

### 利用easy-mock创建模拟数据

>地址：https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList

### Redux-thunk中间件

>在实际工作中你可以使用中间件来进行日志记录、创建崩溃报告，调用异步接口或者路由。

>Redux-thunk是对Redux中dispatch的加强。


**配置Redux-thunk组件**

1.引入applyMiddleware,如果你要使用中间件，就必须在redux中引入applyMiddleware.
2.引入redux-thunk库
3.直接把thunk放到createStore里的第二个参数就可以了
4.详见`/store/index`

**2019.10.12**
### [redux-saga中间件](https://jspang.com/posts/2019/06/20/redux.html#p18-%E8%BF%9B%E9%98%B6-redux-saga%E7%9A%84%E5%AE%89%E8%A3%85%E5%92%8C%E9%85%8D%E7%BD%AE)

1.`npm install --save redux-saga`
2. 创建sagas.js文件并引入，`sagaMiddleware.run(mySagas)`
>function* mySaga() {} 
 export default mySaga;

3. 比Redux-thunk复杂一点,更适合于大的项目
4. sage中需要用到generator函数

ES6的新特性：
```
function* mySaga() { //Generator Function(生成器函数)。
    //等待捕获action
    yield takeEvery(GET_MY_LIST, getList) //关键字yield——迭代器生成器
}
```

### 报错：Invariant failed: You should not use <Link> outside a <Router>

排查之后的react-scripts版本有关
"react-scripts": "^3.0.1",升不了级
最新："react-scripts": "3.2.0",
重新构建一个就好了 （死办法）
```$xslt
 "antd": "^3.23.6",
    "axios": "^0.19.0",
    "connected-react-router": "^6.5.2",
    "history": "^4.10.1",
    "prop-types": "^15.7.2",
    "react": "^16.10.2",
    "react-dom": "^16.8.6",
    "react-redux": "^7.1.1",
    "react-router": "^5.1.2",
    "react-router-dom": "^5.0.1",
    "react-scripts": "3.0.1",
    "redux": "^4.0.4",
    "redux-thunk": "^2.3.0"
```

npm install history react-router-dom react-router react-redux react-dom redux react connected-react-router prop-types -S

**2019.10.12**
### 报错：不能根目录引入scss
```$xslt
./src/Layout/index.scss (./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-5-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--6-oneOf-5-3!./node_modules/sass-loader/lib/loader.js??ref--6-oneOf-5-4!./src/Layout/index.scss)
@import "style/public.scss";
^
      File to import not found or unreadable: style/public.scss.
      in /Users/mavis/gitHub/react_2019/redux-link/src/Layout/index.scss (line 2, column 1)

```
**解决**
1.添加jsconfig.json
```$xslt
{
    "compilerOptions": {
      "baseUrl": "src"
    },
    "include": ["src"]
  }
```
2.在安装插件时，最好将服务器关闭

### react-redux
react-redux中用到两个只是：provider和connect

1.Provider提供器
>Provider是一个提供器，只要使用这个组件，组件里的其他所有组件都可以使用`store`了，这也是React-redux的核心组件了。

```
import {Provider} from "react-redux";
ReactDOM.render(
    <Provider store={store}>
      <TodoList/>
    </Provider>, document.getElementById('root'));

```
2.connect连接器
>connects是一个连接器，链接`state`和`dispatch`,这个可以简单的获取到`store`中的数据了。
>connect的作用是把UI组件（无状态组件）和业务逻辑代码的分开，然后通过connect再链接到一起，让代码更加清晰和易于维护。这也是React-Redux最大的有点。

```
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';//引入连接器
import * as TodoActions from '../actions'

const mapStateToProps = state => ({
    userInfo: state.userInfo,
    todosReducer: state.todosReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestScope)


```

- [react-redux中的provider和connect](https://jspang.com/posts/2019/06/20/redux.html#p21-进阶-react-redux中的provider和connect)

### React-router

1. exact 精确匹配
2. 动态传值
>这个设置是以:开始的，然后紧跟着你传递的key（键名称）名称
`<Route exact path='/v2/tdscope/build/id:?/type:?' render={props=><TodoList {...props} actions={actions}/>}/>`

3. Link上传递值
`<Link to="/list/123">列表</Link>`

4. 在组件上接收并显示传递值
`this.props.match` 包括三个部分:
- patch:自己定义的路由规则，可以清楚的看到是可以产地id参数的。
- url: 真实的访问路径，这上面可以清楚的看到传递过来的参数是什么。
- params：传递过来的参数，key和value值。

5. ReactRouter重定向`Redirect`使用
大致两种知识点：重定向，即跳转页面,直接跳转。
- 标签式重定向:就是利用<Redirect>标签来进行重定向，业务逻辑不复杂时建议使用这种。
`<Redirect to={'/app'}/>`
- 编程式重定向:这种是利用编程的方式，一般用于业务逻辑当中，比如登录成功挑战到会员中心页面。直接在构造函数constructor中加入下面的重定向代码。
` this.props.history.push("/home/")`
⚠️：重定向和跳转有一个重要的区别，就是跳转式可以用浏览器的回退按钮返回上一级的，而重定向是不可以的。

6. 嵌套路由








