import api from '../api';

export function loadScores(scores) {
	return {
		type: 'SCORES_LOAD',
		payload: scores
	}
}

export function getScores(versionId = 10) {
	return function(dispatch, getState) {
		api.getScores(versionId).then(scores => {
			return dispatch(loadScores(scores));
		}).catch((response) => {
			console.log("foo: " + JSON.stringify(response));
		});
	};
}