import React, {useContext} from "react";
import {ColorContext} from "../UseContext";

function TextArea() {
    //动态接收useContext
    const colorStyle = useContext(ColorContext)
    return (
        <div style={colorStyle}>
            这是文本展示的内容，字体的颜色是blue
        </div>
    )
}

export default TextArea