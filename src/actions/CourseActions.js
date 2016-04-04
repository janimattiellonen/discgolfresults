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
			console.log("LUSS: " + JSON.stringify(courses));
			return dispatch(loadCourses(courses));
		}).catch((response) => {
			console.log("foo: " + JSON.stringify(response));
		});
	};
}