import React from 'react'
import './index.scss'

function Input(props) {

  function handleChangeIpt(e){
    props.iptChangeParams(props.paramsname, e.target.value)

  }

  const { className, label, must, value, maxLength, blurFun, disabled, styles, placeholder} = props
  return (
    <div className={"public-input " + className}>
      {
        label ?
          <div className="label">
            {
              must ?
                <span style={{ color: 'red', position: 'absolute', transform: 'translateX(-8px)' }}>*</span>
                : ''
            }
            {label}
          </div>
          : ''
      }
      <input maxLength={maxLength} onBlur={blurFun} className={disabled ? 'input disabled' : "input"} style={styles} type="text" value={value} placeholder={placeholder} disabled={disabled} 
      
           onChange={(e)=>handleChangeIpt(e)} />
    </div>
  )
}

export default Input;

Input.defaultPorps={
    maxLength: false,
    className: '',
    placeholder:'请输入'
}