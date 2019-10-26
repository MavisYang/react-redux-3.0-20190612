import React from "react";


export default function InterviewQuestion() {
    return(
        <div className='container'>
            <h2>面试链接须知</h2>
            <IQ_JS_20191022/>
        </div>
    )
}
function IQ_JS_20191022() {
    return(
        <div>
            <a href="https://mp.weixin.qq.com/s/sdPZJw9inaJdsxyBpcMCsw" target='_blank'>浏览器相关原理详细总结（1） </a>
            <a href="https://mp.weixin.qq.com/s/XhDMH8Q4WGc9CydQFMo1Ww" target='_blank'>Vue3.0 来了，明年的面试问什么？ </a>
        </div>
    )

}
