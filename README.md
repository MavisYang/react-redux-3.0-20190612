
## 搭建的react+redux+router项目

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

### 报错
1.Invariant failed: You should not use <Link> outside a <Router>

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


















