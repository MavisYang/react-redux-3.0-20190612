import React, {Component, useEffect, useReducer, useState} from "react";
import {getGroupsConversation, updateGroupsConversation} from "../Fetch";
import {EditRemarks, RemarksFilter, SetRemarks} from "./Hooks_UI";
import {Button} from "antd";

const remarksData = {
    0: {color: '#FFFFFF', name: '无'},
    5: {color: '#F16272', name: '红色'},
    4: {color: '#F0B276', name: '橙色'},
    3: {color: '#4173FF', name: '蓝色'},
    2: {color: '#6991CD', name: '蓝灰色'},
    1: {color: '#26BD8B', name: '绿色'}
}

export default class CustomHooks extends Component {
    state = {
        setStatus: false,
        selectType: '',
        editStatus: false,
        remarksList: undefined
    }

    componentDidMount() {
        getGroupsConversation().then(res => {
            let list = JSON.parse(res).resultContent
            this.setState({
                remarksList: list.filter(v => v.priority === 0).concat(list.filter(v => v.priority !== 0)).map(v => ({
                    ...v,
                    color: remarksData[v.priority].color,
                    placeholder: remarksData[v.priority].name,
                    name: v.name,
                    select: v.select ? v.select : false,
                    oneSelect: v.oneSelect ? v.oneSelect : false,
                }))
            })
        })
    }

    handleSave = (data) => {
        updateGroupsConversation(data).then(res => {
            console.log(JSON.parse(res));
            if (JSON.parse(res).resultCode === '100') {
                alert('保存成功')
            } else {
                alert('保存失败')
            }
            this.setState({editStatus: false})
        })
    }

    handleClose = () => {
        this.setState({
            setStatus: false
        })

    }

    handleFilter = (item) => {
        let {remarksList} = this.state
        this.setState({
            remarksList: remarksList.map(v => (v.id === item.id ? {...v, select: !v.select} : {...v, select: false}))
        })
    }


    handleSetIptValue = (value, id) => {
        let {remarksList} = this.state
        this.setState({
            remarksList: remarksList.map(v => (v.id === id ? {...v, name: value,} : {...v}))
        })
    }

    //设置单个人备注
    handleOneRemark = (regionId) => {
        let {remarksList} = this.state
        this.setState({
            setStatus: true,
            remarksList: remarksList.map(v => (v.id === regionId ? {...v, oneSelect: true} : {...v})),
            selectType: 'ONE'
        })
    }
    //设置单个人备注切换选择
    handleSetOneSelect = (item) => {
        let {remarksList} = this.state
        this.setState({
            remarksList: remarksList.map(v => (v.id === item.id ? {...v, oneSelect: !v.oneSelect} : {
                ...v,
                oneSelect: false
            }))
        })
    }

    render() {
        const {remarksList} = this.state
        return (<div>
                <Button onClick={() => {
                    this.setState({
                        remarksList: remarksList.map(v => ({...v, select: false}))
                    })
                }
                }>恢复初始值</Button>
                <RemarksFilter
                    remarksList={remarksList}
                    handleFilter={this.handleFilter}
                />
                <Button onClick={() => {
                    this.setState({
                        editStatus: true
                    })
                }
                }>点击编辑</Button>


                <Button onClick={() => {
                    this.handleOneRemark(remarksList[1].id)
                }
                }>设置单人备注</Button>

                <Button onClick={() => {
                    this.setState({
                        setStatus: true,
                        selectType: 'ALL',
                    })
                }
                }>移动到</Button>


                {
                    this.state.editStatus ? <EditRemarks
                        remarksList={remarksList}
                        hideEditHandle={() => {
                            this.setState({
                                editStatus: false
                            })
                        }}
                        handleSetIptValue={this.handleSetIptValue}
                        handleSave={this.handleSave}/> : null
                }

                {
                    this.state.setStatus ? <SetRemarks
                        selectType={this.state.selectType}
                        remarksList={remarksList}
                        handleClose={this.handleClose}
                        handleFilter={this.handleFilter}
                        handleSetOneSelect={this.handleSetOneSelect}/> : null
                }

            </div>
        )
    }
}

