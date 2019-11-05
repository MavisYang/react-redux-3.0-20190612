import React, { Component } from 'react'
import Checkbox from 'antd/lib/checkbox';
import './index.scss'

export default function MyCheckbox(props){
    const { disabled, styles, defaultValue, options } = props

    const onChange = (checkedValues) => {
        props.onChange(checkedValues,props.paramName)
    }
    return (
        <Checkbox.Group
            onChange={onChange}
            className='myCheckbox'
            options={options}
            style={styles}
            defaultValue={defaultValue}
            disabled={disabled}
        >
        </Checkbox.Group>
    );
}

MyCheckbox.defaultProps = {
    options:
        [
            { label: 'Apple', value: '1' },
            { label: 'Pear', value: '2'},
            { label: 'Orange', value: '3'},
        ],
    defaultValue: ['1'], // 默认选中checked
    disabled: false, // true 禁用
}