import React, {useEffect, useRef, useState} from "react";
import PropTypes from 'prop-types'

const FilesDragAndDrop = (props)=>{

    const [dragging,setDragging] = useState(false)
    const [message,setMessage] = useState({ show: false, text: null, type: null })
    //定义拖拽放手的ref

    const drop = useRef()//下降放手
    const drag = useRef()//拖动

    useEffect(()=>{
        // useRef 的 drop.current 取代了 ref 的 this.drop
        drop.current.addEventListener('dragover',handleDragOver)
        drop.current.addEventListener('drop',handleDrop)
        drop.current.addEventListener('dragenter',handleDragEnter)
        drop.current.addEventListener('dragleave',handleDragLeave)
        return()=>{
            drop.current.removeEventListener('dragover',handleDragOver)
            drop.current.removeEventListener('drop',handleDrop)
            drop.current.removeEventListener('dragenter',handleDragEnter)
            drop.current.removeEventListener('dragleave',handleDragLeave)
        }
    },[])

    //拖拽结束
    const handleDragOver = (e)=> {
        e.preventDefault();
        e.stopPropagation();
    }
    //拖拽
    const handleDrop =(e)=>{
        console.log(e)
        e.preventDefault();
        e.stopPropagation();
        setDragging(false)
        const {count, formats} = props
        const files = [...e.dataTransfer.files]//
        console.log(files)

        if (count && count < files.length) {
            showMessage(`抱歉，每次最多只能上传${count} 文件。`, 'error',2000)
            return
        }
        // files.some((file) =>
        //     !formats.some((format) =>
        //         file.name.toLowerCase().endsWith(format.toLowerCase())
        //     )
        // )

        if(formats&&files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))){
            showMessage(`只允许上传${formats.join(',')}格式的文件`,'error',2000)
            return
        }

        if(files&&files.length){
            showMessage('成功上传！', 'success', 1000)
            props.onUnload(files)
        }

    }
    //拖拽进入
    const handleDragEnter=(e)=>{
        e.preventDefault();
        e.stopPropagation();
        e.target !== drag.current && setDragging(true)

    }
    //拖拽离开
    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.target === drag.current && setDragging(false)
    }

    //提示信息

    const showMessage=(text,type,timeout)=>{
        setMessage({show:true,text,type})
        setTimeout(()=>{
            setMessage({show:false,text: null, type: null })
        },timeout)

    }
    return(
        <div ref={drop} className='FilesDragAndDrop'>

            {
                dragging&&(
                    <div ref={drag} className='FilesDragAndDrop__placeholder'>
                        请放手
                    </div>
                )
            }

            {
                message.show&&(
                    <div
                        className={`FilesDragAndDrop__placeholder FilesDragAndDrop__placeholder--${message.type}`}>
                        {message.text}
                        <span>{message.type}</span>
                    </div>
                )
            }
            {props.children}
        </div>
    )
}

//必传项
FilesDragAndDrop.propTypes = {
    onUnload:PropTypes.func.isRequired,
    children:PropTypes.node.isRequired,
    count:PropTypes.number,
    formats:PropTypes.arrayOf(PropTypes.string)

}
export {FilesDragAndDrop}