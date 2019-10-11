import React, { useState, useEffect } from 'react'
import SelectFriend from './SelectFriend'
import Todos from '../Todos'
import './index.scss'

function SetCount(props) {
  //一个组件可以多次使用State Hook：
  //1.
  const [fruit, setFruit] = useState('banana');
  useEffect(() => {
    if (fruit !== '')
      console.log(fruit);
    setFruit('orange')
  }, [fruit])

  //2.
  const [count, setCountState] = useState(0)
  useEffect(() => {
    document.title = `you clicked ${count} times`
  }, [count])//仅在 count 更改时更新

  //3.
  const [todos,setTodos] = useState([
    { text: 'Learn Hooks', id: '11ydam2' },
    { text: 'Learn Hooks 2', id: '13' }
  ])
  function handleSetTodos(id) {
    let newTodos = []
    todos.map(old => newTodos.push(old))
    newTodos.find(m => m.id === id).text = "Learn Hooks clicked"
    setTodos(newTodos);
  }

  const [fileNum, setFileNum] = useState({ totalNum: 0, validNum: 0 })
  const [submiting, setSubmiting] = useState(false)


  function uploadHandle(params) {
    if (submiting) return 
    setSubmiting(true)
    setTimeout(() => {
      setSubmiting(false)
      setFileNum({
        totalNum: 390, validNum: 380
      })
      
    }, 2000);


    
  }

  console.log(submiting,'submiting');
  
  return (
    <div>
      <div className='fileNum'> 共<span>{fileNum.totalNum} 条</span>SKU数据，<span>{fileNum.validNum} 条</span>有效 </div>

      <button onClick={uploadHandle}> 点击上传 </button>
      

      <p>You clicked {count} times</p>
      <button onClick={() => setCountState(count + 1)}> + </button>
      <button onClick={() => setCountState(count - 1)}> - </button>
      <button onClick={() => setCountState('change')}> click change </button>
      <p> {fruit} </p>

      <ul>
        {
          todos.map(v => (<li key={v.id} onClick={() => {
            handleSetTodos(v.id)
          }}>{v.text}</li>))
        }
      </ul>
    </div>
  )
}

function Hooks(params) {
  return (
    <div>


      <SetCount/>
      <SelectFriend/>
      <Todos></Todos>
    </div>
  )
}
export default Hooks;