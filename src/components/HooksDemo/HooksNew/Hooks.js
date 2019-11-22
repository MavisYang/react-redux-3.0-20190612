import {useState} from "react";

export function useContactModal({defaultValue = {}} = {}) {

    let [name, setName] = useState(defaultValue.name || '')
    let [email, setEmail] = useState(defaultValue.email || '')

    return {
        inputProps: {
            name: {
                value: name,
                onChange: e => setName(e.target.value)
            },
            email: {
                value:email,
                onChange: e => setEmail(e.target.value)
            }
        }
    }
}

export function Modal({defaultStatus}) {
    const [status, setStatus] = useState(false)


}