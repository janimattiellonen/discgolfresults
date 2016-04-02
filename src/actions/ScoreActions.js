import api from '../api';

export function loadScores(scores) {
	return {
		type: 'SCORES_LOAD',
		payload: scores
	}
}

export function getScores() {
	return function(dispatch, getState) {
		api.getScores().then(scores => {
			return dispatch(loadScores(scores));
		}).catch((response) => {
			console.log("foo: " + JSON.stringify(response));
		});
	};
}