import React from "react";
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';//引入连接器
import * as TodoActions from '../actions'
import SYScope from "../components/SaasScope/SYScope";
import MainLayout from '../Layout'

const StudyScope = ({location, history, actions, naviMetaData, userInfo, todosReducer}) => {
    return (<MainLayout naviMetaData={naviMetaData} userInfo={userInfo} location={location} actions={actions}>
            <SYScope actions={actions}/>
        </MainLayout>
    )
}


StudyScope.propTypes = {
    actions: PropTypes.object.isRequired,
    naviMetaData: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    userInfo: state.userInfo,
    naviMetaData: state.naviMetaData,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudyScope)