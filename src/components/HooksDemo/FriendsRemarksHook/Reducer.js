export function RemarksReducer(state, action) {
    switch (action.type) {
        case 'REMARKS_INIT':
            return {
                ...state,
                list: action.data
            }
        case 'INIT': //初始化 切换 select false
            return {
                ...state,
                list: action.data
            }
        case 'FILTER':
            return {
                ...state,
                list:state.list.map(v=>v.id===action.item.id?{...v, select: !v.select} : {...v, select: false})
            }
        case 'CHANGE_IPT':
            return {
                ...state,
                list:state.list.map(v => (v.id === action.id ? {...v, name: action.value,} : {...v}))
            }
        case 'ONE_SELECT':
            return {
                ...state,
                list:state.list.map(v=>v.id===action.item.id?{...v, oneSelect: !v.oneSelect} : {...v, oneSelect: false})
            }
        default:
            return {
                ...state
            }
    }
}