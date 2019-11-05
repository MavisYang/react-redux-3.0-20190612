import React, {Component, Fragment, PureComponent, useEffect, useMemo} from "react";
import {Button} from "antd";

const createMarkup = (innerHTML) => {
    return {__html: innerHTML};
}
export default class React_1025 extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            defaultColor: 'blue',
            showStatus:false
        }
    }

    handleShowStatus = () =>{
        this.setState({showStatus:true})
    }

    handleHideStatus= () =>{
        this.setState({showStatus:false})
    }


    render() {
        // console.log(this.props)
        const { defaultColor,showStatus} = this.state
        return (
            <React.Fragment>
                <h2>2019.09.25</h2>
                <div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}}/>
                <h3>生命周期</h3>
                <Button onClick={this.handleShowStatus}>显示隐藏div</Button>
                {
                    showStatus &&<Modal  showStatus={showStatus}
                                         handleHideStatus={this.handleHideStatus}/>
                }
                {/*<TheLifeCycle defaultColor={defaultColor}/>*/}
                <Button onClick={() => {
                    this.setState({
                        defaultColor: defaultColor === 'blue' ? 'red' : 'blue'
                    })
                }} style={{color: defaultColor}}>change color</Button>

            </React.Fragment>
        )
    }
}

React_1025.defaultProps = {
    defaultColor:'blue'
}

const Modal = (props)=>{
    useEffect(()=>{
        console.log('useEffect=componentDidMount')
        document.addEventListener('click',props.handleHideStatus)
        return()=>{
            console.log('useEffect=componentWillUnmount')
            document.removeEventListener('click',props.handleHideStatus)
        }
    },[])



    const handleConsole =()=>{
        console.log(props.showStatus,'showStatus')
    }

    useMemo(()=> handleConsole(), [])

    return(
        <div className='fadeIn' style={{height:'100px'}} onClick={(e)=>e.nativeEvent.stopImmediatePropagation()}>
            隐藏的div {props.showStatus}
        </div>
    )
}

class TheLifeCycle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentColor: props.defaultColor,
            status:false
        }
        console.log('constructor')
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log('getDerivedStateFromProps',{nextProps, prevState})
        //nextProps: {defaultColor: "red"}
        //prevState: {currentColor: "blue"}
        if (nextProps.defaultColor !== prevState.currentColor) {
            return {currentColor: nextProps.defaultColor}
        }
        return null
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('shouldComponentUpdate',{nextProps, nextState, nextContext})
        return true
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate',{prevProps, prevState})
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('componentDidUpdate',{prevProps, prevState, snapshot})
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')

    }

    componentDidMount() {
        console.log('componentDidMount')

    }

    render() {
        const {currentColor,status} = this.state
        console.log('render')
        return (
            <Fragment>
                <div style={{color: currentColor}}>TheLifeCycle</div>
                <div>
                    1. 初始化 <br/>
                    constructor <br/>
                    getDerivedStateFromProps <br/>
                    render <br/>
                    componentDidMount <br/>
                    2. 更新(父组件改变，子组件跟着改变/子组件改变state值) <br/>
                    getDerivedStateFromProps{/*（获取从props导入的state值）*/}<br/>
                    shouldComponentUpdate <br/>
                    render<br/>
                    getSnapshotBeforeUpdate {/*（获取更新之前的props和state值）*/}<br/>
                    componentDidUpdate<br/>
                    3. 卸载<br/>
                    componentWillUnmount()<br/>
                    4. 错误处理<br/>
                    componentDidCatch()<br/>
                </div>
                <Button style={{marginTop:'10px',marginBottom:'10px'}} onClick={()=>{
                    this.setState({status:!status})
                }}>status</Button>
            </Fragment>
        )
    }
}




