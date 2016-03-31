import React from 'react';
import Router, {RouteHandler} from 'react-router';
import { connect } from 'react-redux';

export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="page-inner">
                {this.props.children}
            </div>
        );
    }

    componentWillMount() {
        //this.props.discActions.getDiscs();
    }    
}
