import {useState} from 'react';
function useReducer(reducer,initialState) {
  const [state, setstate] = useState(initialState)
  function dispatch(action) {
    const nextState = reducer(state,action)
    setstate(nextState)
  }
  return [state, dispatch]
  
}

export default useReducer;