import React from "react";
import {Switch,Route} from "react-router";
import StudyDemo from '../StudyDemo/index'

export default function SYScope(props){
    const {actions} = props
    return(
        <div className='scope_wrapper'>
            <Switch>
                <Route exact path={'/v2/syscope'} render={props=><StudyDemo {...props} actions={actions}/>}/>
            </Switch>
        </div>
    )

}