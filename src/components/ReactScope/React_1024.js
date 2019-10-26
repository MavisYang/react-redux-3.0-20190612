import React, {Component,PureComponent, Fragment, useState} from "react";
import {Button} from "antd";


export default function React_1024() {

    const [story,setStory] = useState('photo')
    const handleChangeStory=()=>{
        setStory(story ==='photo'?'video':'photo')
    }

    return <Fragment>
        <h2>2019.09.24</h2>
        <h3>form表单 ：非受控组件和受控组件</h3>
        <RefInput name={'form表单 ：非受控组件和受控组件'}/>

        <h3>JSX:点表示法</h3>
        <MyComponents.DatePicker color={'blue'}/>

        <h3>通过属性值条件渲染组件</h3>
        <Button onClick={handleChangeStory}>change story</Button>
        <Story story={story}/>

        <h3>return [] 数组就是一个map遍历，需要加key {[]}</h3>
        <ListOfTenThings/>

        <h3>通过React.createRef()使用refs</h3>
        <RefsCom/>
    </Fragment>
}




//不要过度使用refs
class RefsCom extends PureComponent{
    constructor(props){
        super(props)
        //===1 创建
        this.myRef = React.createRef()
    }

    getRefsCurrent = () =>{
        //====2 访问Refs
        const node = this.myRef.current
        this.myRef.current.focus()
        console.log(node.type,'type')
        console.log(node.name,'name')
        console.log(node.value,'value')
    }

    render() {
        return <div >
            如何使用refs
            {/*ref={(input) => this.input = input}*/}
            <input type="text"  ref={this.myRef} name={'txtInput'}/>
            <Button onClick={this.getRefsCurrent}>获得ref的值</Button>
        </div>
    }
}


// Calls the children callback numTimes to produce a repeated component
function ListOfTenThings() {
    return (
        <Repeat numTimes={5}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
        </Repeat>
    );
}

function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
        items.push(props.children(i));
    }
    console.log(items,'items')
    return <div>{items}</div>;
}

//====通过属性值条件渲染组件 begin ====
function Story(props) {
    const SpecificStory = components[props.story]
    return <SpecificStory {...props}/>
}
const components = {
    photo: PhotoStory,
    video: VideoStory
}

function PhotoStory(props) {
    console.log(props,'props-1')
    return <div>PhotoStory</div>
}
function VideoStory(props) {
    // console.log(props,'props-2')
    return <div>VideoStory</div>
}

const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div style={{color:props.color}}>Imagine a {props.color} datepicker here.</div>;
    }
}
//====通过属性值条件渲染组件 end ====

//非受控组件和受控组件
class RefInput extends Component {
    constructor(props){
        super(props)
    }
    state = {
        name:this.props.name,
        nickName:'',
        checkbox:true
    };
    handleSubmit = (e) => {
        console.log('ref-input--', this.input.value)
        e.preventDefault()
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo,'error, errorInfo')
    }

    handleInputChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.type === 'checkbox' ? target.checked : target.value
        this.setState({
            [name]: value
        })
    }


    render() {
        const {checkbox,nickName} = this.state
        return (
            <Fragment>
                <form action="" onSubmit={this.handleSubmit}>
                    <input defaultValue={'1'} type="text" ref={(input) => this.input = input}/>
                    <input type="submit" value={'非受控组件Submit'}/>
                </form>

                <input type="text" value={nickName} name={'nickName'} onChange={this.handleInputChange}/>
                <input type="checkbox" checked={checkbox} name={'checkbox'}  onChange={this.handleInputChange}/>

                <ul>
                    {
                        [1,2,3].map((v,i)=><LI key={v} value={v}/>)
                    }
                </ul>

            </Fragment>
        )
    }
}

RefInput.defaultProps={
    name:''
}
const LI=({value})=>{
    return [<li key={value}>{value}</li>]
}