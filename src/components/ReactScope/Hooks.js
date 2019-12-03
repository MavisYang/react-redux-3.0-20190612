import {useCallback, useEffect, useRef, useState, useReducer, createContext} from "react";
import axios from 'axios'

function useSequence(initialNext) {
    let nextRef = useRef(initialNext)
    return () => nextRef.current++
}

export function useKeys(initial) {
    let getKey = useSequence(initial + 1)
    let [keys, setKeys] = useState(Array(initial).fill(0).map((x, i) => i + 1))
    let add = () => setKeys(keys.concat(getKey()))
    let remove = (key) => {
        let newKeys = keys.slice(0)
        let index = newKeys.indexOf(key)
        if (index !== -1) {
            newKeys.splice(index, 1)
        }
        setKeys(newKeys)
    }
    return [keys, add, remove]
}

export function useContactModel({defaultValue = {}} = {}) {
    let [name, setName] = useState(defaultValue.name || '')
    let [email, setEmail] = useState(defaultValue.email || '')

    return {
        inputProps: {
            name: {
                value: name,
                onChange: e => setName(e.target.value)
            },
            email: {
                value: email,
                onChange: e => setEmail(e.target.value)
            }
        }
    }
}


export function useInputValue() {
    const [value,setValue] = useState('')
    let onChange = useCallback((e)=>{
       // console.log(e.currentTarget,'setValue===e===')//<input type=​"text" class=​"ant-input" value=​"k" style=​"width:​ 200px;​">​ "setValue===e==="
        setValue(e.currentTarget.value)
    },[value])

    return {
        value,
        onChange
    }
}

export function useWinSize() {

    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })

    const onResize = useCallback((node) => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    }, [])

    useEffect(() => {
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])


    return size
}

const useUserInfo = (username = 'yuwanlin') => {
    const fetchRef = useRef(null);
    const [userInfo, setUserInfo] = useState({});
    const handleData = data => {
        setUserInfo(data);
    };
    useEffect(() => {
        // const fetchData = username =>
        //     fetch(`${prefix}${username}`)
        //         .then(res => res.json())
        //         .then(data => {
        //             console.log('fetch success');
        //             handleData(data);
        //         });
        // fetchRef.current = debounce(fetchData, 1000);

        handleData();
    }, []);

    useEffect(
        () => {
            fetchRef.current(username);
        },
        [username]
    );
    // useDebugValue('use-user-info');
    return userInfo;
};

//异步取数场景，在 Function Component 的最佳做法是封装成一个自定义 Hook：


const dataFetchReducer = (state, action) => {

    switch (action.type) {
        case "init":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case "FETCH_FAILURE":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            throw new Error();
        // return state

    }
}

export const useDataApi = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl)

    const [state, dispatch] = useReducer(dataFetchReducer, {
        data: initialData,
        isLoading: false,
        isError: false,

    })

    useEffect(() => {
        let didCancel = false

        const fetchdata = async () => {
            dispatch({type: 'init'});
            try {
                const result = await axios(url)
                if (!didCancel) {
                    dispatch({type: 'FETCH_SUCCESS', payload: result.data})
                }
            } catch (e) {
                if (!didCancel) {
                    dispatch({type: 'FETCH_FAILURE'})

                }
            }
        }
        fetchdata()

        return () => {
            didCancel = true
        }
    }, [url])

    const doFetch = url => setUrl(url)

    return {...state, doFetch}
}

export const useDataApiFetch = (initialUrl, initialData) => {
    const [data, setData] = useState(initialData)
    const [url, setUrl] = useState(initialUrl)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        let didCancel = false
        const fetchData = async () => {
            setIsError(false)

            try {
                const result = await axios(url)
                if (!didCancel) {
                    setData(result.data)
                }
            } catch (e) {
                if (!didCancel) {
                    setIsError(true)
                }
            }
            setIsLoading(false)
        }
        fetchData()
        return () => {
            didCancel = true
        }

    }, [url])
    const doFetch = url => setUrl(url)
    return [{data, isLoading, isError}, doFetch]
}















