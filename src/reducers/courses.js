import { handleActions } from 'redux-actions';
import { List, Map} from 'immutable';

export default handleActions({
	COURSES_LOAD: (state, action) => {
		return {
			...state,
			courses: List(action.payload.courses),
		}
	}
}, {courses: List()});