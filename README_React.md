>再次阅读react文档

[react中文文档](https://zh-hans.reactjs.org/docs/getting-started.html)

**2019.10.18**
### 语义化的 HTML
1. 使用 React片段(`Fragments`) 将多个元素组合在一起。
2. 在 JSX 中，`for` 特性被写作`htmlFor`:`<label htmlFor="namedInput">Name:</label>`
3. 有时，父组件需要将焦点设置为子组件中的一个元素。 我们可以通过 将 `DOM refs` 公开给父组件 来做到这一点 通过一个子组件上指定的 prop 将父对象的引用（ref）转发给子节点的DOM节点
4. 开发助手:`eslint-plugin-jsx-a11y` 在项目的根目录下创建一个.eslintrc文件并包含如下内容：
```
{
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"]
}
```
### 代码拆分
1. 组件拆分
2. 路由拆分
`import React {Suspense,lazy} from 'react`
3. 导出默认模块 
`import {MyCom as default} from './MyCom.js`

### 通过context实现组件数之间的传递。无需props手动传入
没有使用过，可以使用`hooks的createContext和useContext`

API:React.createContext
    Context.Provider
    Class.contextType
    Context.Consumer
    
**2019.10.24**
### 阻止事件的发生
```js
e.preventDefault();//阻止默认行为
e.stopPropagation();//阻止冒泡事件

e.nativeEvent.stopImmediatePropagation();//阻止冒泡事件
```
### 传值
- 通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
### 条件渲染

1. if/switch
2. 与运算符 && `{data.length>0&&<Com/>}`,不需要通过三目运算表示。
3. 三目运算符(结合``合理使用)
4. 阻止组件渲染`return null`,所以组件在渲染时，三目运算判断时，最好返回null

>组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。

### 列表 & Keys

>map()请求时，必须添加key，要不会提示错误。

#### key
1. key可以在DOM中的某些元素被增加或者删除的时候帮助React识别哪些元素发生了变化。因此，应当给数组中的每一个元素赋予一个确定的标识。
2. 元素的key只有在它和它的兄弟节点对比时才有意义。
3. 数组元素中使用的key在其兄弟之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的键
4. key会作为给React的提示，但不会传递给你的组件。如果您的组件中需要使用和key相同的值，请将其作为属性传递

### 表单

#### 受控组件
- React负责渲染表单的组件仍然控制用户后续输入时所发生的变化。相应的，
- 其值由React控制的输入表单元素称为“受控组件”。(input,textarea, 和 select这类表单元素都是受控组件)

#### 非受控组件
>通过ref从DOM获取表单值

es6setState写法

```
this.setState({
  [name]: value
});
```

### 状态提升
>在React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。

### 通过children传递子组件，叫做'组合'

### 各种组件称呼
- 受控组件：input,textarea,和select这类表单元素
- 非受控组件：通过ref从DOM获取表单值
- 高阶组件（Higher-Order Components，简称HOC）：高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件
(connect 是一个返回高阶组件的高阶函数！)
- 容器组件
- UI组件：只展示样式
- 逻辑层组件：做数据处理
- [Web组件](https://www.reactjscn.com/docs/web-components.html):没懂，可能用的组件都是这个吧 


### React开发理念
第一步：把 UI 划分出组件层级
第二步：用 React 创建一个静态版本：先创建一个静态版本：传入数据模型，渲染 UI 但没有任何交互。
在创建静态版本的时候不要使用 state
第三步：定义 UI 状态的最小(但完整)表示
第四步：确定你的 State 应该位于哪里
第五步：添加反向数据流


## 高阶指引

### JSX 
>只是为 React.createElement(component, props, ...children) 方法提供的语法糖

1. 声明react
```js
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // 返回 React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```
2. 点表示法
```
 <h2>JSX:点表示法</h2>
 <MyComponents.DatePicker color={'blue'}/>

const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div style={{color:props.color}}>Imagine a {props.color} datepicker here.</div>;
    }
}
```
3. 组件首字母要大写
4. 扩展属性:使用`...`作为扩展操作符来传递整个属性对象`<SpecificStory {...props}/>`(属性都用到是建议使用，如果有很多不想属性时不建议使用)
5. JSX 会移除空行和开始与结尾处的空格
6. 不需要使用额外的元素包裹数组中的元素
```
const LI=({value})=>{
    return [
        <li key={value}>{value}</li>
    ]
}
```
7. return [] 数组就是一个map遍历，需要加key 
8. 可以将调用 props.children 来获得传递的子代
9. false、null、undefined 和 true 都是有效的子代，但它们不会直接被渲染,会被忽略（`根据条件来确定是否渲染React元素时非常有用`）
- props.messages为空数组时，props.messages.length返回0，依然会被渲染，所以要确保&& 前面的表达式始终为布尔值
```
{ props.messages.length > 0 &&
    <MessageList messages={props.messages} />
}
```
- 如果你想让类似 false、true、null 或 undefined 出现在输出中，你必须先把它转换成字符串`<div>My JavaScript variable is {String(myVariable)}.</div>`

### Refs & DOM

#### 何时使用 Refs
- 处理焦点、文本选择或者媒体控制
- 触发强制动画
- 集成第三方DOM库

>不要过度使用Refs
为类组件添加 Ref,这种方法仅对 class 声明的 CustomTextInput 有效,
不能在函数式组件上使用 ref 属性，因为它们没有实例;
但是，你可以在函数式组件内部使用 ref，只要它指向一个 DOM 元素或者 class 组件：

#### 性能优化
1. shouldComponentUpdate(nextProps, nextState)
```
 shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
```
>shouldComponentUpdate只检查props.color和state.count的变化。
如果这些值没有变化，组件就不会更新。
当你的组件变得更加复杂时，你可以使用类似的模式来做一个“浅比较”，用来比较属性和值以判定是否需要更新组件。

2. 想要实现代码而不污染原始对象，我们可以使用Object.assign方法和数组的[spread语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

spread语法(展开语法)
(1)函数调用：
`myFunction(...iterableObj);`
(2)字面量数组构造或字符串：
`[...iterableObj, '4', ...'hello', 6];`
(3)构造字面量对象时,进行克隆或者属性拷贝（ECMAScript 2018规范新增特性）：
`let objClone = { ...obj };`

3. 手动绑定this
>对于使用 class 关键字创建的 React 组件，组件中的方法是不会自动绑定 this 的。
类似地，通过 ES6 class 生成的实例，实例上的方法也不会绑定 this。
因此，你需要在 constructor 中为方法手动添加 .bind(this)：

ES6:通过构造函数可以不需要手动添加 .bind(this)

### [Portals](https://www.reactjscn.com/docs/portals.html)
>Portals 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式

用于messages提示 ，详见`/shareComponents/Messages`


### 捕捉错误的生命周期：componentDidCatch
```js
handleClick = () => {
 try {
   // Do something that could throw
 } catch (error) {
   this.setState({ error });
 }
}
```

## API

### React Component

>React.PureComponent 与 React.Component 几乎完全相同，但 React.PureComponent 通过prop和state的浅对比来实现 shouldComponentUpate()。
>如果React组件的 render() 函数在给定相同的props和state下渲染为相同的结果，在某些场景下你可以使用 React.PureComponent 来提升性能。

**2019.10.25**

### 生命周期--`getDerivedStateFromProps`(`nextProps和prevState相比较`)
- 组件实例化后和接受新属性时将会调用`getDerivedStateFromProps`。它应该返回一个对象来更新状态，或者返回null来表明新属性不需要更新任何状态。
- 注意，如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用。如果你只想处理变化，你可能想去比较新旧值。
- 调用this.setState() 通常不会触发 getDerivedStateFromProps()。
```
static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.wxList.length == 0 && nextProps.wxList&&nextProps.wxList.length>0) {
        return {wxList: nextProps.wxList}
    }
    return null
  }
```
### 生命周期--`shouldComponentUpdate`(`nextProps和this.props相比较`)
- 当前，若shouldComponentUpdate()返回false，而后UNSAFE_componentWillUpdate()，render()， 和 componentDidUpdate()将不会被调用。
```
 shouldComponentUpdate(nextProps,nextState){
    if(nextProps.targetWxUser.userId!=this.props.targetWxUser.userId){
        this.setState({
            selectId: ''
        })
    }
    return true
}
```
### 生命周期--`getSnapshotBeforeUpdate`
- getSnapshotBeforeUpdate()在最新的渲染输出提交给DOM前将会立即调用。
它让你的组件能在当前的值可能要改变前获得它们。这一生命周期返回的任何值将会 作为参数被传递给componentDidUpdate()。


### dangerouslySetInnerHTML函数
>dangerouslySetInnerHTML是React提供的替换浏览器DOM中的innerHTML接口的一个函数。
必须是一个闭合标签，不能有children
```
<div dangerouslySetInnerHTML={{__html:'First &middot; Second'}}/>
```
### onWheel事件
- onwheel 在鼠标滚轮滚动的时候被触发：因为滚轮可以控制页面的滚动，所以在使用滚轮时，onwheel事件先被触发，滚动条滚动，接着是onscroll事件



**2019.10.28**

## [生命周期](https://www.reactjscn.com/docs/react-component.html#static-getderivedstatefromprops)

#### 同时应用getDerivedStateFromProps()和UNSAFE_componentWillMount，报错
>index.js:1375 Warning: Unsafe legacy lifecycles will not be called for components using new component APIs.
TheLifeCycle uses getDerivedStateFromProps() but also contains the following legacy lifecycles:
   UNSAFE_componentWillMount The above lifecycles should be removed.

#### 生命周期`static getSnapshotBeforeUpdate()`将被忽略
 
>TheLifeCycle: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method. 

#### `getSnapshotBeforeUpdate()`必须和`componentDidUpdate()`一起使用.

>TheLifeCycle: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only. 

#### TheLifeCycle.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.

1. 初始化
```
constructor
getDerivedStateFromProps {nextProps: {…}, prevState: {…}} //nextProps: {defaultColor: "blue"}
                                                            prevState: {currentColor: "blue"}
                                                            __proto__: Object

render
componentDidMount
```
2. 更新(父组件改变，子组件跟着改变/子组件改变state值) 
```
getDerivedStateFromProps {nextProps: {…}, prevState: {…}} //nextProps: {defaultColor: "red"}
                                                           prevState: {currentColor: "blue"}
 （获取从props导入的state值）                                 __proto__: Object

shouldComponentUpdate {nextProps: {…}, nextState: {…}, nextContext: {…}}//nextContext: {}
                                                                          nextProps: {defaultColor: "red"}
                                                                          nextState: {currentColor: "red"}
                                                                          __proto__: Object
render

getSnapshotBeforeUpdate {prevProps: {…}, prevState: {…}} //prevProps: {defaultColor: "blue"}
                                                           prevState: {currentColor: "blue"}
 （获取更新之前的props和state值）                                                          __proto__: Object

componentDidUpdate {prevProps: {…}, prevState: {…}, snapshot: null} //prevProps: {defaultColor: "blue"}
                                                                      prevState: {currentColor: "blue"}
                                                                      snapshot: null

```
3. 卸载
```
componentWillUnmount()
```

4. 错误处理
```
componentDidCatch()
```

















