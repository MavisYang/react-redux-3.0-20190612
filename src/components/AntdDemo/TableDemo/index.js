import React, {Fragment, useState} from "react";
import LzcTable from "../../shareComponents/LzcTable";
import Checkbox from '../../shareComponents/Checkbox'

const optionsArray = [
    {label: '任务标题', value: '1', checked: true},
    {label: '发送时间', value: '2', checked: false},
    {label: '创建人', value: '3', checked: false},
    {label: '发送人', value: '4', checked: false},
    {label: '目标客户数', value: '5', checked: false},
    {label: '发送状态', value: '6', checked: false}
]

export default function TableDemo(props){
    const [options,setOptions] = useState(optionsArray)
    const [defaultValue,setDefaultValue] = useState(options.filter(v=>v.checked).map(v=>v.value))

    const handleChangeTh=(value)=>{
        setDefaultValue(value)
        let a = options.map(v => {
            let hasValue = value.findIndex(i => i == v.value)
            return {...v, checked: hasValue === -1 ? false : true}
        })
        setOptions(a)
    }

    function changeChecked(title){
        return options.find(v=>v.label===title).checked
    }

    const columns = [
        {
            title: '任务标题',
            dataIndex: 'title',
            key: 'title',
            className: !changeChecked('任务标题')&&'column_hidden',
            render: (title, record, index) => {
                return (
                    <span className='fgm_table_name'>
                        <span className="name">{title ? title : '--'}</span>
                        <span className="com-greenTips">{title}</span>
                    </span>
                )
            }
        },
        {
            title: '发送时间',
            dataIndex: 'sendingTimeStart',
            key: 'sendingTimeStart',
            className: !changeChecked('发送时间')&&'column_hidden',
            render: (sendingTimeStart, record, index) => {
                let time = record.sendingTime ? record.sendingTime : sendingTimeStart
                return <span className='fgmTableTime'>{time.slice(0, -3)}</span>
            }
        },
        {
            title: '创建人',
            dataIndex: 'creatorName',
            key: 'creatorName',
            className: !changeChecked('创建人')&&'column_hidden',
            render: (creatorName, record, index) => {
                return <span className='fgmTableCreater'>{creatorName}</span>
            }
        },
        {
            title: '发送人',
            dataIndex: 'sendUsers',
            key: 'sendUsers',
            className: !changeChecked('发送人')&&'column_hidden',
            render: (sendUsers, record, index) => {
                return <span className='fgmTableSend'>
                    <span className='fgmTableSendShow'>{sendUsers.length > 0 && sendUsers[0].wxUserName}</span>
                </span>
            }
        },
        {
            title: '目标客户数',
            dataIndex: 'targetUserCount',
            key: 'targetUserCount',
            className: !changeChecked('目标客户数')&&'column_hidden',
            render: (targetUserCount, record, index) => {
                return targetUserCount
            }
        },
        {
            title: '发送状态',
            dataIndex: 'status',
            key: 'status',
            className: !changeChecked('发送状态')&&'column_hidden',
            render: (status, record, index) => {
                if (status === 6) {
                    return <div className='waitSend'>待发送</div>
                } else if (status === 2) {
                    return <div className='sended'>已发送</div>
                } else if (status === 1) {
                    return <div className='sending'>发送中</div>
                }
            }
        }
    ]

    return(
        <Fragment>
            <Checkbox
                options={options}
                defaultValue={defaultValue}
                onChange={handleChangeTh}
            />
            <LzcTable
                columns={columns}
                loading={props.loading}
                dataSource={props.dataSource}/>
        </Fragment>
    )
}