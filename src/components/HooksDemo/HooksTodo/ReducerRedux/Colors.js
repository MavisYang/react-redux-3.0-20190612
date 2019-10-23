import React, {useReducer} from "react";
import {ColorContext} from '../UseContext'
import {ColorReducer} from '../UseReducers/colorReducer'
export const Colors = props =>{
    const [color,dispatch] = useReducer(ColorReducer,'blue')

    return(
        <ColorContext.Provider value={{color,dispatch}}>
            {props.children}
        </ColorContext.Provider>
    )

}
