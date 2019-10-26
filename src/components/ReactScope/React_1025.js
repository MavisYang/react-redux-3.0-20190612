import React, {Component, Fragment, PureComponent} from "react";
import {Button} from "antd";
const createMarkup=(innerHTML)=> {
    return {__html: innerHTML};
}
export default class React_1025 extends PureComponent{
    constructor(props){
        super(props)
        this.state={
            list:[
                {
                    name:'mavis',
                    age:18
                }
            ]
        }
    }


    render() {
        // console.log(this.props)
        const {list} =this.state
        return(
            <React.Fragment>
                <h2>2019.09.25</h2>
                <div dangerouslySetInnerHTML={{__html: 'First &middot; Second'}}/>
                <h3>生命周期</h3>
                <TheLifeCycle/>
            </React.Fragment>
        )
    }
}

class TheLifeCycle extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }

    static getDerivedStateFromProps(nextProps, prevState){

    }

    componentWillUnmount() {
    }

    UNSAFE_componentWillMount() {
    }

    componentDidMount() {
    }


    render() {

        return(
            <div>


            </div>
        )
    }
}




