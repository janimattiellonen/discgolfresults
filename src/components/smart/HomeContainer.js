import React,  {Component, PropTypes } from 'react';
import * as ScoreActions from '../../actions/ScoreActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../Home';
import { List } from 'immutable';


export default connect(
    function(state) {
        return {
            course: state.scores.course,
            version: state.scores.course.version,
            scores: state.scores.scores
        };
    },
    function mapDispatchToProps(dispatch) {
        return { 
            scoreActions: bindActionCreators(ScoreActions, dispatch)
        };
    }
)(Home);
