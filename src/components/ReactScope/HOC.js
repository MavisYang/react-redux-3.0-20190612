import React, {Component} from "react";

//高阶组件定义
const HOC = (WrappedComponent) =>{
    return class WrapperComponent extends Component{
        componentDidMount() {
            console.log('componentDidMount')
        }

        render() {
            // 用容器组件组合包裹组件且不修改包裹组件，这才是正确的打开方式。
            // 向包裹组件传递props属性
            return <WrappedComponent {...this.props}/>
        }
    }
}
//普通的组件
class WrappedComponent extends Component{

    render(){
        const {value} = this.props
        console.log(this.props,'this.props')
        return(
            <div>{value}:用于高阶组件的普通组件内容</div>
        )
    }
}
//高阶组件使用
export default HOC(WrappedComponent)