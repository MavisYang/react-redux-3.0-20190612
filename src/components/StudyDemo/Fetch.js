import axios from 'axios'
import {useCallback,useRef,useEffect} from "react";

export const fetchDataAxios = (query) => {
    const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
    async function fetchData_redux() {
        const result = await axios(url)
        return result.data
    }
    return fetchData_redux()

}

export function useFetch(query) {
    return useCallback(()=>{
        const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
        // return async function fetchData_redux() {
        //     const result = await axios(url)
        //     return result.data
        // }
        axios(url).then(res=>{
            console.log(res,'res')
            return res.data.hits
        })
    },[query])

}

export function useEventCallBack(fn, dependencies){
    const ref = useRef(null)

    useEffect(()=>{
        ref.current = fn
    },[fn,...dependencies])

    return useCallback(()=>{
        const fn = ref.current
        return fn()
    },[ref])
}