import React from "react";
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';//引入连接器
import * as TodoActions from '../../actions'
import {Switch,Route} from "react-router";
import ReactScope from '../ReactScope'
import MainLayout from '../../Layout'

const RTScope = (props) =>{
    const {location, actions, naviMetaData, userInfo} = props
    return(
        <MainLayout  naviMetaData={naviMetaData} userInfo={userInfo} location={location} actions={actions}>
            <div className='scope_wrapper'>
                <Switch>
                    <Route path={'/v2/syscope/react'} render={(props)=><ReactScope {...props} actions={actions}/>}/>
                </Switch>
            </div>

        </MainLayout>

    )

}

RTScope.propTypes = {
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
)(RTScope)