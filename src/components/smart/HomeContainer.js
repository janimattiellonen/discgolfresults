import React,  {Component, PropTypes } from 'react';
import * as DiscActions from '../../actions/DiscActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../Home';
import { List } from 'immutable';


export default connect(
    function(state) {
        return {
            discs: state.discs.discs
        };
    },
    function mapDispatchToProps(dispatch) {
        return { 
            discActions: bindActionCreators(DiscActions, dispatch)
        };
    }
)(Home);
