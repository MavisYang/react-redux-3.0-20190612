
[react中文文档](http://react.html.cn/docs/accessibility.html)

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
- 高阶组件
- UI组件：只展示样式
- 逻辑层组件：做数据处理

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






