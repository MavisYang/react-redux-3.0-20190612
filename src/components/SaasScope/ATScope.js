import React, { createContext, useContext} from "react";
import {Switch,Route} from "react-router";
import AntdDemo from "../AntdDemo";

//1.创建context 通过value传值
export const AntdContext = createContext()

export default function ATScope(props){

    const {actions} = props
    return(
        <div className='scope_wrapper'>
            <Switch>
                <AntdContext.Provider value={actions} >
                    <Route exact path={'/v2/antd'} render={props=><AntdDemo {...props} actions={actions}/>}/>
                </AntdContext.Provider>
            </Switch>
        </div>
    )

}