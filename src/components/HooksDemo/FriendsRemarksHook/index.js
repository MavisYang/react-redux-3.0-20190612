import React, {Component, useEffect, useReducer, useState} from "react";
import {getGroupsConversation, updateGroupsConversation} from "../Fetch";
import {EditRemarks, RemarksFilter, SetRemarks} from "../FriendsRemarksClass/indexUI";
import {Button} from "antd";
import {RemarksReducer} from './Reducer'

const remarksData = {
    0: {color: '#FFFFFF', name: '无'},
    5: {color: '#F16272', name: '红色'},
    4: {color: '#F0B276', name: '橙色'},
    3: {color: '#4173FF', name: '蓝色'},
    2: {color: '#6991CD', name: '蓝灰色'},
    1: {color: '#26BD8B', name: '绿色'}
}
export default function FriendsRemarksHook() {
    const [state, dispatch] = useReducer(RemarksReducer, {
        list: []
    })
    const [editStatus, setEditStatus] = useState(false)
    const [setStatus, setSetStatus] = useState({status: false, type: ''})

    useEffect(() => {
        console.log('-----')
        getGroupsConversation().then(res => {
            let list = JSON.parse(res).resultContent
            dispatch({
                type: 'REMARKS_INIT',
                data: list.filter(v => v.priority == 0).concat(list.filter(v => v.priority !== 0)).map(v => ({
                    ...v,
                    color: remarksData[v.priority].color,
                    placeholder: remarksData[v.priority].name,
                    name: v.name,
                    select: v.select ? v.select : false,
                    oneSelect: v.oneSelect ? v.oneSelect : false,
                }))
            })
        })
    }, [])


    //刷新
    function handleFilter(item) {
        dispatch({
            type: 'FILTER',
            item
        })
    }

    function handleSetOneSelect(item) {
        dispatch({
            type:'ONE_SELECT',
            item
        })

    }

    function handleSetIptValue(value, id) {
        dispatch({
            type: 'CHANGE_IPT',
            value,
            id
        })
    }

    function handleSaveRemarks() {
        const saveList = state.list.map(v => ({
                id: v.id,
                priority: v.priority,
                status: 1,
                name: v.name
            })
        )
        updateGroupsConversation(saveList).then(res => {
            if (JSON.parse(res).resultCode === '100') {
                alert('保存成功')
            } else {
                alert('保存失败')
            }
            setEditStatus(false)
        })
    }


    const remarksList = state.list;
    return (
        <div>
            <Button onClick={() => {
                dispatch({
                    type: 'INIT',
                    data: remarksList.map(v => ({...v, select: false}))
                })
            }
            }>恢复初始值</Button>
            <RemarksFilter
                remarksList={remarksList}
                handleFilter={handleFilter}
            />
            <Button onClick={
                () => {
                    setEditStatus(true)
                }
            }>点击编辑</Button>

            <Button onClick={() => {
                setSetStatus({status: true, type: 'ONE'})
            }
            }>设置单人备注</Button>

            <Button onClick={() => {
                setSetStatus({status: true, type: 'ALL'})
            }}>移动到</Button>
            {
                editStatus ? <EditRemarks remarksList={remarksList}
                                          hideEditHandle={() => {
                                              setEditStatus(false)
                                          }}
                                          handleSetIptValue={handleSetIptValue}
                                          handleSaveRemarks={handleSaveRemarks}/> : null
            }

            {
                setStatus.status ? <SetRemarks remarksList={remarksList}
                                               selectType={setStatus.type}
                                               handleClose={() => {
                                                   setSetStatus({status: false, type: ''})
                                               }}
                                               handleSetOneSelect={handleSetOneSelect}
                                               handleFilter={handleFilter}/> : null
            }

        </div>
    )

}

