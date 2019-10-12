import React from "react";
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';//引入连接器
import * as TodoActions from '../actions'
import TDScope from "../components/SaasScope/TDScope";
import MainLayout from '../Layout'

const TestScope = ({location, history, actions, naviMetaData, userInfo, todosReducer}) => {
    console.log(location, history, actions, naviMetaData, userInfo, todosReducer, '====')
    return (<MainLayout naviMetaData={naviMetaData} userInfo={userInfo} location={location} actions={actions}>
            <TDScope actions={actions} todosReducer={todosReducer}/>
        </MainLayout>
    )
}


TestScope.propTypes = {
    actions: PropTypes.object.isRequired,
    naviMetaData: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    todosReducer: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    userInfo: state.userInfo,
    naviMetaData: state.naviMetaData,
    socketState: state.socketState,
    todosReducer: state.todosReducer
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TestScope)