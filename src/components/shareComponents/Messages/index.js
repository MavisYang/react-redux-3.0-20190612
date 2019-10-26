import React,{Component} from "react";
import ReactDOM from 'react-dom'
import {TransitionGroup,CSSTransition} from 'react-transition-group'
// import {sendEvent} from "../../../funStore/CommonFun";

const modalRoot = document.getElementById('msg-root');
class Modal extends Component {
    constructor(props) {
        super(props);
        let el =  document.createElement('div')
        el.className = 'msg-modal'
        this.el = el
    }
    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        )
    }
}

class Message extends Component {
    constructor(props){
        super(props)
        this.state = {
            duration: props.duration,
            isShow: false
        }
    }
    componentDidMount (){
        const {duration,onHide,msgId} = this.props
        if(duration>0){
            setTimeout(()=>{
                onHide(msgId)
            },duration)
        }
    }
    render(){
        const {msgId,text,status,index} = this.props
        const iconArr = {
            1000:'msg-success',
            1001: 'msg-warn',
            1003: 'msg-warn',
            1004: 'msg-error'
        }
        return (
            <div className={`message ${iconArr[status]}`}>
                <span className='icon-msg'></span>
                {text}
            </div>
        )
    }
}

Message.defaultProps={
    duration: 2000 //延时
}
export default class Messages extends Component {
    constructor(props){
        super(props)
        this.state = {
            messageList: []
        }
    }
    componentDidMount(){
        window.addEventListener('message',this.onShow)
    }
    componentWillUnmount(){
        window.removeEventListener('message',this.onShow)
    }
    onShow = (event) => {
        // console.log(event,'event')
        if(event.vals){
            let {code,txt,timer} = event.vals
            let newMsg = {
                text:txt,
                duration:timer,
                status:code,
                msgId: new Date().getTime()
            }
            let {messageList} = this.state
            messageList.push(newMsg)
            this.setState({messageList})
        }
    }

    onHide = (msgId) =>{
        this.setState({
            messageList: this.state.messageList.filter(v => v.msgId!== msgId)
        })
    }
    render(){
        const {messageList} = this.state
        return (
            <Modal>
                <TransitionGroup className="msg-list">
                    {
                        messageList.map((v,i) => (
                            <CSSTransition
                                key={v.msgId}
                                timeout={500}
                                classNames="msg-item"
                            >
                                <Message
                                    key={v.status}
                                    index={i}
                                    text={v.text}
                                    duration={v.duration}
                                    msgId={v.msgId}
                                    status={v.status}
                                    onHide={this.onHide}
                                />
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup>
            </Modal>
        )
    }
}
// 参数
// txt: string, 文本
// duration: number, 单位 ms
// code: number, 1000 成功 1001 普通 1003 警告 1004 错误
// onHide: func, 关闭时回调函数
//引用： sendEvent("message",{txt:'不能超出10个长度',code:1003})
