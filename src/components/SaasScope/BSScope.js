import React,{Component,Fragment} from "react";
import {Switch,Route} from "react-router";
import BooksJs from "../BooksCom/BooksJs";

export default class BSScope extends Component{

    render() {
        const {actions} = this.props
        return(
           <div className='container'>
               <Switch>
                   <Route exact path={'/v2/bookscope'} render={props=><BooksJs {...props} actions={actions}/>}/>
               </Switch>
           </div>
        )
    }

}