import React,{Component,Fragment} from "react";
import {Switch,Route} from "react-router";
import TodoList from '../TestDemo/TodoList/index'

export default class TDScope extends Component{

    render() {
        const {actions,todosReducer} = this.props
        return(
           <div className='scope_wrapper'>
               <Switch>
                   <Route exact path={'/v2/tdscope/build/id:?/type:?'} render={props=><TodoList {...props} actions={actions}/>}/>
                   <Route exact path={'/v2/tdscope'} render={props=><TodoList {...props} actions={actions} todosReducer={todosReducer}/>}/>
               </Switch>
           </div>
        )
    }

}