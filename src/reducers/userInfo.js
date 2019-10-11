import {USERINFO_INIT} from '../actions/actionTypes'

const initUserInfo = {
    info:{}
}

export default function userInfo(state = initUserInfo,action) {
    switch (action.type) {
        case USERINFO_INIT:
            return {
                ...state,
                info:action.data
            }
        default:
            return state

    }

}
