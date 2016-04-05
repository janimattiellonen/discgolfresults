import { handleActions } from 'redux-actions';
import { List, Map} from 'immutable';

export default handleActions({
	COURSES_LOAD: (state, action) => {

		let courses = List(action.payload);

		courses = courses.map(course => {
			var layouts = List(course.layouts);

			course.layouts = layouts.map(layout => {
				layout.versions = List(layout.versions);

				return layout;
			});

			return course;
		});

		return {
			...state,
			courses: courses,
		}
	},

	COURSE_SELECT: (state, action) => {
		let courseId = action.payload;
		let course = state.courses.get(courseId)
		return {
			...state,
			course: course,
			layouts: course.layouts
		}
	}
}, {courses: List(), layouts: List(), versions: List()});