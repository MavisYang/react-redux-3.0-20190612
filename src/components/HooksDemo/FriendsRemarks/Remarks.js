import React, {Component, useEffect, useReducer, useState} from "react";
import {getGroupsConversation,updateGroupsConversation} from "../Fetch";
import {EditRemarks, RemarksFilter, SetRemarks} from "./index";
import {Button} from "antd";
import {RemarksReducer} from './index'

export default function RemarksHooks() {
    const [state,dispatch] = useReducer(RemarksReducer)

    const [editStatus,setEditStatus] = useState(false)

    useEffect(()=>{
        console.log('-----')
        getGroupsConversation().then(res => {
            dispatch({
                type:'REMARKS_INIT',
                data:JSON.parse(res).resultContent
            })
        })
    },[])

    function handleSave(data) {
        updateGroupsConversation(data).then(res => {
            console.log(JSON.parse(res));
            if(JSON.parse(res).resultCode==='100'){
                alert('保存成功')
            }else {
                alert('保存失败')
            }
            setEditStatus(false)
        })
    }
    return(
        <div>
            <RemarksFilter
                // remarksList={this.state.remarksList}
            />
            <Button onClick={
                () => {
                    setEditStatus(true)
                }
            }>点击编辑</Button>
            {
                editStatus ? <EditRemarks remarksList={this.state.remarksList}
                                                     hideEditHandle={() => {
                                                         setEditStatus(false)
                                                     }}
                                                     handleSave={handleSave}/> : null
            }

            {/*{*/}
            {/*    this.state.setStatus ? <SetRemarks remarksList={this.state.remarksList}*/}
            {/*                                       handleClose={this.handleClose}*/}
            {/*                                       handleFilter={this.handleFilter}/> : null*/}
            {/*}*/}

        </div>
    )

}

// export default class RemarksHooks extends Component {
//
//     constructor(props) {
//         super(props)
//         this.state = {
//             editStatus: false,
//             remarksList: [],
//             setStatus: false,
//
//         }
//     }
//
//
//     componentDidMount() {
//         getGroupsConversation().then(res => {
//             this.setState({
//                 remarksList: JSON.parse(res).resultContent
//             })
//         })
//     }
//
//     handleSave = (data) => {
//         updateGroupsConversation(data).then(res => {
//             console.log(JSON.parse(res));
//             if(JSON.parse(res).resultCode==='100'){
//                 alert('保存成功')
//             }else {
//                 alert('保存失败')
//             }
//             this.handleClose()
//         })
//
//     }
//     handleClose = () => {
//         this.setState({
//             setStatus: false
//         })
//
//     }
//
//     handleFilter = (data) => {
//         console.log(data, '搜索')
//     }
//
//     render() {
//         return (<div>
//             <RemarksFilter
//                 remarksList={this.state.remarksList}
//             />
//             <Button onClick={
//                 () => {
//                     this.setState({
//                         editStatus: true
//                     })
//                 }
//             }>点击编辑</Button>
//
//
//             <Button onClick={
//                 () => {
//                     this.setState({
//                         setStatus: true
//                     })
//                 }
//             }>点击设置</Button>
//
//             <Button onClick={
//                 () => {
//                     this.setState({
//                         setStatus: true
//                     })
//                 }
//             }>移动到</Button>
//
//
//             {
//                 this.state.editStatus ? <EditRemarks remarksList={this.state.remarksList}
//                                                      hideEditHandle={() => {
//                                                          this.setState({
//                                                              editStatus: false
//                                                          })
//                                                      }}
//                                                      handleSave={this.handleSave}/> : null
//             }
//
//             {/*{*/}
//             {/*    this.state.setStatus ? <SetRemarks remarksList={this.state.remarksList}*/}
//             {/*                                       handleClose={this.handleClose}*/}
//             {/*                                       handleFilter={this.handleFilter}/> : null*/}
//             {/*}*/}
//
//         </div>)
//     }
// }