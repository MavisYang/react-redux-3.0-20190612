import React from "react";
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as TodoActions from '../actions'
import Login from "../components/Login";

const LoginScope = ({location,history,actions})=>{
    return (
        <Login actions={actions} />
    )
}

LoginScope.propTypes = {
    actions: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(TodoActions, dispatch)
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScope)