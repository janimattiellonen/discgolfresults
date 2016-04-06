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
		console.log("cid: " + courseId);
		console.log("size: " + state.courses.count());
		console.log("ss: " + JSON.stringify(state.courses));

		let index = state.courses.findIndex(item => item.id === courseId);
		let course = state.courses.get(index);
		console.log("luts: " + JSON.stringify(course));
		console.log("layouts: " + JSON.stringify(course.layouts));

		return {
			...state,
			course: course,
			layouts: course.layouts
		}
	},

	LAYOUT_SELECT: (state, action) => {
		let layoutId = action.payload;

		console.log("lid: " + layoutId);
		let index = state.course.layouts.findIndex(item => item.id === layoutId);
		console.log("l index: " + index);
		let layout = state.course.layouts.get(index);

		console.log("layout: " + JSON.stringify(layout));

		console.log("l versions: " + JSON.stringify(layout.versions));

		return {
			...state,
			layout: layout,
			versions: layout.versions
		}
	}
}, {courses: List(), layouts: List(), versions: List()});