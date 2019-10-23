/***
 * hooks 实现拖拽上传
 * 完成具有动态交互的拖拽行为并不简单，需要用到四个事件控制：

 区域外：dragleave，	离开范围
 区域内：dragenter，用来确定放置目标是否接受放置。
 区域内移动：dragover，用来确定给用户显示怎样的反馈信息
 完成拖拽（落下）：drop，允许放置对象。

 e.preventDefault() //阻止事件的默认行为(如在浏览器打开文件)
 e.stopPropagation() // 阻止事件冒泡

 */
import React,{Fragment} from "react";
import {FilesDragAndDrop} from './FilesDragAndDrop'
import './index.scss'


function DragAndDrop() {

    function onUnload(files) {
        //做一些数据传递等
        console.log(files,'files')

    }

    return(
        <Fragment>
            <h3>Hooks实现一个交互完整的拖拽上传组件</h3>
            <FilesDragAndDrop
                count={1}
                formats={['jpg', 'png', 'gif']}
                onUnload={onUnload}
            >
                <div className='FilesDragAndDrop__area'>
                    传下文件试试
                </div>
            </FilesDragAndDrop>
        </Fragment>

    )

}

export default DragAndDrop






