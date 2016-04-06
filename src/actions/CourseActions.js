import api from '../api';

export function loadCourses(courses) {
	return {
		type: 'COURSES_LOAD',
		payload: courses
	}
}

export function getCourses() {
	return function(dispatch, getState) {
		api.getCourses().then(courses => {
			return dispatch(loadCourses(courses));
		}).catch((response) => {
			console.log("foo: " + JSON.stringify(response));
		});
	};
}

export function selectCourse(courseId) {
	return {
		type: 'COURSE_SELECT',
		payload: courseId
	}
}

export function selectLayout(layoutId) {
	return {
		type: 'LAYOUT_SELECT',
		payload: layoutId
	}
	
}