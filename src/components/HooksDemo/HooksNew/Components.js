import React from "react";
import {Button,Input} from 'antd'

export function Contact() {

    return(
        <div>
            <label>
                Name:
                <Input/>
            </label>
            <label>
                Email:
                <Input/>
            </label>
            <Button>remove</Button>
            <p>{}</p>
        </div>
    )
}