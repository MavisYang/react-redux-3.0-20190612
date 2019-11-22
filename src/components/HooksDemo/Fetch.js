
import AuthProvider from '../../funStore/AuthProvider'
import promiseXHR from '../../funStore/ServerFun'
import { API_PATH } from '../../constants/OriginName'

//获取会话列表
export const getGroupsConversation = () => {
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupmsg-api/authsec/v3/conversation/groups`;
        return promiseXHR(url, { type: 'bearer', value: token }, null, "GET")
    })
};

//修改会话列表

export const updateGroupsConversation=(params)=>{
    return AuthProvider.getAccessToken().then(token => {
        let url = API_PATH + `/groupmsg-api/authsec/v3/conversation/groups/info`;
        return promiseXHR(url, { type: 'bearer', value: token }, params, "PUT")
    })
}