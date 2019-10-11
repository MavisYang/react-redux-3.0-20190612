import React from "react";

 //无状态组件，直接收传入的props值，不做逻辑处理
 const TodoListUi = (props)=>{
     return(
         <div>
             {props}
         </div>
     )
 }


 export default TodoListUi;