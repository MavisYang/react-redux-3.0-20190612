import React,{Component,Fragment} from "react";
import {Switch,Route} from "react-router";
import JavaScript from "../BooksCom/BooksJs/JavaScript";
import BooksJs from "../BooksCom/BooksJs";
import {Link} from "react-router-dom";
import {Button} from "antd";

const navList = [
    {
        name:'JavaScript',
        code:'JavaScript',
        path:'/v2/bookscope/books/js'
    },



]

const judgeByCodeFunc=()=>{
    if(window.location.pathname.includes('/v2/bookscope/books/js')){
        return 'JavaScript'
    }
    else if(window.location.pathname.includes('/v2/bookscope/books/es6')){
        return 'es6'
    }
    return null;
}
export default class BSScope extends Component{

    render() {
        const {actions} = this.props
        let judgeByCode = judgeByCodeFunc()
        return(
           <div className='container'>
               {/*{*/}
               {/*    navList.map(v=>{*/}
               {/*        return <Link key={v.code} to={v.path}>*/}
               {/*            <Button type={judgeByCode&&judgeByCode===v.code?'primary':''} style={{marginRight:'10px',marginBottom:'20px'}}>{v.name}</Button>*/}
               {/*        </Link>*/}
               {/*    })*/}
               {/*}*/}
               <Switch>
                   <Route exact path={'/v2/bookscope'} render={props=><BooksJs {...props} actions={actions}/>}/>
                   <Route path={'/v2/bookscope/books/js'} render={props=><JavaScript {...props} actions={actions}/>}/>
               </Switch>
           </div>
        )
    }

}