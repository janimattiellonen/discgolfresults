import App from '../App';
import * as DiscActions from '../../actions/DiscActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export default connect(
    function mapStateToProps(state) {
        return {
			discs: state.discs.discs
        }
    },
    function mapDispatchToProps(dispatch) {
        return { 
        	discActions: bindActionCreators(DiscActions, dispatch), 
        };
    }
)(App);
