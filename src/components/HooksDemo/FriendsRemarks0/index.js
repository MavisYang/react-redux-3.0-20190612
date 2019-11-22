/*
 * @Author: yangmiaomiao
 * @Date: 2019-11-18 13:58:02
 * @LastEditors: yangmiaomiao
 * @LastEditTime: 2019-11-21 16:36:41
 * @Description: 
 */
import React, {useEffect, Fragment} from "react";
import EditModalBox from "../../shareComponents/EditModalBox";
import IptLimit from '../../shareComponents/IptLimit'
import './index.scss'

//备注筛选查询
export function RemarksFilter(props) {
    const {remarksList, handleFilter} = props
    return (
        <div className='mm_remarks_filter'>
            筛选:
            {
                remarksList.map(item => {
                    return <div key={item.id}
                                className={`remarks_circle ${'remarks_circle_' + item.priority} ${item.select ? 'remarks_circle_selected' : ''}`}
                                style={{backgroundColor: item.color}}
                                onClick={() => {
                                    handleFilter(item)
                                }}>
                        {
                            item.priority != 0 && item.select ? <em className='rf_circle_selected'></em> : null
                        }
                        <span className='remarks_name'>{item.name !== '' ? item.name : item.placeholder}</span>
                    </div>
                })
            }
        </div>
    )
}

// 编辑筛选备注 begin
export function EditRemarks(props) {
    const {remarksList, hideEditHandle, handleSave, handleSetIptValue} = props
    return (
        <EditModalBox
            modalTitle={'编辑筛选备注'}
            modalClassName={'EditRemarks'}
            rightTxt={'保存'}
            rightBtnHandle={handleSave}
            leftBtnHandle={hideEditHandle}
            closeHandle={hideEditHandle}
        >
            <div className='mm_editRemarks'>
                {remarksList.filter(v => v.priority !== 0).map(v => (
                    <InputItem key={v.id} item={v} handleSetIptValue={handleSetIptValue}/>))}
            </div>
        </EditModalBox>

    )

}

const InputItem = ({item, handleSetIptValue}) => {
    return (<div className='input_row'>
        <span className='remarks_circle' style={{background: item.color}}/>
        <IptLimit
            classNames={'input_row_input'}
            maxLength={8}
            setparamsHandle={(name, value) => {
                handleSetIptValue(value, item.id)
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
export function SetRemarks(props) {
    const {selectType, remarksList, handleFilter, handleSetOneSelect} = props
    useEffect(() => {
        document.addEventListener('click', props.handleClose)
        return () => {
            document.removeEventListener('click', props.handleClose)
        }
    }, [])
    return (
        <div className='mm_setRemarks_box' onClick={e => e.nativeEvent.stopImmediatePropagation()}>
            {
                selectType === 'ALL' ?
                    <Fragment>
                        {
                            remarksList.map(item => (
                                <div key={item.id} className={`mm_setRemarks_item ${item.select ? 'active' : ''}`}
                                     onClick={() => {
                                         handleFilter(item)
                                     }}>
                                    <em className={`${item.select ? 'sr_circle_selected' : 'sr_circle'}`}/>
                                    <span className={'remarks_circle remarks_circle_' + item.priority}
                                          style={{background: item.color}}/>
                                    <span>{item.name !== '' ? item.name : item.placeholder}</span>
                                </div>))
                        }
                    </Fragment>
                    :
                    <Fragment>
                        {
                            remarksList.map(item => (
                                <div key={item.id} className={`mm_setRemarks_item ${item.oneSelect ? 'active' : ''}`}
                                     onClick={() => {
                                         handleSetOneSelect(item)
                                     }}>
                                    <em className={`${item.oneSelect ? 'sr_circle_selected' : 'sr_circle'}`}/>
                                    <span className={'remarks_circle remarks_circle_' + item.priority}
                                          style={{background: item.color}}/>
                                    <span>{item.name !== '' ? item.name : item.placeholder}</span>
                                </div>))
                        }
                    </Fragment>
            }

        </div>
    )
}



