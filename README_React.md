**2019.10.18**
[react中文文档](http://react.html.cn/docs/accessibility.html)


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