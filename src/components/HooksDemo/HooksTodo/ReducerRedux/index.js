import React,{} from "react";
import Buttons from "./Buttons";
import TextArea from "./TextArea";
import {Colors} from './Colors'


function ReducerRedux() {

    return(
        <div>
            <h1 style={{color:'red'}}>--useReducer代替Redux--</h1>
            <Colors>
                <Buttons/>
                <TextArea/>
            </Colors>

        </div>
    )
}

export default ReducerRedux;