/*
 * @Author: yangmiaomiao
 * @Date: 2019-11-18 13:58:02
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2019-11-21 16:36:41
 * @Description:
 */
import React, {useEffect,useState} from "react";
import EditModalBox from "../../shareComponents/EditModalBox";
import IptLimit from '../../shareComponents/IptLimit'
import '../FriendsRemarksClass/index.scss'

const remarksData = {
    0: {color: '#FFFFFF', name: '无'},
    5: {color: '#F16272', name: '红色'},
    4: {color: '#F0B276', name: '橙色'},
    3: {color: '#4173FF', name: '蓝色'},
    2: {color: '#6991CD', name: '蓝灰色'},
    1: {color: '#26BD8B', name: '绿色'}
}

// 编辑筛选备注 begin
export function EditRemarks(props) {
    const [list, setList] = useState(props.remarksList.filter(v => v.priority != 0).map(v => ({
        ...v,
        placeholder: remarksData[v.priority].name,
        color: remarksData[v.priority].color
    })))

    const handleSetList = (value, id) => {
        let netList = list.map(v => (v.id == id ? {...v, name: value,} : {...v}))
        setList(netList)

    }

    const handleSaveRemarks = () => {
        const saveList = list.map(v => ({
                id: v.id,
                priority: v.priority,
                status: 1,
                name: v.name
            })
        )
        console.log(saveList, 'saveList')
        props.handleSave(saveList)

    }
    return (
        <EditModalBox
            modalTitle={'编辑筛选备注'}
            modalClassName={'EditRemarks'}
            rightTxt={'保存'}
            rightBtnHandle={() => handleSaveRemarks()}
            leftBtnHandle={props.hideEditHandle}
            closeHandle={props.hideEditHandle}
        >
            <div className='mm_editRemarks'>
                {list.map(v => (<InputItem key={v.id} item={v} handleSetList={handleSetList}/>))}
            </div>
        </EditModalBox>

    )

}

const InputItem = ({item, handleSetList}) => {
    return (<div className='input_row'>
        <span className='remarks_circle' style={{background: item.color}}/>
        <IptLimit
            classNames={'input_row_input'}
            maxLength={8}
            setparamsHandle={(name, value) => {
                handleSetList(value, item.id)
            }}
            placeholder={item.placeholder}
            value={item.name}
            length={item.name.length}
            widths={{width: '202px'}}
            inputStyle={{paddingLeft: '12px', width: '172px'}}
        />
    </div>)
}

//设置会话备注
//设置某一个人的备注时，会话列表返回regionId ，remarksList=remarksList.map(v=>(v.id==regionId?{...v,select:true}:{...v,select:false}))
export function SetRemarks(props) {
    const [remarksList, handleSelect] = useRemarks(props.remarksList)

    useEffect(()=>{
        document.addEventListener('click',props.handleClose)
        return()=>{
            document.removeEventListener('click',props.handleClose)
        }
    },[])
    return (
        <div className='mm_setRemarks_box' onClick={e=>e.nativeEvent.stopImmediatePropagation()}>
            {
                remarksList.map(item => (<div key={item.id} className='mm_setRemarks_item' onClick={() => {
                    handleSelect(item)
                    let _regionId = item.priority == 0 ? '' : !item.select ? item.id : ''
                    console.log(_regionId, '_regionId')
                    props.handleFilter(_regionId)
                }}>
                    <em className={`${item.select?'sr_circle_selected':'sr_circle'}`}/>
                    <span className={'remarks_circle remarks_circle_' + item.priority} style={{background: item.color}}/>
                    <span>{item.name}</span>
                </div>))
            }
        </div>
    )
}

//备注筛选查询
export function RemarksFilter(props) {
    const [remarksList, handleSelect] = useRemarks(props.remarksList.map(v => (v.priority == 0 ? {...v, select: true} : {...v})))
    return (
        <div className='mm_remarks_filter'>
            筛选:
            {
                remarksList.map(item => {
                    return <div key={item.id}
                                className={`remarks_circle ${'remarks_circle_' + item.priority} ${item.select ? 'remarks_circle_selected' : ''}`}
                                style={{backgroundColor: item.color}}
                                onClick={() => {
                                    handleSelect(item)
                                    let _regionId = item.priority == 0 ? '' : !item.select ? item.id : ''
                                    console.log(_regionId, '_regionId')
                                    props.handleFilter(_regionId)
                                }}>
                        {
                            item.priority != 0 && item.select ? <em className='rf_circle_selected'></em> : null
                        }
                        <span className='remarks_name'>{item.name}</span>
                    </div>
                })
            }
        </div>
    )
}

//自定义hooks
function useRemarks(remarksList) {
    const [list, setList] = useState(remarksList.filter(v => v.priority == 0).concat(remarksList.filter(v => v.priority !== 0)).map(v => ({
        ...v,
        color: remarksData[v.priority].color,
        name: v.name == '' ? remarksData[v.priority].name : v.name,
        select: v.select ? v.select : false
    })))


    const handleSelect = (item) => {
        let newList = list.map(v => (v.id === item.id ? {...v, select: !v.select} : {...v, select: false}))
        setList(newList)
    }
    return [list, handleSelect]
}

/**设置会话备注
 <SetRemarks
 remarksList={remarksList}
 handleClose={this.handleClose}
 handleFilter={this.handleFilter}
 />
 * */

/**筛选
 <RemarksUi
 remarksList={remarksList}
 handleFilter={this.handleFilter}
 />

 */

/**编辑筛选备注
 <EditRemarks
 remarksList={remarksList}
 hideEditHandle={this.hideEditHandle}
 handleSave={this.handleSave}
 />
 * */