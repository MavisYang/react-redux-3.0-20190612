import React from "react";
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';//引入连接器
import * as TodoActions from '../../actions'
import {Switch,Route} from "react-router";
import ShareTech from '../StudyDemo/ShareTech'
import MainLayout from '../../Layout'

const ShareScope = (props) =>{
    const {location, actions, naviMetaData, userInfo} = props
    return(
        <MainLayout naviMetaData={naviMetaData} userInfo={userInfo} location={location} actions={actions}>
            <div className='scope_wrapper'>
                <Switch>
                    <Route path={'/v2/syscope/share'} render={(props)=><ShareTech {...props} actions={actions}/>}/>
                </Switch>
            </div>

        </MainLayout>

    )

}

ShareScope.propTypes = {
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
)(ShareScope)