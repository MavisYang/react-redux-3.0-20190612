import React from "react";
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';//引入连接器
import * as TodoActions from '../actions'
import MainLayout from '../Layout'
import BSScope from "../components/SaasScope/BSScope";

const BookScope = ({location, history, actions, naviMetaData, userInfo, todosReducer}) => {
    return (<MainLayout naviMetaData={naviMetaData} userInfo={userInfo} location={location} actions={actions}>
               <div className='scope_wrapper'>
                   <BSScope actions={actions}/>
               </div>
        </MainLayout>
    )
}


BookScope.propTypes = {
    actions: PropTypes.object.isRequired,
    naviMetaData: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    userInfo: state.userInfo,
    naviMetaData: state.naviMetaData,
    socketState: state.socketState,
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookScope)