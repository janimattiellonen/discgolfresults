import { handleActions } from 'redux-actions';
import { List, Map} from 'immutable';

export default handleActions({
	DISCS_LOAD: (state, action) => {
		return {
			...state,
			discs: List(action.payload)
		}
	}
}, {discs: List()});