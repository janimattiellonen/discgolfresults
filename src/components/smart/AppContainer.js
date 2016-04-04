import App from '../App';
import * as CourseActions from '../../actions/CourseActions';
import * as ScoreActions from '../../actions/ScoreActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default connect(
    function mapStateToProps(state) {
        return {
			scores: state.scores.scores,
            
        }
    },
    function mapDispatchToProps(dispatch) {
        return { 
            courseActions: bindActionCreators(CourseActions, dispatch), 
        	scoreActions: bindActionCreators(ScoreActions, dispatch), 
        };
    }
)(App);
