/**
 * 创建时间:2018-08-29 15:23:54
 * 作者：sufei  Xerath
 * 邮箱：fei.su@gemii.cc
 * 版本号：1.0
 * @版权所有
 **/
// 带字数统计的input
import React, { Component } from 'react'
import './index.scss'

export default class IptLimit extends Component {
    constructor() {
        super();
        this.state = {
            iptNum: 0
        }
        this.iptChange = this.iptChange.bind(this);
        this.iptSet = this.iptSet.bind(this)
    }
    iptChange(e) {
        if (e.target.value.length <= this.props.maxLength) {
            this.setState({
                iptNum: e.target.value.length
            })
        } else {
            this.setState({
                iptNum: this.props.maxLength
            })
        }
        this.props.setparamsHandle(this.props.paramName, e.target.value);
    }
    iptSet(e) {
        let str = e.target.value.slice(0, this.props.maxLength)
        this.setState({
            iptNum: str.length
        });
        this.props.setparamsHandle(this.props.paramName, str,'blur');

    }
    componentDidMount() {
        this.setState({
            iptNum: this.props.value.length
        })
        const {autoFocus} = this.props
        autoFocus&&this.ipt.focus()
    }

    submitHandle = (e) => {
        if (e.keyCode == '13') {
            this.props.hideEditHandle&&this.props.hideEditHandle(e)
        }
    }

    render() {
        let { iptNum } = this.state
        let { label, placeholder, maxLength, widths, widthsLa, limitState, value, disabled, length, classNames,inputStyle } = this.props;
        return (
            <div className={`${classNames} IptLimit`}>
                {
                    label?
                    <div className="ipt-title" style={widthsLa}>
                        {
                            limitState ? <span className="resTxt">*</span> : ''
                        }
                        {label}
                    </div>
                    :null
                }
                <div className={disabled ? "content disabled" : "content"} style={widths}>
                    <input ref ={el => this.ipt=el} className="input" type="text" style={inputStyle} value={value} maxLength={maxLength} placeholder={placeholder} onChange={this.iptChange} disabled={disabled} onBlur={this.iptSet} onKeyDown={this.submitHandle} />
                    <span className="num">{length ? length : iptNum}/{maxLength}</span>
                </div>
            </div>
        )
    }
}
