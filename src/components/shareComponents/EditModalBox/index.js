// 编辑框，有按钮
import React, { Component } from 'react'
import './index.scss'
import ButtonBox from '../ButtonBox'

export default class EditModalBox extends Component {
    render() {
        const { leftTxt, leftBtnHandle, leftBtnStyleName, rightTxt, rightBtnHandle, rightBtnStyleName, closeHandle, modalTitle, modalClassName, tips, showLeftBtn,hideButton } = this.props
        // console.log(showLeftBtn);
        return (
            <div className='modalWrapper'>
                <div className={`modalBox lzc-editModalBox ${modalClassName}`}>
                    <div className="title">
                        {modalTitle}
                        {tips}
                    </div>
                    {this.props.children}
                    {
                        !hideButton
                        ?<div className="buttonArea">
                            <ButtonBox
                                btnTxt={rightTxt}
                                isCancel={false}
                                btnFunc={rightBtnHandle}
                                styleName={rightBtnStyleName}
                                btnStyle={{
                                    float: "right",
                                    margin: "10px 32px 0px 0px"
                                }}
                            />
                            {
                                showLeftBtn ?
                                    <ButtonBox
                                        btnTxt={leftTxt}
                                        isCancel={true}
                                        btnFunc={leftBtnHandle}
                                        styleName={leftBtnStyleName}
                                        btnStyle={{
                                            float: "right",
                                            margin: "10px 10px 0px 0px"
                                        }}
                                    /> : ''
                            }
                        </div>:''
                    }
                    <div className="closeBtn" onClick={closeHandle ? closeHandle : leftBtnHandle}></div>
                </div>
            </div>
        )
    }
}

EditModalBox.defaultProps = {
    showLeftBtn: true,
    leftTxt: '取 消',
    leftBtnStyleName: 'middleBtn gray',
    rightTxt: '确 定',
    rightBtnStyleName: 'middleBtn confirm',
    modalTitle: '',
    modalClassName: ''
}