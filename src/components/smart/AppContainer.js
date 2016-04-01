import App from '../App';
import * as ScoreActions from '../../actions/ScoreActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default connect(
    function mapStateToProps(state) {
        return {
			scores: state.scores.scores
        }
    },
    function mapDispatchToProps(dispatch) {
        return { 
        	scoreActions: bindActionCreators(ScoreActions, dispatch), 
        };
    }
)(App);
