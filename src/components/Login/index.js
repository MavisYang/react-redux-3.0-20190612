import React,{Component} from "react";
import { Icon, Input, Button } from 'antd'
import {Link} from "react-router-dom";
import './index.scss'

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            params:{
                username:'',
                password:''
            }
        }
    }

    onChange=(e,name)=>{
        // console.log(e.target.value)
        let {params} = this.state
        params[name] = e.target.value
        this.setState({
            params
        })
    }
    handleLogin=()=>{
        let {params} = this.state
        if(params.username!==''&&params.password!==''){
            this.props.actions.goTo('/v2/tdscope')
        }
    }

    render() {
        const {params} = this.state
        return(
            <div className={'login-containter'}>
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="username"
                    value={params.username}
                    onChange={(e)=>this.onChange(e,'username')}
                />
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    value={params.password}
                    onChange={(e)=>this.onChange(e,'password')}

                />
                <Button type="primary" className={`login-form-button ${params.username!==''&&params.password!==''?'active':''}`}
                        onClick={()=>this.handleLogin()}
                >
                    Log in
                </Button>
                <Link to={'/v2/tdscope'}>
                    <span>go to login</span>
                </Link>
            </div>


        )
    }
}