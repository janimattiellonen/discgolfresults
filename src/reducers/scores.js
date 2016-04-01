import { handleActions } from 'redux-actions';
import { List, Map} from 'immutable';

export default handleActions({
	SCORES_LOAD: (state, action) => {
		return {
			...state,
			scores: List(action.payload)
		}
	}
}, {scores: List()});