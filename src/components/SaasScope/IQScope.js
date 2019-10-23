import React from "react";
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';//引入连接器
import * as TodoActions from '../../actions'
import {Switch,Route} from "react-router";
import InterviewQuestion from '../StudyDemo/InterviewQuestion'
import MainLayout from '../../Layout'

const IQScope = (props) =>{
    const {location, actions, naviMetaData, userInfo} = props
    return(
        <MainLayout  naviMetaData={naviMetaData} userInfo={userInfo} location={location} actions={actions}>
            <div className='scope_wrapper'>
                <InterviewQuestion {...props} actions={actions}/>
            </div>

        </MainLayout>

    )

}

IQScope.propTypes = {
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
)(IQScope)