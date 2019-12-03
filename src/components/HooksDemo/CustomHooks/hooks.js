import {useEffect, useRef} from 'react'
function useCurrentValue(value) {
    const ref = useRef(0)
    useEffect(()=>{
        ref.current=value;
    },[value])

    return ref;

}