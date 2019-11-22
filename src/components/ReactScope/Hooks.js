import {useCallback, useEffect, useRef, useState} from "react";

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


export function useWinSize() {

    const [size,setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })

    const onResize = useCallback((node)=>{
        setSize({
            width:document.documentElement.clientWidth,
            height:document.documentElement.clientHeight
        })
    },[])

    useEffect(()=>{
        window.addEventListener('resize',onResize)
        return()=>{
            window.removeEventListener('resize',onResize)
        }
    },[])


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
