import {UPDATE_COLOR} from '../actions/actionsTypes'


export const ColorReducer = (state , action) => {
    switch (action.type) {
        case UPDATE_COLOR:
            return action.color
        default:
            return state;
    }

}
