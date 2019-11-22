import React, {useState} from "react";
import {Button,Input} from 'antd'
import {useKeys,useContactModel} from './Hooks'
import React_1120 from './React_1120'
export default function React_1114() {

    return(
        <div className='container'>
            <h3>自定义Hook</h3>
            <ul>
                <li>
                    <h4>自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。</h4>
                </li>
            </ul>

            <ContactList/>
            <React_1120/>
        </div>
    )

}

//单个Ui列表
function Contact({onRemove}) {
    let modal = useContactModel()

    return(
        <div>
            <p>
                name: <Input {...modal.inputProps.name} style={{width:'200px',marginRight:'20px'}} />
                email: <Input {...modal.inputProps.email} style={{width:'200px',marginRight:'20px'}} />
                <Button onClick={onRemove}>remove</Button>
            </p>
        </div>
    )
}

//Contact list
function ContactList() {
    let [keys,add,remove] = useKeys(1)

    return(
        <>
            {
              keys.map((item,i)=>(<Contact key={item}  onRemove={()=>remove(item)}/>))
            }
            <Button onClick={add}>add</Button>
        </>
    )

}