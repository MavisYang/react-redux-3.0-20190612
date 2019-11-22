/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-05 16:44:51
 * @LastEditTime: 2019-08-29 18:36:41
 * @LastEditors: Please set LastEditors
 */
import React, {Component} from 'react'
import './index.scss'

export default class ButtonBox extends Component {
    constructor() {
        super();
        this.btnFunction = this.btnFunction.bind(this);
    }
    btnFunction(e){
        this.props.btnFunc(e);
    }
    render() {
        let {btnTxt, isCancel,btnStyle,isDelete, styleName, children,downloadIcon} = this.props;
        return (
            <div
                className={styleName ? `ButtonBox ${styleName}`: isCancel ? 'ButtonBox cancel' : isDelete?'ButtonBox delete':'ButtonBox confirm'}
                onClick={this.btnFunction}
                style={btnStyle}
            >
                {
                    styleName=="downloadBtn"?<em></em>:''
                }
                {
                    styleName=="uploadBtn"?<em></em>:''
                }
                {
                    children?
                    children
                    :''
                }
                {btnTxt}
            </div>
        )
    }
}

/**
 * <ButtonBox
 * btnTxt={cancelTxt} //按钮文本
 * btnStyle={{}} //按钮样式 默认108*36
 * isCancel={true} //是否是取消类型的按钮 true是 false不是
 * btnFunc={this.closeModal} //按钮触发函数
 * isDelete={true} //是否删除按钮
 * />
 */