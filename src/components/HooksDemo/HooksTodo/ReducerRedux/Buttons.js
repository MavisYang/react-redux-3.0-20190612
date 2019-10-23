import React, {useContext} from "react";
import {Button} from "antd";
import {ColorContext} from '../UseContext'
import {UPDATE_COLOR} from '../actions/actionsTypes'
//==== 通过reducer动态改变颜色
function Buttons() {
    const {dispatch} = useContext(ColorContext)

    function changeColor(color){
        dispatch({
            type:UPDATE_COLOR,
            color:color
        })
    }
    return(
        <div>
            <Button onClick={()=>changeColor('red')}>红色</Button>
            <Button onClick={()=>changeColor('pink')}>粉色</Button>
        </div>
    )

}

export default Buttons;