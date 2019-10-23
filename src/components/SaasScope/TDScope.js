import React,{Component,Fragment} from "react";
import {Switch,Route} from "react-router";
import TodoHooksDemo from '../HooksDemo'
import HooksDemo from '../HooksDemo/HooksTodo/HooksDemo'

export default class TDScope extends Component{

    render() {
        const {actions,todosReducer} = this.props
        return(
           <div className='scope_wrapper'>
               <Switch>
                   <Route exact path={'/v2/tdscope'} render={props=><TodoHooksDemo {...props} actions={actions} todosReducer={todosReducer}/>}/>
                   <Route path={'/v2/tdscope/hooks'} render={props=><HooksDemo {...props} actions={actions}/>}/>
               </Switch>
           </div>
        )
    }

}